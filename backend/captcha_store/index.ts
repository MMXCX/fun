import settings from '../settings'

interface ICaptchaStore {
  uuid: string
  captcha_text: string
  create_at: number
}

class CaptchaStore {
  data: ICaptchaStore[] = []

  /**
   * Удаляет из списка все просроченые капчи. Срок жизни = settings.captcha_life_time
   * @private
   */
  #remove_expired = () => {
    for (let i = this.data.length - 1; i >= 0; i--) {
      if (Math.round(new Date().getTime() * 0.001) - this.data[i].create_at
        > settings.captcha_life_time) {
        this.data.splice(i, 1)
      }
    }
  }

  /**
   * Создает запись о новой капче. Перед этим удаляет все просроченные записи.
   * @param uuid
   * @param captcha_text
   */
  create = (uuid: string, captcha_text: string) => {
    this.#remove_expired()

    this.data.push({
      uuid,
      captcha_text,
      create_at: Math.round(new Date().getTime() * 0.001)
    })
  }

  /**
   * Проверяет совпадение. При любом совпадении uuid - удаляет запись. Если и капча
   * совпала, то возвращает true. Перед этим удаляет все просроченные записи.
   * @param uuid
   * @param captcha_text
   */
  validate = (uuid: string, captcha_text: string): boolean => {
    this.#remove_expired()

    let result: boolean = false
    this.data.map((value: ICaptchaStore, index: number) => {
      if (value.uuid === uuid) {
        if (value.captcha_text === captcha_text) {
          result = true
        }
        this.data.splice(index, 1)
      }
    })
    return result
  }
  /**
   * DEV return all list
   */
  get = () => {
    return this.data
  }
}

export default new CaptchaStore()