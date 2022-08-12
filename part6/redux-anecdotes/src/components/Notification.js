import { connect } from "react-redux";
import styles from "./Notification.module.css";

const Notification = ({ show, message }) => {
  return show && <div className={styles.notificationContainer}>{message}</div>;
};

const mapStateToProps = (state) => state.notification;

const conectedNotification = connect(mapStateToProps)(Notification);
export default conectedNotification;
