
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
router.post("/", function (req, res) {
    nodemailer.createTransport({
        host: env.SMTP_HOST ?? 'smtp.hostname.com',
        port: env.SMTP_PORT ?? 587,
        secure: true, // upgrade later with STARTTLS
        auth: {
            user: env.SMTP_USER ?? "username",
            pass: env.SMTP_PASSWORD ?? "password",
        },
    });
    let mailOptions = {
        from: env.CONTACT_FROM,
        to: env.CONTACT_TO,
        subject: env.CONTACT_SUBJECT,
        text: env.CONTACT_TEXT.replace(/{{name}}/g, req.body.name)
            .replace(/{{email}}/g, req.body.email)
            .replace(/{{message}}/g, req.body.message),
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            res.json({ 'error': 'Error sending email' }).status(500);
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
            // res.send("Wiki home page");
            res.json({ 'message': 'Email sent' }).status(200);
        }
    })
});
module.exports = router;