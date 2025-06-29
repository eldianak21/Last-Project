// // controllers/emailController.js
// const nodemailer = require("nodemailer");

// const sendEmail = async (req, res) => {
//   const { to, subject, text } = req.body;

//   console.log(`Attempting to send email to: ${to}, subject: ${subject}`); // Log details

//   try {
//     // Create a Nodemailer transporter (replace with your email service details)
//     const transporter = nodemailer.createTransport({
//       service: "Gmail", // or your email service
//       auth: {
//         user: process.env.EMAIL_USER, // Your email address from .env
//         pass: process.env.EMAIL_PASSWORD, // Your email password from .env
//       },
//     });

//     // Configure the email message
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: to,
//       subject: subject,
//       text: text,
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Email sent successfully to ${to}:`, info.messageId); // Log success

//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error(`Error sending email to ${to}:`, error); // Log the error
//     res
//       .status(500)
//       .json({ message: "Failed to send email", error: error.message }); // Send error message back to the client
//   }
// };

// module.exports = { sendEmail };

// const nodemailer = require("nodemailer");

// const sendEmail = async (req, res) => {
//   const { to, subject, text } = req.body;

//   console.log(`Attempting to send email to: ${to}, subject: ${subject}`);

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: to,
//       subject: subject,
//       text: text,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Email sent successfully to ${to}:`, info.messageId);
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error(`Error sending email to ${to}:`, error);
//     res
//       .status(500)
//       .json({ message: "Failed to send email", error: error.message });
//   }
// };

// module.exports = { sendEmail };

const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // 👉 changed this to EMAIL_PASS
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { sendEmail };
