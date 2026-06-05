"use client";

export default function Dashboard() {
  const stats = [
    {
      color: "text-green-600",
      title: "Total Farmers",
      value: "1,245",
    },
    {
      color: "text-blue-600",
      title: "Products Listed",
      value: "8,532",
    },
    {
      color: "text-purple-600",
      title: "Orders",
      value: "3,426",
    },
    {
      color: "text-amber-600",
      title: "Revenue",
      value: "₹12.5L",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>

        <p className="text-slate-500 mt-2">
          Welcome to Agri E-Commerce Admin Portal
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-500">{item.title}</p>

            <h2 className={`text-4xl font-bold mt-3 ${item.color}`}>
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
          </div>

          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500">
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="py-3">#ORD001</td>
                  <td>Ravi Kumar</td>
                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Delivered
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-3">#ORD002</td>
                  <td>Priya</td>
                  <td>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-3">#ORD003</td>
                  <td>Arun</td>
                  <td>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      Shipped
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>

          <div className="p-6 grid gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl text-left">
              Add New Farmer
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-left">
              Approve Listings
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl text-left">
              Manage Roles
            </button>

            <button className="bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-xl text-left">
              View Reports
            </button>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-white rounded-2xl shadow mt-8">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Platform Overview</h2>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-slate-500">Active Farmers</p>
              <h3 className="text-3xl font-bold text-green-600">1,120</h3>
            </div>

            <div>
              <p className="text-slate-500">Pending Approvals</p>
              <h3 className="text-3xl font-bold text-amber-600">48</h3>
            </div>

            <div>
              <p className="text-slate-500">Active Deliveries</p>
              <h3 className="text-3xl font-bold text-blue-600">312</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
