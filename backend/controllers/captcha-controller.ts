import express from 'express'
import svgCaptcha from 'svg-captcha'
import settings from '../settings'
import { v4 as uuidv4 } from 'uuid'
import store from '../captcha_store'

class CaptchaController {

  captcha = async (_req: express.Request, res: express.Response) => {
    const captcha = svgCaptcha.create(settings.svgCaptcha)
    const uuid = uuidv4()
    store.create(uuid, captcha.text)

    res.status(200).json({
      uuid:uuid,
      svg:captcha.data
    })
  }
}

export default new CaptchaController()