import { NotificationProps } from '../types';

const Notification = (props: NotificationProps) => {
  const { notification, setNotification } = props;

  if (!notification) return null;

  setTimeout(() => {
    setNotification('');
  }, 5000);

  return <div className="error">{notification}</div>;
};

export default Notification;
