import React from "react";

const Notification = ({ message = "" }) => {
  return (
    <div className="alert alert-danger">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
