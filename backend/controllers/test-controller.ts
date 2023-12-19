import express from 'express'
import svgCaptcha from 'svg-captcha'
import settings from '../settings'
import { v4 as uuidv4 } from 'uuid'
import store from '../captcha_store'
import captcha_store from '../captcha_store'

class TestController {

  test = async (req: express.Request, res: express.Response) => {

    // @ts-ignore
    const result = captcha_store.validate({s:'asdf'}, {t:3})

    res.status(200).json({
      result
    })
  }




  captcha1 = async (req: express.Request, res: express.Response) => {
    res.json({
      data: store.validate(req.body.uuid, req.body.captcha),
      list:store.get()
    })
  }
}

export default new TestController()