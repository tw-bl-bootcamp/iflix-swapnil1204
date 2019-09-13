const nodemailer = require('nodemailer');
require('dotenv').config;
exports.mail = (credentials) => {
    try {
        console.log(credentials.email);
        console.log("from email=========>", process.env.emailFromFrom12,process.env.newPassword12)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.emailFromFrom12,
                pass: process.env.newPassword12
            },
        });
        const mailOptions = {
            from: process.env.emailfrom12,
            to: credentials.email, 
            subject: 'your ticket is confirmed...',
            text: 'you booked ticket for '+credentials.movieName+' at '+credentials.venue
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("error while sending mail", err)
            } else
                console.log('mail send ', info);
        });
    } catch (error) {
        console.log("Exception not handled while sending mail");
    }
}