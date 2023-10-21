// EmailSender.ts
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post('/send-email', async (req, res) => {
  try {
    // Create a Nodemailer transporter with your email service details
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'Gmail'
      auth: {
        user: 'aymenmakhlouf06@gmail.com',
        pass: 'Aymen123123*',
      },
    });

    // Define email data
    const mailOptions = {
      from: 'aymenmakhlouf06@gmail.com',
      to: req.body.email, // Client's email
      subject: 'Subject of the email',
      text: 'Hello, this is the email content.',
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email sending failed' });
  }
});

module.exports = router;
