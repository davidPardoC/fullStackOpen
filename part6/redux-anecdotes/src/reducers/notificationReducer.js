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

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
