const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.verifyUser,
        pass: process.env.verifyPass,
    },
});

const sendEmail = async (email, code) => {
    await transport.sendMail({
        to: email,
        subject: "Account verification",
        text: `Your verifcation code is ${code}`
    })
}

module.exports = sendEmail;