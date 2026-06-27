import express from 'express';
import pool from '../config/db.js';
import { sendRegistrationEmailToAdmin, sendRegistrationConfirmationToUser } from '../utils/notifier.js';

const router = express.Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a contact/registration form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               qualification:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully submitted
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, gender, qualification, subject, message } = req.body;
    const registration = { name, email, phone, gender, qualification, subject, message };

    console.log('--- NEW REGISTRATION RECEIVED ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Gender: ${gender}`);
    console.log(`Qualification: ${qualification}`);
    console.log(`Program: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('---------------------------------');

    // Fetch dynamic contact_email from settings table
    let adminEmail = null;
    try {
      const [rows] = await pool.query('SELECT setting_value FROM settings WHERE setting_key = "contact_email"');
      if (rows.length > 0) {
        // Try parsing JSON or fallback to raw string
        try {
          adminEmail = JSON.parse(rows[0].setting_value);
        } catch {
          adminEmail = rows[0].setting_value;
        }
      }
    } catch (dbErr) {
      console.warn('Failed to fetch contact_email from settings, falling back to SMTP environment config:', dbErr.message);
    }

    // Send notifications via SMTP
    await sendRegistrationEmailToAdmin(registration, adminEmail);
    if (email) {
      await sendRegistrationConfirmationToUser(registration);
    }

    return res.status(200).json({ message: 'Registration submitted successfully. We will contact you soon.' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({ message: 'Failed to submit registration. Please try again later.' });
  }
});

export default router;
