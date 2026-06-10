"use client";

import { useState } from "react";

export default function DeliveryManagementPage() {
  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [editingProvider, setEditingProvider] = useState<any>(null);

  const providers = [
    {
      area: "Madurai",
      deliveries: 12,
      id: 1,
      name: "🚚 Raj Delivery Services",
      phone: "9876543210",
      status: "Active",
    },
    {
      area: "Chennai",
      deliveries: 8,
      id: 2,
      name: "🚛 Green Logistics",
      phone: "9876501234",
      status: "Suspended",
    },
    {
      area: "Coimbatore",
      deliveries: 20,
      id: 3,
      name: "📦 Fast Track Delivery",
      phone: "9999999999",
      status: "Active",
    },
  ];

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        🚚 Delivery Management
      </h1>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-black font-semibold">🚚 Providers</h2>
          <p className="text-3xl font-bold text-green-600">3</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-black font-semibold">📦 Deliveries</h2>
          <p className="text-3xl font-bold text-blue-600">40</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-black font-semibold">✅ Active</h2>
          <p className="text-3xl font-bold text-green-600">2</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-black font-semibold">⏸ Suspended</h2>
          <p className="text-3xl font-bold text-red-600">1</p>
        </div>
      </div>

      {/* Search + Create */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="🔍 Search Provider"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-full md:w-96 text-black"
          />

          <button
            onClick={() =>
              alert(
                "➕ Create Provider\n\nName: New Provider\nPhone: 9876543210\nArea:Madurai"
              )
            }
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
          >
            ➕ Create Provider
          </button>
        </div>
      </div>

      {/* Provider Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4">🚚 Provider</th>
              <th className="p-4">📞 Phone</th>
              <th className="p-4">📍 Area</th>
              <th className="p-4">📦 Orders</th>
              <th className="p-4">📊 Status</th>
              <th className="p-4">⚙ Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProviders.map((provider) => (
              <tr key={provider.id} className="border-b text-black">
                <td className="p-4">{provider.name}</td>
                <td className="p-4">{provider.phone}</td>
                <td className="p-4">{provider.area}</td>
                <td className="p-4">{provider.deliveries}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      provider.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {provider.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedProvider(provider)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                  >
                    👁 Details
                  </button>

                  <button
                    onClick={() => setEditingProvider(provider)}
                    className="bg-yellow-500 text-white px-3 py-2 rounded"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => alert(`⏸ Suspended ${provider.name}`)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  >
                    ⏸ Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Provider Details Section */}
      {selectedProvider && (
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-3xl font-bold text-green-700 mb-6">
            👤 Delivery Provider Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600">🚚 Provider Name</p>
              <p className="font-bold text-black">{selectedProvider.name}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600">📞 Phone</p>
              <p className="font-bold text-black">{selectedProvider.phone}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600">📍 Coverage Area</p>
              <p className="font-bold text-black">{selectedProvider.area}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600">📦 Active Deliveries</p>
              <p className="font-bold text-black">
                {selectedProvider.deliveries}
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-8 flex-wrap">
            <button
              onClick={() => alert("✅ Delivery Assigned")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              ✅ Assign Delivery
            </button>

            <button
              onClick={() => alert("📅 Schedule Created")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              📅 Schedule
            </button>

            <button
              onClick={() => alert("📞 Contact Provider")}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              📞 Contact
            </button>

            <button
              onClick={() => alert("⏸ Provider Suspended")}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              ⏸ Suspend
            </button>
          </div>
        </div>
      )}

      {editingProvider && (
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            ✏️ Edit Provider
          </h2>

          <input
            defaultValue={editingProvider.name}
            className="border p-3 rounded w-full mb-3 text-black"
          />

          <input
            defaultValue={editingProvider.phone}
            className="border p-3 rounded w-full mb-3 text-black"
          />

          <input
            defaultValue={editingProvider.area}
            className="border p-3 rounded w-full mb-3 text-black"
          />

          <div className="flex gap-3">
            <button
              onClick={() => alert("✅ Provider Updated")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              💾 Save Changes
            </button>

            <button
              onClick={() => setEditingProvider(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        🚚 Assign Delivery To Order
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          🚚 Assign Delivery to Order
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-600">📦 Order ID</p>
            <p className="font-bold text-black">ORD001</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-600">👨‍🌾 Farmer</p>
            <p className="font-bold text-black">Kumar</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-600">🛒 Customer</p>
            <p className="font-bold text-black">Ravi</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-600">📍 Delivery Area</p>
            <p className="font-bold text-black">Madurai</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select className="border p-3 rounded-lg text-black">
            <option>Select Delivery Provider 🚚</option>
            <option>Raj Delivery Services</option>
            <option>Green Logistics</option>
            <option>Fast Track Delivery</option>
          </select>

          <input type="date" className="border p-3 rounded-lg text-black" />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() =>
              alert(
                "✅ Order Assigned Successfully!\n\nOrder: ORD001\nFarmer: kumar\nCustomer: Ravi"
              )
            }
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            ✅ Assign Order
          </button>

          <button
            onClick={() => window.location.reload()}
            className="bg-gray-600 text-white px-5 py-3 rounded-lg"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}
