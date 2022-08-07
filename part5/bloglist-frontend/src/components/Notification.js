import React from "react";
import "./Notification.css";
const Notification = ({ notification: { error, message } }) => {
  return <div className={error ? "error" : "success"}>{message}</div>;
};

export default Notification;
