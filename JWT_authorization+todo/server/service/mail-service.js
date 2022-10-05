// Service для рабаты с почтой. из него мы будем отправлять пользователю сообщение с активацией
// const nodemailer = require('nodemailer')
import nodemailer from 'nodemailer' 

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }


    async sendActivationMail(to, link) {                        // функция по отправке письма для активации. параметры(емейл, ссылка по которой будет отправлятся)
        await this.transporter.sendMail({
            from: process.env.SMTR_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
                `
        })
    }
}

// module.exports = new MailService()
export default new MailService()