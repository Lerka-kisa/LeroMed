const model = require("../models/models");
const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(email_to, link) {
        console.log("Письмо " + link + " отправится " + email_to)
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            email_to,
            subject:"Activation on Leromed",
            text: '',
            html:`<div>
                     <h1>To activate, follow the link</h1>
                     <a href="${link}">${link}</a>
                 </div>`,
               textEncoding: 'base64'

        })

        // const options = {
        //     to: email_to,
        //     subject: 'Activation on Leromed',
        //     html: `<div>
        //             <h1>To activate, follow the link</h1>
        //             <a href="${link}">${link}</a>
        //         </div>`,
        //     textEncoding: 'base64',
        // };
        // const messageId = await this.sendMail(options);
    }
}

module.exports = new MailService()