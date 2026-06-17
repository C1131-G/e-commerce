export default function FarmerDashboard() {
  const stats = [
    {
      title: "Active Listings",
      value: "12",
      icon: "🌾",
    },
    {
      title: "Total Stock",
      value: "850 KG",
      icon: "📦",
    },
    {
      title: "Pending Orders",
      value: "5",
      icon: "🛒",
    },
    {
      title: "Revenue",
      value: "₹25,000",
      icon: "💰",
    },
  ];

  const products = [
    {
      name: "Tomato",
      stock: "100 KG",
      status: "Approved",
    },
    {
      name: "Onion",
      stock: "50 KG",
      status: "Pending",
    },
    {
      name: "Potato",
      stock: "20 KG",
      status: "Rejected",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">
        👨‍🌾 Farmer Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <div className="text-3xl">{item.icon}</div>
            <h2 className="text-lg font-semibold mt-2">
              {item.title}
            </h2>
            <p className="text-2xl font-bold text-green-600">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Low Stock Alert */}
      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mb-6">
        ⚠️ Low Stock Warning: Potato stock is below 25 KG
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button className="bg-green-600 text-white px-5 py-3 rounded-lg">
          ➕ Add New Listing
        </button>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
          📋 View Orders
        </button>
      </div>

      {/* Product Listings */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          🌱 My Listings
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Crop</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  {product.status === "Approved" && "🟢 Approved"}
                  {product.status === "Pending" && "🟡 Pending"}
                  {product.status === "Rejected" && "🔴 Rejected"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}