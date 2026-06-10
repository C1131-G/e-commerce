"use client";

import { useState } from "react";

export default function ListingApprovalsPage() {
  const [search, setSearch] = useState("");
  const [selectedListing, setSelectedListing] = useState<any>(null);

  const [listings, setListings] = useState([
    {
      category: "Vegetables",
      crop: "Tomato",
      farmer: "Ravi Kumar",
      id: 1,
      location: "Namakkal",
      price: "₹40/Kg",
      status: "Pending",
      stock: "500 Kg",
    },
    {
      category: "Vegetables",
      crop: "Onion",
      farmer: "Suresh",
      id: 2,
      location: "Salem",
      price: "₹30/Kg",
      status: "Approved",
      stock: "800 Kg",
    },
    {
      category: "Vegetables",
      crop: "Potato",
      farmer: "Manikandan",
      id: 3,
      location: "Erode",
      price: "₹25/Kg",
      status: "Rejected",
      stock: "1000 Kg",
    },
    {
      category: "Vegetables",
      crop: "Brinjal",
      farmer: "Prakash",
      id: 4,
      location: "Karur",
      price: "₹35/Kg",
      status: "Pending",
      stock: "650 Kg",
    },
  ]);

  const handleApprove = (id: number) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  const handleReject = (id: number) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Rejected" } : item
      )
    );
  };

  const filteredListings = listings.filter(
    (item) =>
      item.crop.toLowerCase().includes(search.toLowerCase()) ||
      item.farmer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-green-700">
          🌾 Listing Approvals
        </h1>
        <p className="text-gray-600 mt-2">
          Review and approve farmer product listings
        </p>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
          <h3 className="text-gray-500 font-medium">⏳ Pending Listings</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {listings.filter((item) => item.status === "Pending").length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
          <h3 className="text-gray-500 font-medium">✅ Approved Listings</h3>
          <p className="text-3xl font-bold text-green-600">
            {listings.filter((item) => item.status === "Approved").length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500">
          <h3 className="text-gray-500 font-medium">❌ Rejected Listings</h3>
          <p className="text-3xl font-bold text-red-600">
            {listings.filter((item) => item.status === "Rejected").length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Crop or Farmer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-4 text-left">🌱 Crop</th>
                <th className="p-4 text-left">👨‍🌾 Farmer</th>
                <th className="p-4 text-left">📦 Category</th>
                <th className="p-4 text-left">💰 Price</th>
                <th className="p-4 text-left">📊 Stock</th>
                <th className="p-4 text-left">📍 Location</th>
                <th className="p-4 text-left">📌 Status</th>
                <th className="p-4 text-center">⚙️ Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="border-b hover:bg-green-50">
                  <td className="p-4 font-semibold text-black">
                    {listing.crop}
                  </td>

                  <td className="p-4 text-black">{listing.farmer}</td>

                  <td className="p-4 text-black">{listing.category}</td>

                  <td className="p-4 text-black">{listing.price}</td>

                  <td className="p-4 text-black">{listing.stock}</td>

                  <td className="p-4 text-black">{listing.location}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        listing.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : (listing.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700")
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(listing.id)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg"
                      >
                        ✅ Approve
                      </button>

                      <button
                        onClick={() => handleReject(listing.id)}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg"
                      >
                        ❌ Reject
                      </button>

                      <button
                        onClick={() =>
                          alert(
                            `Crop: ${listing.crop}
Farmer: ${listing.farmer}
Category: ${listing.category}
Price: ${listing.price}
Stock: ${listing.stock}
Location: ${listing.location}
Status: ${listing.status}`
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                      >
                        👁️ View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredListings.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-6 text-gray-500">
                    No Listings Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
