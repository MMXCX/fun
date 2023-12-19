import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'markmain@mail.ru',
    pass: 'SvsKWafu74mqBgSqwJDM'
  }
})

class EmailService {
  sendActivationCode = async (email: string, activation_uudi: string) => {
    try {
      const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <markmain@mail.ru>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: `Activation code is ${activation_uudi}`, // plain text body
        html: `<b>Activation code is ${activation_uudi}</b>`, // html body
      })
      return true
    } catch (e:any) {
      console.log(e.message)
    }
    return false
  }
}

export default new EmailService()