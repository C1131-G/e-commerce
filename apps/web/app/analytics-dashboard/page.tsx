"use client";

import { useState } from "react";

export default function AnalyticsDashboard() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const topProducts = [
    { name: "🍅 Tomato", revenue: "₹75,000", sales: 500 },
    { name: "🥔 Potato", revenue: "₹60,000", sales: 420 },
    { name: "🧅 Onion", revenue: "₹55,000", sales: 380 },
    { name: "🥕 Carrot", revenue: "₹40,000", sales: 290 },
  ];

  const farmers = [
    { name: "👨‍🌾 Kumar", orders: 120, revenue: "₹50,000" },
    { name: "👨‍🌾 Ravi", orders: 95, revenue: "₹40,000" },
    { name: "👨‍🌾 Suresh", orders: 80, revenue: "₹35,000" },
    { name: "👨‍🌾 Mani", orders: 70, revenue: "₹28,000" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        📊 Analytics Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-black font-semibold">💰 Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">₹2,50,000</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-black font-semibold">📦 Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,245</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-black font-semibold">👨‍🌾 Farmers</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">320</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-black font-semibold">🏆 Top Product</h3>
          <p className="text-2xl font-bold text-orange-600 mt-2">🍅 Tomato</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          📅 Filter Analytics
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-3 rounded-lg text-black"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-3 rounded-lg text-black"
          />

          <button
            onClick={() =>
              alert(
                `📊 Analytics Filter Applied\n\nFrom: ${fromDate}\nTo: ${toDate}`
              )
            }
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-3"
          >
            🔍 Apply Filter
          </button>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-700">
            📈 Revenue Over Time
          </h2>

          <button
            onClick={() => alert("📤 Revenue Report Exported")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            📤 Export Report
          </button>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-black">Jan</p>
            <p className="font-bold text-green-700">₹20,000</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-black">Feb</p>
            <p className="font-bold text-green-700">₹35,000</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-black">Mar</p>
            <p className="font-bold text-green-700">₹50,000</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-black">Apr</p>
            <p className="font-bold text-green-700">₹45,000</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-black">May</p>
            <p className="font-bold text-green-700">₹60,000</p>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          🏆 Top Products
        </h2>

        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Sales</th>
              <th className="p-3">Revenue</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {topProducts.map((product, index) => (
              <tr key={index} className="border-b text-black">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.sales}</td>
                <td className="p-3">{product.revenue}</td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      alert(`📦 Product Details\n\n${product.name}`)
                    }
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                  >
                    👁 View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Farmer Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          👨‍🌾 Farmer Performance
        </h2>

        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3">Farmer</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Revenue</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {farmers.map((farmer, index) => (
              <tr key={index} className="border-b text-black">
                <td className="p-3">{farmer.name}</td>
                <td className="p-3">{farmer.orders}</td>
                <td className="p-3">{farmer.revenue}</td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      alert(
                        `👨‍🌾 Farmer Details\n\n${farmer.name}\nOrders: ${farmer.orders}\nRevenue: ${farmer.revenue}`
                      )
                    }
                    className="bg-purple-600 text-white px-3 py-2 rounded"
                  >
                    👁 View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
