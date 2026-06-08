import NotificationCard from "../../components/authorizer/NotificationCard.jsx";
import { notifications } from "../../data/stages.js";

function Notifications() {
  return (
    <section className="pageStack">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">Notifications</p>
          <h1>Notification Centre</h1>
        </div>
      </div>

      <div className="notificationList">
        {notifications.map((notification) => (
          <NotificationCard notification={notification} key={notification.id} />
        ))}
      </div>
    </section>
  );
}

export default Notifications;
