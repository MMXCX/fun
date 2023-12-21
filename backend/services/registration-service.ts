import { PrismaClient, User } from '@prisma/client'
import md5 from 'md5'
import { v4 as uuidv4 } from 'uuid'
import emailService from './email-service'

const prisma = new PrismaClient()

class RegistrationService {
  /**
   * email and password are validated
   * @param email
   * @param password
   */
  createUser = async (email: string, password: string) => {


    /**
     * Here we create user account and send activation_uuid to user's email
     */
    const activation_uuid = uuidv4()

    if (await emailService.sendActivationCode(email, activation_uuid)) {
      return prisma.user.create({
        data: {
          email,
          password: md5(password),
          activation_uuid
        }
      })
    }
  }
}

export default new RegistrationService()