"use client";

import { useState } from "react";

export default function PlatformSettings() {
  const [appName, setAppName] = useState("Agri E-Commerce");
  const [supportEmail, setSupportEmail] = useState("support@agriecommerce.com");
  const [supportPhone, setSupportPhone] = useState("+91 9876543210");
  const [deliveryFee, setDeliveryFee] = useState("50");
  const [codEnabled, setCodEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert(
      `✅ Settings Saved Successfully!

📱 App Name: ${appName}

📧 Support Email: ${supportEmail}

📞 Support Phone: ${supportPhone}

🚚 Delivery Fee: ₹${deliveryFee}

💵 COD: ${codEnabled ? "Enabled" : "Disabled"}

🔔 Notifications: ${notificationsEnabled ? "Enabled" : "Disabled"}

🌙 Dark Mode: ${darkMode ? "Enabled" : "Disabled"}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-500 rounded-2xl p-8 shadow-xl mb-8">
        <h1 className="text-4xl font-bold text-white">⚙️ Platform Settings</h1>

        <p className="text-green-100 mt-2">
          Configure your Agri E-Commerce platform 🚀
        </p>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          🛠 General Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* App Name */}
          <div>
            <label className="block text-black font-semibold mb-2">
              📱 Application Name
            </label>

            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full border-2 border-green-200 rounded-xl p-3 text-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-black font-semibold mb-2">
              📧 Support Email
            </label>

            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full border-2 border-green-200 rounded-xl p-3 text-black"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-black font-semibold mb-2">
              📞 Support Contact
            </label>

            <input
              type="text"
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full border-2 border-green-200 rounded-xl p-3 text-black"
            />
          </div>

          {/* Delivery Fee */}
          <div>
            <label className="block text-black font-semibold mb-2">
              🚚 Delivery Fee (₹)
            </label>

            <input
              type="number"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
              className="w-full border-2 border-green-200 rounded-xl p-3 text-black"
            />
          </div>
        </div>

        {/* Toggle Settings */}
        <div className="mt-8 space-y-5">
          <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
            <span className="text-black font-semibold">
              💵 Cash On Delivery (COD)
            </span>

            <button
              onClick={() => setCodEnabled(!codEnabled)}
              className={`px-5 py-2 rounded-lg text-white ${
                codEnabled ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {codEnabled ? "✅ Enabled" : "❌ Disabled"}
            </button>
          </div>

          <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
            <span className="text-black font-semibold">🔔 Notifications</span>

            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`px-5 py-2 rounded-lg text-white ${
                notificationsEnabled ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {notificationsEnabled ? "✅ Enabled" : "❌ Disabled"}
            </button>
          </div>

          <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
            <span className="text-black font-semibold">🌙 Dark Mode</span>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-5 py-2 rounded-lg text-white ${
                darkMode ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {darkMode ? "✅ Enabled" : "❌ Disabled"}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            💾 Save Settings
          </button>

          <button
            onClick={() => alert("🔄 Settings Reset Successfully")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            🔄 Reset
          </button>

          <button
            onClick={() => alert("📤 Settings Exported")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            📤 Export
          </button>
        </div>
      </div>
    </div>
  );
}
