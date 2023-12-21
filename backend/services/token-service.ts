import jwt from 'jsonwebtoken'
import settings from '../settings'

class TokenService {
  generateNewTokens = async (payload: object) => {
    const accessToken = this.generateAccessToken(payload)
    const refreshToken = this.generateRefreshToken(payload)
    
    return { accessToken, refreshToken }
  }

  generateAccessToken = (payload: object) => {
    return jwt.sign(
      payload!,
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: settings.tokenLife.accessToken }
    )
  }

  generateRefreshToken = (payload: object) => {
    return jwt.sign(
      payload!,
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: settings.tokenLife.refreshToken }
    )
  }
}

export default new TokenService()