import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../../reducers/blogsReducer'
import { showNotificationCreator } from '../../reducers/notificationReducer'
import { setUser } from '../../reducers/userReducer'
import blogService from '../../services/blogs'
import loginService from '../../services/login'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginService.login({ username, password })
      localStorage.setItem('userLogged', JSON.stringify(data))
      dispatch(setUser(data))
      blogService.setToken(data.token)
      dispatch(initializeBlogs())
      dispatch(showNotificationCreator({ message: 'user succesfully loged' }))
    } catch (error) {
      const { message } = error
      dispatch(showNotificationCreator({ message, error: true }))
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Login into app</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsername}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
      />
      <input type="submit" value="Login" />
    </form>
  )
}

export default LoginForm
