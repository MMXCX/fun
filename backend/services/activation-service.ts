import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class ActivationService {

  /**
   * activation_uuid are already validate
   * @param activation_uuid
   */
  activateUser = async (activation_uuid: string) => {
    const user = await prisma.user.findFirst({
      where: {
        activation_uuid
      }
    })

    if (user) {
      if (!user.is_activated) {
        const updatedUser = await prisma.user.update({
          where: {
            activation_uuid
          },
          data: {
            is_activated: true,
            activated_at: new Date()
          }
        })
        return {
          success: true,
          user: {
            id: updatedUser.id,
            email: updatedUser.email
          }
        }
      }
      return {
        success: false,
        messages: [ 'Account is already active.' ]
      }
    }

    return {
      success: false,
      messages: [ 'Activation code not found.' ]
    }
  }
}

export default new ActivationService()