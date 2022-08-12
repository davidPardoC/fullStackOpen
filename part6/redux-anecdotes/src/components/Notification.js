import { useSelector } from "react-redux";
import styles from "./Notification.module.css";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    notification.show && (
      <div className={styles.notificationContainer}>{notification.message}</div>
    )
  );
};

export default Notification;
