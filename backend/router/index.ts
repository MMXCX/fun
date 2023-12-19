import express from 'express'
import userController from '../controllers/user-controller'
import captchaController from '../controllers/captcha-controller'
import testController from '../controllers/test-controller'

const router = express.Router()

router.post('/registration', userController.registration)
router.get('/activation/:activation_uuid', userController.activation)
router.get('/captcha', captchaController.captcha)


const validator = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  if (false) {
    res.status(409).json({
      status: 'error',
      error: 'Conflict'
    })
    console.log('conflict')
  } else {
    next()
  }


}

router.get('/test', validator, testController.test)

export default router