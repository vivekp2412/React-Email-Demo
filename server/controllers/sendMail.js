require("dotenv").config();
const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
  const { htmlTemp, subject } = req.body;
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: `"Vivek" <${process.env.EMAIL}>`,
      to: "limbanivivek2412@gmail.com",
      subject: `${subject}`,
      html: htmlTemp,
    });

    console.log("Message sent: %s", info.messageId);

    // Respond with a success message
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);

    // Respond with an error message
    res.status(500).json({ success: false, error: "Error sending email" });
  }
};

module.exports = sendMail;
