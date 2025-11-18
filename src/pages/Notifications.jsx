import { useState } from "react";
import Shell from "../components/Shell";
import "../css/notifications.css";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "issue",
    title: "Issue updated: Street light near Gate 3",
    message: "Technician has marked the job as In Progress.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "booking",
    title: "Service confirmed: Plumber visit",
    message: "Plumber will arrive tomorrow between 10:00–11:00 AM.",
    time: "30 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "event",
    title: "Event reminder: Community Cleanup Drive",
    message: "Starts tomorrow at 9:00 AM in Ward 12 Park.",
    time: "Today · 8:00 AM",
    unread: false,
  },
  {
    id: 4,
    type: "system",
    title: "Profile completed",
    message: "Thanks for updating your contact details.",
    time: "Yesterday · 3:14 PM",
    unread: false,
  },
];

export default function Notifications() {
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleRead = (id) => {
    setItems((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, unread: !n.unread } : n
      )
    );
  };

  const unreadCount = items.filter((n) => n.unread).length;

  return (
    <Shell>
      <div className="notificationsPage">
        {/* Header */}
        <header className="notificationsHeader">
          <div>
            <h2 className="notificationsTitle">Notifications</h2>
            <p className="notificationsSubtitle">
              See updates about your issues, bookings, and community events.
            </p>
          </div>

          <div className="notificationsHeaderActions">
            {unreadCount > 0 && (
              <span className="notificationsBadge">
                {unreadCount} unread
              </span>
            )}
            <button
              type="button"
              className="btn ghost"
              onClick={markAllRead}
            >
              Mark all as read
            </button>
          </div>
        </header>

        {/* List */}
        <section className="panel padded notificationsPanel">
          {items.length === 0 ? (
            <p className="notificationsEmpty">
              You don’t have any notifications yet.
            </p>
          ) : (
            <ul className="notificationsList">
              {items.map((n) => (
                <li
                  key={n.id}
                  className={`notificationItem ${
                    n.unread ? "is-unread" : ""
                  }`}
                  onClick={() => toggleRead(n.id)}
                >
                  <div className={`notificationIcon notificationIcon-${n.type}`}>
                    {n.type === "issue" && "!"}
                    {n.type === "booking" && "🛠"}
                    {n.type === "event" && "📅"}
                    {n.type === "system" && "⚙"}
                  </div>

                  <div className="notificationBody">
                    <div className="notificationRow">
                      <h3 className="notificationTitle">{n.title}</h3>
                      <time className="notificationTime">{n.time}</time>
                    </div>
                    <p className="notificationMessage">{n.message}</p>
                    <div className="notificationMetaRow">
                      <span className={`notificationTag tag-${n.type}`}>
                        {n.type === "issue" && "Issue"}
                        {n.type === "booking" && "Booking"}
                        {n.type === "event" && "Event"}
                        {n.type === "system" && "System"}
                      </span>
                      {n.unread && <span className="notificationDot" />}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Shell>
  );
}
