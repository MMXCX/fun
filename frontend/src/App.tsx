import { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import './App.css'
import { CaptchaApi, AuthApi } from './api'
import axios from 'axios'

const App = () => {
  const [ svgImage, setSvgImage ] = useState('')
  const [ uuid, setUuid ] = useState('')
  const [ captchaText, setCaptchaText ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const getCaptchaData = () => {
    const captchaApi = new CaptchaApi()
    captchaApi.getCaptcha({
      withCredentials:true
    })
      .then(({ data }) => {
        setSvgImage(data.svg)
        setUuid(data.uuid)
      })
  }

  const sendRegisterData = () => {
    const registrationApi = new AuthApi()
    registrationApi.createNewUser({
        email,
        password,
        captcha: {
          captchaText,
          uuid
        }
      },
      {
        withCredentials: true,
        baseURL: import.meta.env.VITE_API_URL
      })
      .then(res => console.log(res.status, res.data))

    getCaptchaData()
  }

  useEffect(() => {
    getCaptchaData()

    /**
     * On change Local Storage
     */
    // window.addEventListener('storage', () => alert('hello'))
  }, [])

  const sendTestRequest = () => {
    const $api = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
    $api.interceptors.request.use(req => {
      req.headers.Authorization = 'Bearer c01aa5e7-8221-4616-bde0-3f7d25d3de45'
      return req
    })
    $api.get('/api/v3/test')
      .then(res => console.log(res.data))
  }

  return (
    <>
      <h1>Captcha</h1>
      <div>{parse(svgImage)}</div>
      <button onClick={getCaptchaData}>Reload</button>
      <div>
        Captcha:<input type="text" value={captchaText} onChange={e => setCaptchaText(e.target.value)}/>
      </div>
      <div>
        Email:<input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        Password:<input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      <button onClick={sendRegisterData}>Register</button>
      <button onClick={sendTestRequest}>Send</button>
    </>
  )
}

export default App
