"use client";

import { useState } from "react";

export default function FarmerManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [farmers, setFarmers] = useState([
    {
      crop: "Tomato",
      id: 1,
      location: "Namakkal",
      name: "Ravi Kumar",
      profile: "80%",
      status: "Pending",
    },
    {
      crop: "Onion",
      id: 2,
      location: "Salem",
      name: "Suresh",
      profile: "100%",
      status: "Approved",
    },
    {
      crop: "Banana",
      id: 3,
      location: "Madurai",
      name: "Manikandan",
      profile: "65%",
      status: "Rejected",
    },
  ]);

  const handleApprove = (id: number) => {
    setFarmers(
      farmers.map((farmer) =>
        farmer.id === id ? { ...farmer, status: "Approved" } : farmer
      )
    );
  };

  const handleReject = (id: number) => {
    setFarmers(
      farmers.map((farmer) =>
        farmer.id === id ? { ...farmer, status: "Rejected" } : farmer
      )
    );
  };

  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch = farmer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || farmer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalFarmers = farmers.length;
  const approvedFarmers = farmers.filter((f) => f.status === "Approved").length;
  const pendingFarmers = farmers.filter((f) => f.status === "Pending").length;
  const rejectedFarmers = farmers.filter((f) => f.status === "Rejected").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        👨‍🌾 Farmer Management
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md border p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            👨‍🌾 Total Farmers
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {totalFarmers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border p-6">
          <h2 className="text-lg font-semibold text-gray-700">✅ Approved</h2>
          <p className="text-4xl font-bold text-green-500 mt-2">
            {approvedFarmers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border p-6">
          <h2 className="text-lg font-semibold text-gray-700">⏳ Pending</h2>
          <p className="text-4xl font-bold text-yellow-500 mt-2">
            {pendingFarmers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border p-6">
          <h2 className="text-lg font-semibold text-gray-700">❌ Rejected</h2>
          <p className="text-4xl font-bold text-red-500 mt-2">
            {rejectedFarmers}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="🔍 Search Farmer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-900"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 text-gray-900"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4 text-left">👨‍🌾 Name</th>
              <th className="p-4 text-left">📍 Location</th>
              <th className="p-4 text-left">🌱 Crop</th>
              <th className="p-4 text-left">📊 Profile</th>
              <th className="p-4 text-left">📌 Status</th>
              <th className="p-4 text-left">⚡ Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{farmer.name}</td>
                <td className="p-4">{farmer.location}</td>
                <td className="p-4">{farmer.crop}</td>
                <td className="p-4">{farmer.profile}</td>

                <td className="p-4">
                  {farmer.status === "Approved" && (
                    <span className="text-green-600 font-semibold">
                      ✅ Approved
                    </span>
                  )}

                  {farmer.status === "Pending" && (
                    <span className="text-yellow-600 font-semibold">
                      ⏳ Pending
                    </span>
                  )}

                  {farmer.status === "Rejected" && (
                    <span className="text-red-600 font-semibold">
                      ❌ Rejected
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => alert(`Viewing ${farmer.name}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                    >
                      👁️ View
                    </button>

                    <button
                      onClick={() => handleApprove(farmer.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                    >
                      ✅ Approve
                    </button>

                    <button
                      onClick={() => handleReject(farmer.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                    >
                      ❌ Reject
                    </button>

                    <button
                      onClick={() => alert(`Recheck for ${farmer.name}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                    >
                      🔄 Recheck
                    </button>

                    <button
                      onClick={() =>
                        alert(`Assign Authorizer to ${farmer.name}`)
                      }
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg"
                    >
                      📋 Assign
                    </button>

                    <button
                      onClick={() => alert(`Edit ${farmer.name}`)}
                      className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded-lg"
                    >
                      ✏️ Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
