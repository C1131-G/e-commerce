import { Link } from "react-router-dom";

function NotificationCard({ notification }) {
  const Icon = notification.icon;

  return (
    <article className="notificationCard">
      <span className="notificationIcon">
        <Icon size={20} />
      </span>
      <div>
        <div className="notificationTop">
          <strong>{notification.type}</strong>
          <span
            className={`priorityBadge ${notification.priority === "High" ? "high" : "medium"}`}
          >
            {notification.priority}
          </span>
        </div>
        <p>{notification.message}</p>
        <small>{notification.time}</small>
      </div>
      <Link className="textLink" to="/authorizer/verification/identity">
        Open
      </Link>
    </article>
  );
}

export default NotificationCard;
