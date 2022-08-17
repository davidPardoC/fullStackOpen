import { useState } from "react";
import { createContext } from "react";

const initialState = {
  show: false,
  message: "",
};
export const NotificationContext = createContext(initialState);

export const NotificationProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const showNotification = (message, duration = 1000) => {
    setState({ ...initialState, show: true, message });
    const notificationTimeout = setTimeout(() => {
      hideNotification();
      clearTimeout(notificationTimeout);
    }, duration);
  };

  const hideNotification = () => {
    setState({ ...initialState, show: false, message: "" });
  };

  return (
    <NotificationContext.Provider
      value={{ ...state, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
