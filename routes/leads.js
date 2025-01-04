const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const LeadMagnet = require("../models/lead.js");

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// POST route for lead magnet
router.post("/download-guide", async (req, res) => {
  const { email } = req.body;

  // Validate the email
  const { error } = LeadMagnet.validateLeadMagnet({ email });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Check if the email already exists
    const existingEmail = await LeadMagnet.findOne({ email });
    if (existingEmail) {
      return res
        .status(409)
        .json({ message: "We have already emailed the guide to you!" });
    }

    // Save email to the database
    const newLead = new LeadMagnet({ email });
    await newLead.save();

    // Send the guide via email
    await transporter.sendMail({
      from: `"Interiors by Tiffi Ltd" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Free Interior Design Guide",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #2c3e50;">Your Free Interior Design Guide</h2>
          <p>
            Thank you for your interest in our free interior design guide. Click the link below to download:
          </p>
          <p>
            <a href="${process.env.BASE_URL}/downloads/design-guide.pdf" style="color: #007bff; text-decoration: none; font-weight: bold;">
              Download the Guide
            </a>
          </p>
          <p>
            We hope you find it helpful in creating beautiful interiors!
          </p>
          <p>Best regards,</p>
          <p><strong>Interiors by Tiffi Ltd</strong></p>
        </div>
      `,
    });

    // Respond with success
    res.status(200).json({ message: "The guide has been emailed to you!" });
  } catch (err) {
    console.error("Lead Magnet Error:", err);
    res.status(500).json({
      message: "Failed to process your request. Please try again later.",
    });
  }
});

module.exports = router;
