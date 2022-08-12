import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer";
import styles from "./Notification.module.css";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notification.show) {
      setTimeout(() => {
        dispatch(hideNotification());
      }, 2000);
    }
  }, [notification, dispatch]);

  return (
    notification.show && (
      <div className={styles.notificationContainer}>{notification.message}</div>
    )
  );
};

export default Notification;
