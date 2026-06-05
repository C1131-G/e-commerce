"use client";

import { useState } from "react";

export default function RoleManagement() {
  const [showForm, setShowForm] = useState(false);

  const roles = [
    {
      id: 1,
      name: "Super Admin",
      permissions: 25,
      status: "Active",
      users: 1,
    },
    {
      id: 2,
      name: "Sub Admin",
      permissions: 18,
      status: "Active",
      users: 8,
    },
    {
      id: 3,
      name: "Authorizer",
      permissions: 10,
      status: "Pending",
      users: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold text-green-800">
            🌳 Role Management
          </h1>

          <p className="text-green-700 mt-2 text-lg">
            Manage platform roles, permissions and agricultural operations
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl shadow-lg transition"
        >
          🌱 Create Role
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100">🌱 Total Roles</p>
              <h2 className="text-5xl font-bold mt-2">3</h2>
            </div>
            <span className="text-6xl">🌳</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100">👨‍🌾 Active Users</p>
              <h2 className="text-5xl font-bold mt-2">21</h2>
            </div>
            <span className="text-6xl">🚜</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-lime-500 to-green-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100">🔐 Permissions</p>
              <h2 className="text-5xl font-bold mt-2">53</h2>
            </div>
            <span className="text-6xl">🌾</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search roles..."
          className="w-full border border-green-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-green-700 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">🌾 Platform Roles</h2>
        </div>

        <table className="w-full">
          <thead className="bg-green-50">
            <tr>
              <th className="text-left px-6 py-4 text-green-800">Role Name</th>
              <th className="text-left px-6 py-4 text-green-800">Users</th>
              <th className="text-left px-6 py-4 text-green-800">
                Permissions
              </th>
              <th className="text-left px-6 py-4 text-green-800">Status</th>
              <th className="text-left px-6 py-4 text-green-800">Actions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="border-t hover:bg-green-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-gray-700">
                  {role.name}
                </td>

                <td className="px-6 py-4 text-gray-600">{role.users}</td>

                <td className="px-6 py-4 text-gray-600">{role.permissions}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      role.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {role.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      View
                    </button>

                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-3xl w-[700px] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-green-800">
                🌱 Create New Role
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-red-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <label className="block font-semibold mb-2 text-gray-700">
              Role Name
            </label>

            <input
              type="text"
              placeholder="Enter role name"
              className="w-full border border-green-300 p-3 rounded-xl mb-6"
            />

            <h3 className="font-bold text-green-800 mb-4 text-lg">
              Permissions
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <label>
                <input type="checkbox" className="mr-2" /> 🌳 Dashboard
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> 🔐 Role Management
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> 👨‍🌾 Farmer Management
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> 🚜 Listing Approval
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> 📦 Delivery
                Management
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> 📊 Analytics
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> 🔔 Notifications
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> ⚙️ Settings
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowForm(false)}
                className="border border-gray-300 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg">
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
