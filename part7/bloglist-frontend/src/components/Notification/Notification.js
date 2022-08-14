import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const { error, message, show } = notification
  return show && <div className={error ? 'error' : 'success'}>{message}</div>
}

export default Notification
