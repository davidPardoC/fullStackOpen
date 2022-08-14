import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: false,
  message: '',
  error: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const { message, error = false } = action.payload
      return { show: true, message, error }
    },
    hideNotification(state) {
      return { ...state, show: false }
    },
  },
})

/**
 *
 * @param {Object} param0
 * @returns
 */
export const showNotificationCreator = ({
  message,
  error = false,
  duration = 1500,
}) => {
  return (dispatch) => {
    const timeout = setTimeout(() => {
      dispatch(hideNotification())
      clearTimeout(timeout)
    }, duration)
    dispatch(showNotification({ message, error }))
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
