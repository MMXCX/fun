import { GoogleLogout } from 'react-google-login'

interface LogoutProps {
  clientId: string
}

const onSuccess = () => {
  console.log('Logout Success!')
}

const Logout = (props: LogoutProps) => {

  return (
    <div id="signInButton">
      <GoogleLogout
        clientId={props.clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default Logout