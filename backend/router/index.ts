import express from 'express'
import userController from '../controllers/user-controller'
import captchaController from '../controllers/captcha-controller'
import testController from '../controllers/test-controller'
import authValidator from '../validators/authValidator'

const router = express.Router()

router.post('/registration', authValidator.registration, userController.registration)



router.get('/activation/:activation_uuid', userController.activation)
router.get('/captcha', captchaController.captcha)


router.get('/test', testController.test)

export default router