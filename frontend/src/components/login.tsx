import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

interface LoginProps {
  clientId: string
}

const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  console.log('Login Success!', res)
}
const onFailure = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  console.log('Login Fail!', res)
}


const Login = (props:LoginProps) => {

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={props.clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default Login