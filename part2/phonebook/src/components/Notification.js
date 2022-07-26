import React from "react";

const Notification = ({ notification = { message: null, error: true } }) => {
  const { message = null, error = true } = notification;
  if (message === null) {
    return null;
  }
  return <div className={error ? "error" : "success"}>{message}</div>;
};

export default Notification;
