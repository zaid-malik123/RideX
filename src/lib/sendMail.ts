import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
    }
})

export const sendMail = async (to: string, subject: string, html: string) => {
    await transport.sendMail({
        from: `"RYDEX <${process.env.EMAIL_USER}>"`,
        to,
        subject,
        html
    })
}