import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: "",
  error: false,
};

const notificationSlice = createSlice({
  initialState,
  name: "notification",
  reducers: {
    showNotification(state, action) {
      const { message, error, show = true } = action.payload;
      return { message, error, show };
    },
    hideNotification(state, action) {
      return { ...state, show: false };
    },
  },
});

/**
 *
 * @param {string} message notification message
 * @param {number} duration duration of the notification
 * @returns
 */
export const showNotificationCreator = (message, duration) => {
  return (dispatch) => {
    const timeout = setTimeout(() => {
      dispatch(hideNotification());
      clearTimeout(timeout);
    }, duration);
    dispatch(showNotification({ message, error: false }));
  };
};

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
