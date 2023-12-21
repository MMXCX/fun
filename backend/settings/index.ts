const settings = {
  svgCaptcha: {
    size: 6,
    ignoreChars: '0OIl',
    noise: 10,
    color: true,
    background: '#777',
    width: 180,
    height: 60
  },
  captcha_life_time: 300,

  email_min_len: 5,
  email_max_len: 255,
  pass_min_len: 8,
  pass_max_len: 255,

  /**
   * In seconds
   */
  tokenLife: {
    accessToken: 60 * 15,
    refreshToken: 60 * 60 * 24 * 15
  }
}

export default settings