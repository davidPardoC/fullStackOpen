import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
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
  const user = parseJwt(token)
  const logout = () => {
    localStorage.removeItem('userLogged')
    dispatch(unsetUser())
  }
  return (
    <div>
      <p>
        <b>Username: </b> {user.username} logged in
        <button onClick={logout}>Logout</button>
      </p>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserInfo
