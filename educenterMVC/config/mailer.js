const nodemailer = require('nodemailer');
require('dotenv').config();

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS
    },
});

module.exports = {
  transporter
}