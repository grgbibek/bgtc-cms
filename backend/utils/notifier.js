import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Given a DB image path like /uploads/thumb_xxx.jpg or a full http URL,
 * returns a base64 data URI (for local files) or the URL as-is.
 * Base64 embedding ensures images display in emails regardless of server accessibility.
 */
const getImageDataUri = (imagePath) => {
  if (!imagePath) return null;
  // Already a public URL — use as-is
  if (imagePath.startsWith('http')) return imagePath;
  // Local file path like /uploads/thumb_xxx.jpg
  try {
    const filePath = path.join(__dirname, '..', imagePath);
    if (!fs.existsSync(filePath)) return null;
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase().replace('.', '');
    const mime = ext === 'jpg' ? 'jpeg' : ext;
    return `data:image/${mime};base64,${buffer.toString('base64')}`;
  } catch {
    return null;
  }
};
// ── SMTP transporter ──────────────────────────────────────────────────────────
const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465, // true for 465, false for 587
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
};

const sendEmail = async (to, subject, html) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('[DRY RUN] SMTP not configured. Email subject:', subject);
    console.log('[DRY RUN] Would send to:', to);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"British Gurkha Training Centre" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
  }
};

// ── Email builders ────────────────────────────────────────────────────────────
export const sendOrderCreatedEmailToCustomer = async (orderId, trackingId, customer, cartItems, totalAmount) => {
  const trackLink = `${config.clientUrl}/track-order?id=${trackingId}`;

  const itemRows = cartItems.map(item => {
    const dataUri = getImageDataUri(item.image_thumb);
    const imgCell = dataUri
      ? `<img src="${dataUri}" width="56" height="56" style="border-radius:6px;object-fit:cover;vertical-align:middle;" />`
      : `<span style="display:inline-block;width:56px;height:56px;background:#f3e8ff;border-radius:6px;vertical-align:middle;"></span>`;

    return `
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #f0e6ff;vertical-align:middle;">${imgCell}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0e6ff;font-weight:600;vertical-align:middle;">${item.name}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0e6ff;text-align:center;vertical-align:middle;color:#666;">${item.quantity}x</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0e6ff;text-align:right;vertical-align:middle;font-weight:600;">Rs. ${item.price_at_purchase}</td>
      </tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Order Received</title></head>
<body style="margin:0;padding:20px;background:#f4f4f8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed,#be185d);padding:36px 28px;text-align:center;">
      <div style="font-size:48px;margin-bottom:8px;">🧁</div>
      <h1 style="color:#fff;margin:0;font-size:26px;font-weight:800;">Order Received!</h1>
      <p style="color:#f3e8ff;margin:8px 0 0;font-size:15px;">Thank you, ${customer.name}!</p>
    </div>

    <!-- Body -->
    <div style="padding:28px;">
      <p style="color:#444;margin:0 0 8px;font-size:15px;">Your order <strong style="color:#7c3aed;">#${orderId}</strong> has been received and is currently <strong>Pending</strong>.</p>
      <p style="color:#666;margin:0 0 24px;font-size:13px;">Tracking ID: <code style="background:#f3e8ff;color:#7c3aed;padding:3px 8px;border-radius:4px;font-size:12px;">${trackingId}</code></p>

      <!-- Items -->
      <h3 style="color:#7c3aed;font-size:15px;margin:0 0 4px;padding-bottom:10px;border-bottom:2px solid #f3e8ff;">Items Ordered</h3>
      <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:8px;">
        <tbody>${itemRows}</tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding:14px 12px;font-weight:700;text-align:right;font-size:16px;color:#333;">Total:</td>
            <td style="padding:14px 12px;font-weight:800;text-align:right;font-size:18px;color:#7c3aed;">Rs. ${totalAmount}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Track Order Button -->
      <div style="margin-top:32px;text-align:center;">
        <a href="${trackLink}" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#7c3aed,#be185d);color:#fff;text-decoration:none;border-radius:10px;font-weight:700;font-size:16px;letter-spacing:0.3px;">🔍 Track My Order</a>
        <p style="font-size:11px;color:#aaa;margin-top:12px;">Or paste this link in your browser:<br><a href="${trackLink}" style="color:#7c3aed;">${trackLink}</a></p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9f5ff;padding:18px 28px;text-align:center;font-size:12px;color:#999;border-top:1px solid #edd9ff;">
      We will notify you once your order is confirmed. Thank you for choosing us! 🍰
    </div>
  </div>
</body>
</html>`;

  await sendEmail(customer.email, `🧁 Order Received – #${orderId}`, html);
};

export const sendOrderConfirmationToCustomer = async (order) => {
  const trackLink = `${config.clientUrl}/track-order?id=${order.tracking_id}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Order Confirmed</title></head>
<body style="margin:0;padding:20px;background:#f4f4f8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:#10b981;padding:36px 28px;text-align:center;">
      <div style="font-size:48px;margin-bottom:8px;">✅</div>
      <h1 style="color:#fff;margin:0;font-size:26px;font-weight:800;">Order Confirmed!</h1>
      <p style="color:#d1fae5;margin:8px 0 0;font-size:15px;">Great news, ${order.customer_name}!</p>
    </div>
    <div style="padding:28px;">
      <p style="color:#444;font-size:15px;">Your order <strong style="color:#10b981;">#${order.id}</strong> has been <strong>confirmed</strong>.</p>
      <p style="color:#555;font-size:15px;">Total: <strong style="font-size:18px;color:#10b981;">Rs. ${order.total_amount}</strong></p>
      <p style="color:#666;font-size:14px;">We are now preparing your items fresh. You can track your progress below:</p>
      <div style="margin-top:28px;text-align:center;">
        <a href="${trackLink}" style="display:inline-block;padding:16px 40px;background:#10b981;color:#fff;text-decoration:none;border-radius:10px;font-weight:700;font-size:16px;">Track Your Order</a>
        <p style="font-size:11px;color:#aaa;margin-top:12px;"><a href="${trackLink}" style="color:#10b981;">${trackLink}</a></p>
      </div>
    </div>
    <div style="background:#f0fdf4;padding:18px 28px;text-align:center;font-size:12px;color:#999;border-top:1px solid #d1fae5;">
      Thank you for your patience – your baked goods will be ready soon! 🎂
    </div>
  </div>
</body>
</html>`;

  await sendEmail(order.customer_email, `✅ Order #${order.id} Confirmed!`, html);
};

export const sendOrderCancellationToCustomer = async (order, notes) => {
  const noteHtml = notes
    ? `<div style="background:#fff5f5;border-left:4px solid #fca5a5;padding:12px 16px;border-radius:4px;margin:16px 0;font-style:italic;color:#666;">📝 Note from bgtc: ${notes}</div>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Order Cancelled</title></head>
<body style="margin:0;padding:20px;background:#f4f4f8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:#ef4444;padding:36px 28px;text-align:center;">
      <div style="font-size:48px;margin-bottom:8px;">❌</div>
      <h1 style="color:#fff;margin:0;font-size:26px;font-weight:800;">Order Cancelled</h1>
    </div>
    <div style="padding:28px;">
      <p style="color:#444;font-size:15px;">We're sorry, <strong>${order.customer_name}</strong>. Your order <strong style="color:#ef4444;">#${order.id}</strong> has been <strong>cancelled</strong>.</p>
      ${noteHtml}
      <p style="color:#666;font-size:14px;">If you believe this is a mistake or need help, please contact us directly and we will resolve it promptly.</p>
    </div>
    <div style="background:#fff5f5;padding:18px 28px;text-align:center;font-size:12px;color:#999;border-top:1px solid #fecdd3;">
      We apologise for any inconvenience caused. 🙏
    </div>
  </div>
</body>
</html>`;

  await sendEmail(order.customer_email, `❌ Order #${order.id} Cancelled`, html);
};

export const sendRegistrationEmailToAdmin = async (registration, adminEmail) => {
  const recipient = adminEmail || process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!recipient) return;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Registration</title></head>
<body style="margin:0;padding:20px;background:#f4f4f8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:#0d1f2d;padding:36px 28px;text-align:center;">
      <div style="font-size:48px;margin-bottom:8px;">📝</div>
      <h1 style="color:#fff;margin:0;font-size:26px;font-weight:800;">New Registration Received</h1>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;width:150px;">Full Name:</td>
          <td style="padding:10px;border-bottom:1px solid #eee;">${registration.name}</td>
        </tr>
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">Mobile Number:</td>
          <td style="padding:10px;border-bottom:1px solid #eee;">${registration.phone}</td>
        </tr>
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">Email Address:</td>
          <td style="padding:10px;border-bottom:1px solid #eee;">${registration.email || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">Gender:</td>
          <td style="padding:10px;border-bottom:1px solid #eee;">${registration.gender}</td>
        </tr>
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">Qualification:</td>
          <td style="padding:10px;border-bottom:1px solid #eee;">${registration.qualification || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;">Class of Interest:</td>
          <td style="padding:10px;border-bottom:1px solid #eee;font-weight:600;color:#c9a84c;">${registration.subject}</td>
        </tr>
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;">Message:</td>
          <td style="padding:10px;border-bottom:1px solid #eee;white-space:pre-wrap;">${registration.message || 'N/A'}</td>
        </tr>
      </table>
    </div>
    <div style="background:#f4f5f0;padding:18px 28px;text-align:center;font-size:12px;color:#999;border-top:1px solid #e2e8f0;">
      British Gurkha Training Centre Management System
    </div>
  </div>
</body>
</html>`;

  await sendEmail(recipient, `🆕 New Registration: ${registration.name} - ${registration.subject}`, html);
};

export const sendRegistrationConfirmationToUser = async (registration) => {
  if (!registration.email) return;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Registration Confirmed</title></head>
<body style="margin:0;padding:20px;background:#f4f4f8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:#3d5a3e;padding:36px 28px;text-align:center;">
      <div style="font-size:48px;margin-bottom:8px;">🤝</div>
      <h1 style="color:#fff;margin:0;font-size:26px;font-weight:800;">Registration Received</h1>
      <p style="color:#e2f0d9;margin:8px 0 0;font-size:15px;">Thank you for choosing BGTC, ${registration.name}!</p>
    </div>
    <div style="padding:28px;line-height:1.6;color:#333;">
      <p>Hello <strong>${registration.name}</strong>,</p>
      <p>We have successfully received your training registration for <strong>${registration.subject}</strong>.</p>
      <p>Our team is currently reviewing your details. We will contact you shortly on your mobile number (<strong>${registration.phone}</strong>) or via email to discuss the class schedules, physical training requirements, and next steps for enrollment.</p>
      <p>If you have any immediate questions, feel free to call us or reply directly to this email.</p>
      <br>
      <p style="margin:0;">Best regards,</p>
      <p style="margin:0;font-weight:bold;color:#3d5a3e;">British Gurkha Training Centre</p>
    </div>
    <div style="background:#f4f5f0;padding:18px 28px;text-align:center;font-size:12px;color:#999;border-top:1px solid #e2e8f0;">
      Kantipur Marga-15, Near Ban Campus, Pokhara | Phone: 061-431230, 9803402460
    </div>
  </div>
</body>
</html>`;

  await sendEmail(registration.email, `Training Registration Received - British Gurkha Training Centre`, html);
};




