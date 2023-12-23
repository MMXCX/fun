import { Button, Col, Input, message, Row } from 'antd'
import parse from 'html-react-parser'
import { AuthApi, CaptchaApi } from '../api'
import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation.tsx'
import { useNavigate } from 'react-router-dom'


const RegistrationPage = () => {
  useEffect(() => {
    getCaptchaData()
  }, [])

  const navigate = useNavigate()

  const [ messageApi, contextHolder ] = message.useMessage()

  const success = (content: string) => {
    messageApi.open({
      type: 'success',
      content,
      duration: 10
    })
  }

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content,
      duration: 10
    })
  }

  const [ svgImage, setSvgImage ] = useState('')
  const [ uuid, setUuid ] = useState('')
  const [ captchaText, setCaptchaText ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')


  const getCaptchaData = () => {
    const captchaApi = new CaptchaApi()
    captchaApi.getCaptcha({
      withCredentials: true
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
      .then(res => {
        console.log(res.status, res.data)
        if (res.status === 200) {
          success(res.data.accessToken)
          localStorage.accessToken = res.data.accessToken
        }
      })
      .catch(e => {
        console.log(e)
        error(e.response.data.message)
      })

    getCaptchaData()
  }
  return (
    <>
      <Navigation/>
      {contextHolder}
      <h1>Registration</h1>
      <Row>
        <Col span={8}>
          <Input
            placeholder="E-mail"
            type="email"
            onChange={e => setEmail(e.currentTarget.value)}
            value={email}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.currentTarget.value)}
            value={password}
          />
        </Col>
      </Row>
      <Row align="middle">
        <Col>
          {parse(svgImage)}
        </Col>
        <Col>
          <Button
            type="default"
            onClick={getCaptchaData}
          >Reload</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder="Captcha"
            type="text"
            onChange={e => setCaptchaText(e.currentTarget.value)}
            value={captchaText}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="primary"
            onClick={sendRegisterData}
          >Sign-up</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="link"
            onClick={() => navigate('/sign-in')}
          >or Sign-in</Button>
        </Col>
      </Row>
    </>
  )
}

export default RegistrationPage