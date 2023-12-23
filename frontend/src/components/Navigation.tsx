import { useState } from 'react'
import { Menu, MenuProps } from 'antd'
import { Link } from 'react-router-dom'

const items: MenuProps['items'] = [
  {
    label: (<Link to="/">Main Page</Link>),
    key: 'main'
  },
  {
    label: (<Link to="/sign-up">Registration</Link>),
    key: 'sign-up',
  },
  {
    label: (<Link to="/sign-in">Login</Link>),
    key: 'sign-in',
  },
  {
    label: (<Link to="/logout">Logout</Link>),
    key: 'logout',
  },
  {
    label: (<Link to="/data">Get Secret Data</Link>),
    key: 'data',
  }
]

const Navigation = () => {
  const [ _current, setCurrent ] = useState('mail')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <Menu onClick={onClick} selectedKeys={[]} mode="horizontal" items={items} theme="dark"/>
  )
}

export default Navigation