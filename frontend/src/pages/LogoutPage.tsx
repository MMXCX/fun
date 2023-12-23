import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthApi } from '../api'

const LogoutPage = () => {
  const navigate = useNavigate()
  const authApi = new AuthApi()

  useEffect(() => {
    authApi.logout({
      withCredentials: true,
      baseURL: import.meta.env.VITE_API_URL
    }).then(() => {
      localStorage.removeItem('accessToken')
      navigate('/')
    }).catch(_e => navigate('/')
    )
  }, [])

  return (
    <></>
  )
}

export default LogoutPage
