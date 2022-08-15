import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserInfo from '../UserInfo'

const NavigationMenu = () => {
  const user = useSelector((state) => state.user)
  return (
    <nav>
      <Link to="/blogs"> blogs </Link>
      <Link to="/users"> users </Link>
      {user.isLoggedIn && <UserInfo user={user} />}
    </nav>
  )
}

export default NavigationMenu
