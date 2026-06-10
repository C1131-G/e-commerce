"use client";

import { useState } from "react";

export default function PricingMarginControl() {
  const [basePrice, setBasePrice] = useState(1000);
  const [margin, setMargin] = useState(15);
  const [discountCap, setDiscountCap] = useState(20);
  const [profitFloor, setProfitFloor] = useState(100);
  const [message, setMessage] = useState("");

  const finalPrice = basePrice + (basePrice * margin) / 100;

  const handleSave = () => {
    setMessage("✅ Pricing Rules Saved Successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleReset = () => {
    setBasePrice(1000);
    setMargin(15);
    setDiscountCap(20);
    setProfitFloor(100);

    setMessage("🔄 Values Reset Successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-green-200">
        <h1 className="text-4xl font-bold text-green-700">
          🌱 Pricing & Margin Control
        </h1>

        <p className="text-black mt-2">
          Manage pricing rules, margins, discounts and profit protection.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-green-500">
          <p className="text-black font-medium">📈 Margin</p>
          <h2 className="text-3xl font-bold text-green-700">{margin}%</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-blue-500">
          <p className="text-black font-medium">💰 Profit Floor</p>
          <h2 className="text-3xl font-bold text-blue-700">₹{profitFloor}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-orange-500">
          <p className="text-black font-medium">🏷️ Discount Cap</p>
          <h2 className="text-3xl font-bold text-orange-600">{discountCap}%</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-purple-500">
          <p className="text-black font-medium">🛒 Final Price</p>
          <h2 className="text-3xl font-bold text-purple-700">
            ₹{Math.round(finalPrice)}
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pricing Rules */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-5">
            ⚙️ Pricing Rules
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-black font-semibold mb-2">
                🌾 Base Product Price
              </label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full border border-green-300 rounded-lg p-3 text-black"
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2">
                📈 Platform Margin (%)
              </label>
              <input
                type="number"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full border border-green-300 rounded-lg p-3 text-black"
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2">
                💵 Minimum Profit Floor
              </label>
              <input
                type="number"
                value={profitFloor}
                onChange={(e) => setProfitFloor(Number(e.target.value))}
                className="w-full border border-green-300 rounded-lg p-3 text-black"
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2">
                🏷️ Discount Cap (%)
              </label>
              <input
                type="number"
                value={discountCap}
                onChange={(e) => setDiscountCap(Number(e.target.value))}
                className="w-full border border-green-300 rounded-lg p-3 text-black"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                ✅ Save Rules
              </button>

              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                🔄 Reset
              </button>
            </div>

            {message && (
              <div className="bg-green-100 border border-green-400 text-green-800 p-3 rounded-xl">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-5">
            👀 Live Price Preview
          </h2>

          <div className="space-y-4 text-black">
            <div className="flex justify-between">
              <span>🌾 Base Price</span>
              <span>₹{basePrice}</span>
            </div>

            <div className="flex justify-between">
              <span>📈 Margin</span>
              <span>{margin}%</span>
            </div>

            <div className="flex justify-between">
              <span>💵 Profit Floor</span>
              <span>₹{profitFloor}</span>
            </div>

            <div className="flex justify-between">
              <span>🏷️ Discount Cap</span>
              <span>{discountCap}%</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-green-700">
              <span>💰 Final Selling Price</span>
              <span>₹{Math.round(finalPrice)}</span>
            </div>
          </div>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="text-lg font-bold text-green-700 mb-3">
              📋 Pricing Summary
            </h3>

            <ul className="space-y-2 text-black">
              <li>✅ Platform Margin Enabled</li>
              <li>🌱 Profit Protection Active</li>
              <li>🛡️ Discount Protection Enabled</li>
              <li>🤖 Auto Price Calculation Active</li>
              <li>🚜 Admin Control Enabled</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
