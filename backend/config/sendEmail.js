const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  auth: {
    user: 'somchai081643@gmail.com',
    pass: 'zqdjwcncngfwmsuy'
    // user: 'eproject2@icit.kmutnb.ac.th',
    //   pass: 'wegdsigeynmkjjbe'
  },
  tls: {
    rejectUnauthorized: false
  }
})

module.exports = transporter