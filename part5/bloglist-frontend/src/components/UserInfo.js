import PropTypes from 'prop-types'
import React from 'react'

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

const logout = () => {
  localStorage.removeItem('userLogged')
}

const UserInfo = ({ user: { token = '' } }) => {
  const user = parseJwt(token)
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
