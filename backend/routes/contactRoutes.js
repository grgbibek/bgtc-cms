import express from 'express';
import pool from '../config/db.js';
import { sendRegistrationEmailToAdmin, sendRegistrationConfirmationToUser } from '../utils/notifier.js';
import { protect, managerOrAdmin, adminOnly } from '../middleware/authMiddleware.js';
import {
  getSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission,
} from '../controllers/submissionController.js';

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

    // ── Save to database ────────────────────────────────────────────────────
    try {
      await pool.query(
        `INSERT INTO contact_submissions (name, email, phone, gender, qualification, subject, message, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'new')`,
        [name || null, email || null, phone || null, gender || null, qualification || null, subject || null, message || null]
      );
    } catch (dbErr) {
      // Non-fatal: log the error but still send the email and return success
      console.error('Failed to save submission to DB:', dbErr.message);
    }

    // ── Fetch dynamic contact_email from settings table ────────────────────
    let adminEmail = null;
    try {
      const [rows] = await pool.query('SELECT setting_value FROM settings WHERE setting_key = "contact_email"');
      if (rows.length > 0) {
        try {
          adminEmail = JSON.parse(rows[0].setting_value);
        } catch {
          adminEmail = rows[0].setting_value;
        }
      }
    } catch (dbErr) {
      console.warn('Failed to fetch contact_email from settings, falling back to SMTP environment config:', dbErr.message);
    }

    // ── Send notifications via SMTP ─────────────────────────────────────────
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

// ─── Admin-only routes ─────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/contact/submissions:
 *   get:
 *     summary: Get all form submissions (admin/manager)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of submissions
 */
router.get('/submissions', protect, managerOrAdmin, getSubmissions);

/**
 * @swagger
 * /api/contact/submissions/{id}:
 *   get:
 *     summary: Get a single submission by ID
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Submission detail
 */
router.get('/submissions/:id', protect, managerOrAdmin, getSubmissionById);

/**
 * @swagger
 * /api/contact/submissions/{id}/status:
 *   patch:
 *     summary: Update submission status
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated
 */
router.patch('/submissions/:id/status', protect, managerOrAdmin, updateSubmissionStatus);

/**
 * @swagger
 * /api/contact/submissions/{id}:
 *   delete:
 *     summary: Delete a submission
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/submissions/:id', protect, adminOnly, deleteSubmission);

export default router;
