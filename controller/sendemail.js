const nodemailer = require("nodemailer");
require('dotenv').config();
const sendEmail = async (email, subject) => {
    // let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });
    let info = await transporter.sendMail({
        from: `"Tanish Mahajan" <${process.env.PASSWORD}>`,
        to: `${email}`,
        subject: subject,
        text: "Please verify the email",
        html: "<strong>Please verify the email</strong>"
    });
    let response = await transporter.sendMail(mailOptions);
    console.log(response.messageId);
};


module.exports = { sendEmail };