import express from 'express'
import registrationService from '../services/registration-service'
import validator from 'validator'
import activationService from '../services/activation-service'
import tokenService from '../services/token-service'
import settings from '../settings'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UserController {
  registration = async (req: express.Request, res: express.Response) => {
    try {
      const user = await registrationService.createUser(req.body.email, req.body.password)

      const payload = {
        id: user!.id
      }

      const { accessToken, refreshToken } = await tokenService.generateNewTokens(payload)

      await prisma.token.create({
        data: {
          userId: user!.id,
          refreshToken
        }
      })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * settings.tokenLife.refreshToken
      })

      res.status(200).json({
        accessToken
      })
    } catch (e) {
      console.log(e)
    }
  }

  logout = async (req: express.Request, res: express.Response) => {
    if (req.cookies.refreshToken) {
      res.clearCookie('refreshToken')
      res.status(200).json({
        status: 'ok',
        message: 'success'
      })
    } else {
      res.status(400).json({
        status: 'error',
        message: 'U are not authorized'
      })
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

  activationGet = async (req: express.Request, res: express.Response) => {
    res.status(400).send()
  }
}

export default new UserController()