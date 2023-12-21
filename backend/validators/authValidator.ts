import express from 'express'
import validator from 'validator'
import settings from '../settings'
import captcha_store from '../captcha_store'
import userService from '../services/user-service'

class AuthValidator {
  registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const email = req.body.email ?? ''
    const password = req.body.password ?? ''
    const captchaText = req.body.captcha.captchaText ?? ''
    const uuid = req.body.captcha.uuid ?? ''

    let message = ''
    if (req.cookies.refreshToken) message = 'Logout first'
    else if (
      !validator.isEmail(email) ||
      !validator.isByteLength(email, { min: settings.email_min_len, max: settings.email_max_len }) ||
      !validator.isLowercase(email)
    ) message = 'Incorrect email format'
    else if (await userService.isEmailExist(email)) message = 'Email is already exist'
    else if (
      !validator.isByteLength(password, { min: settings.pass_min_len, max: settings.pass_max_len })
    ) message = 'Incorrect password format'
    else if (!captcha_store.validate(uuid, captchaText)) message = 'Wrong captcha'
    else if (!validator.isUUID(uuid, 4)) message = 'Wrong uuid'

    if (message) {
      res.status(400).send({
        status: 'error',
        message: message
      })
    } else {
      next()
    }
  }
}

export default new AuthValidator()