import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from './pages/ErrorPage.tsx'
import RegistrationPage from './pages/RegistrationPage.tsx'
import RootPage from './pages/RootPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import LogoutPage from './pages/LogoutPage.tsx'
import DataPage from './pages/DataPage.tsx'


const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootPage/>,
      errorElement: <ErrorPage/>,
    },
    {
      path: '/sign-up',
      element: <RegistrationPage/>
    },
    {
      path: '/sign-in',
      element: <LoginPage/>
    },
    {
      path: '/logout',
      element: <LogoutPage/>
    },
    {
      path: '/data',
      element: <DataPage/>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
