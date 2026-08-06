"use client";

import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "New Assignment",
      message: "New farmer verification assigned to you.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "Reminder",
      message: "Pending verification needs to be completed.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "Admin Message",
      message: "Please review the latest verification report.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Notification Centre
        </h1>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded border p-4"
            >
              <h2 className="font-semibold">
                {notification.type}
              </h2>

              <p>{notification.message}</p>

              <p className="text-sm text-gray-500">
                {notification.time}
              </p>

              {!notification.read && (
                <button
                  onClick={() =>
                    markAsRead(notification.id)
                  }
                  className="mt-3 rounded bg-black px-3 py-1 text-white"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}