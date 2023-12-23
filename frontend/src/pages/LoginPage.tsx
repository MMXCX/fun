import { Button, Col, Input, message, Row } from 'antd'
import { AuthApi } from '../api'
import { useState } from 'react'
import Navigation from '../components/Navigation.tsx'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
  const [ messageApi, contextHolder ] = message.useMessage()

  const navigate = useNavigate()

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

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')


  const sendLoginData = () => {
    const authApi = new AuthApi()
    authApi.login({
        email,
        password
      },
      {
        withCredentials: true,
        baseURL: import.meta.env.VITE_API_URL
      })
      .then(res => {
        console.log(res.status, res.data)
        if (res.status === 200) success(res.data.accessToken)
      })
      .catch(e => {
        console.log(e)
        error(e.response.data.message)
      })
  }

  return (
    <>
      <Navigation/>
      {contextHolder}
      <h1>Sign-in Page</h1>
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
      <Row>
        <Col>
          <Button
            type="primary"
            onClick={sendLoginData}
          >Sign-in</Button>
        </Col>
        <Col>
          <Button
            type="link"
            onClick={() => navigate('/restore')}
          >Forgot your password?</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="link"
            onClick={() => navigate('/sign-up')}
          >or Sign-up</Button>
        </Col>
      </Row>
    </>
  )
}

export default LoginPage