const nodemailer = require("nodemailer");

const sendEmail = async (email, subject) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        secure: process.env.SECURE_PORT, // true for 465, false for other ports
        auth: {
            user: process.env.USER, // generated ethereal user
            pass: process.env.PASSWORD, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: process.env.USER, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: "Please verify the email", // plain text body
        html: "<strong>Please verify the email</strong>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};


module.exports = { sendEmail };