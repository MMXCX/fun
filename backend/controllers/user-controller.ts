import express from 'express'
import registrationService from '../services/registration-service'
import validator from 'validator'
import activationService from '../services/activation-service'
import settings from '../settings'
import captcha_store from '../captcha_store'


class UserController {
  registration = async (req: express.Request, res: express.Response) => {
    const email = req.body.email ?? ''
    const password = req.body.password ?? ''
    const captcha_text = req.body.captcha.captcha_text ?? ''
    const uuid = req.body.captcha.uuid ?? ''

    if (
      !validator.isEmail(email) ||
      !validator.isByteLength(email, { min: settings.email_min_len, max: settings.email_max_len }) ||
      !validator.isLowercase(email) ||
      !validator.isUUID(uuid, 4) ||
      !captcha_store.validate(uuid, captcha_text)||
      !validator.isByteLength(password, { min: settings.pass_min_len, max: settings.pass_max_len })

    ) {
      res.status(400).send()
    } else {
      await registrationService.createUser(req.body.email, req.body.password)
      res.status(200).json()
    }
  }


  activation = async (req: express.Request, res: express.Response) => {
    const messages = []
    const activation_uuid = req.body.activation_uuid ?? ''

    if (
      !validator.isUUID(activation_uuid, 4) ||
      !validator.isLowercase(activation_uuid)
    ) {
      messages.push('Incorrect activation code.')
    }

    if (!messages.length) {

      res.status(200).json(await activationService.activateUser(activation_uuid))
    } else {
      res.status(200).json({
        success: !messages.length,
        messages
      })
    }
  }

  activationGet = async (req:express.Request, res:express.Response) => {
    res.status(400).send()
  }
}

export default new UserController()