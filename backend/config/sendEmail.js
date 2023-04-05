const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eproject2@icit.kmutnb.ac.th',
      pass: 'wegdsigeynmkjjbe'
    }
})
module.exports=transporter