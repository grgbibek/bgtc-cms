import express from 'express';

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
    
    // In a real application, you might save this to the DB and/or send an email using nodemailer.
    // For now, we will log it and return a success response to simulate the email being sent.
    
    console.log('--- NEW REGISTRATION RECEIVED ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Gender: ${gender}`);
    console.log(`Qualification: ${qualification}`);
    console.log(`Program: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('---------------------------------');

    return res.status(200).json({ message: 'Registration submitted successfully. We will contact you soon.' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({ message: 'Failed to submit registration. Please try again later.' });
  }
});

export default router;
