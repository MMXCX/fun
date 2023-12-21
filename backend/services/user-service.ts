import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UserService {
  isEmailExist = async (email: string) => {
    return prisma.user.findFirst({
      where: {
        email
      }
    })
  }
}

export default new UserService()