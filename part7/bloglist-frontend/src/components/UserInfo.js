import { Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unsetUser } from '../reducers/userReducer'

function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

const UserInfo = ({ user: { token = '' } }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = parseJwt(token)
  const logout = () => {
    localStorage.removeItem('userLogged')
    dispatch(unsetUser())
    navigate('/login')
  }
  return (
    <>
      <span> {user.username} logged in </span>
      <Button onClick={logout} colorScheme="blue" size="xs">
        Logout
      </Button>
    </>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserInfo
