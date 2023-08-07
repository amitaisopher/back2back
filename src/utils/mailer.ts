import nodemailer, { SendMailOptions } from 'nodemailer';
import log from './logger';

// async function createTestCreds() {
//     const creds = await nodemailer.createTestAccount()
//     console.log(creds)
// }

// createTestCreds()
type EmailTransportConfig = {
    user: string
    pass: string
    host: string
    port: number
    secure: boolean
}

const smtp: EmailTransportConfig = {
    user: process.env.SMTP_MAIL_USER ?? '',
    pass: process.env.SMTP_MAIL_PASSWORD ?? '',
    host: process.env.SMTP_MAIL_HOST ?? '',
    port: parseInt(process.env.SMTP_MAIL_PORT ?? '587'),
    secure: false
}

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: { user: smtp.user, pass: smtp.pass }
})

async function sendEmail(payload: SendMailOptions) {
    debugger
    transporter.sendMail(payload, (error, info) => {
        if (error) {
            log.error(error, 'Error sending email')
            return
        }
        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    })
}

export default sendEmail
