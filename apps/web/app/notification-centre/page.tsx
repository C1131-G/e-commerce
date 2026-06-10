"use client";

import { useState } from "react";

export default function NotificationCentre() {
  const notifications = [
    {
      icon: "🧑‍🌾",
      id: 1,
      message: "Kumar joined the Agri Marketplace",
      time: "5 mins ago",
      title: "New Farmer Registration",
      type: "Farmer",
    },
    {
      icon: "📦",
      id: 2,
      message: "Order ORD001 placed successfully",
      time: "10 mins ago",
      title: "New Order Received",
      type: "Order",
    },
    {
      icon: "✅",
      id: 3,
      message: "3 product listings waiting for approval",
      time: "20 mins ago",
      title: "Approval Required",
      type: "Approval",
    },
    {
      icon: "🚚",
      id: 4,
      message: "Raj Logistics assigned to ORD005",
      time: "30 mins ago",
      title: "Delivery Assigned",
      type: "Delivery",
    },
    {
      icon: "⚠️",
      id: 5,
      message: "Tomato inventory is running low",
      time: "1 hour ago",
      title: "Low Stock Alert",
      type: "Warning",
    },
  ];

  const [filter, setFilter] = useState("All");

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-500 text-white p-8 rounded-2xl shadow-xl mb-8">
        <h1 className="text-4xl font-bold">🔔 Notification Centre</h1>
        <p className="mt-2 text-green-100">
          Stay updated with all platform activities 🚀
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-700 font-semibold">
            🔔 Total Notifications
          </h3>
          <p className="text-4xl font-bold text-green-600 mt-3">25</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-700 font-semibold">📦 New Orders</h3>
          <p className="text-4xl font-bold text-blue-600 mt-3">12</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-700 font-semibold">🧑‍🌾 Farmers</h3>
          <p className="text-4xl font-bold text-purple-600 mt-3">8</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-700 font-semibold">⚠️ Alerts</h3>
          <p className="text-4xl font-bold text-red-600 mt-3">5</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          🔍 Filter Notifications
        </h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full border-2 border-green-200 rounded-xl p-3 text-black"
        >
          <option>All</option>
          <option>Farmer</option>
          <option>Order</option>
          <option>Approval</option>
          <option>Delivery</option>
          <option>Warning</option>
        </select>
      </div>

      {/* Notification Feed */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">
            📬 Notification Feed
          </h2>

          <button
            onClick={() => alert("✅ All Notifications Marked as Read")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
          >
            ✅ Mark All Read
          </button>
        </div>

        <div className="space-y-5">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className="border-l-8 border-green-500 bg-green-50 p-5 rounded-xl shadow hover:scale-[1.01] transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-black">
                    {notification.icon} {notification.title}
                  </h3>

                  <p className="text-gray-700 mt-2">{notification.message}</p>

                  <p className="text-sm text-gray-500 mt-2">
                    🕒 {notification.time}
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() =>
                      alert(`👁 Viewing Notification\n\n${notification.title}`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    👁 View
                  </button>

                  <button
                    onClick={() =>
                      alert(`✅ Marked Read\n\n${notification.title}`)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    ✔ Read
                  </button>

                  <button
                    onClick={() =>
                      alert(`📌 Notification Saved\n\n${notification.title}`)
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                  >
                    📌 Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
