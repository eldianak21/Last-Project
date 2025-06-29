// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,  // Use 587 instead of 465 (more reliable)
//   secure: false,  // TLS required
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false,  // Bypass SSL errors (temporary)
//     ciphers: 'SSLv3'  // Force older encryption (helps with Gmail)
//   },
// });

// const sendEmail = async (to, subject, html) => {
//   const mailOptions = {
//     from: `"Recruitment System" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//     priority: 'high',  // Mark as high priority
//     headers: {
//       'X-Priority': '1',
//       'X-Mailer': 'NodeMailer'
//     }
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('✅ Email sent:', info.response);
//     return info;
//   } catch (error) {
//     console.error('❌ SMTP Error:', error);
//     throw error;
//   }
// };

// module.exports = { sendEmail };

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // For self-signed certificates
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    // Verify connection configuration
    await transporter.verify();

    // Send mail
    const info = await transporter.sendMail({
      from: `"Recruitment System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendEmail };
