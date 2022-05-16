const nodeMailer = require('nodemailer')

const sendMail = (to, subject, htmlContent) => {
    console.log(process.env.MAIL_HOST);
  const transporter = nodeMailer.createTransport({
    service:'gmail',
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD
    }
  })
  const options = {
    from: process.env.ADMIN_EMAIL,
    to: to,
    subject: subject,
    html: htmlContent
  }

  return transporter.sendMail(options)
}
module.exports = {
  sendMail: sendMail
}