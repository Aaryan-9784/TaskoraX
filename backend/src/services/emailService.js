const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USERNAME || 'user',
      pass: process.env.EMAIL_PASSWORD || 'pass',
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'TaskoraX Support <support@taskorax.io>',
    to: options.email,
    subject: options.subject,
    html: options.html,
    text: options.message, // fallback
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
