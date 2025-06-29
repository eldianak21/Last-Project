const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { applicants } = req.body;

  if (!applicants || !Array.isArray(applicants) || applicants.length === 0) {
    return res.status(400).json({ error: "No applicants provided" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailPromises = applicants.map((applicant) => {
      console.log(`Sending email to: ${applicant.Email}`); // 👈 log here

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: applicant.Email,
        subject: "Congratulations on Passing the Interview!",
        text: `Dear ${applicant.FirstName} ${applicant.LastName},

Congratulations!

You have successfully passed the interview.

We will reach out to you with next steps.

Best regards,
HR Department`,
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Failed to send emails" });
  }
};

module.exports = { sendEmail };
