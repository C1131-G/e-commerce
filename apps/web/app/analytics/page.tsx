"use client";
export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Farmers",
      value: "1,248",
    },
    {
      title: "Pending Approvals",
      value: "24",
    },
    {
      title: "Total Orders",
      value: "3,567",
    },
    {
      title: "Revenue",
      value: "₹8.4 Lakh",
    },
  ];

  const activities = [
    "24 Farmers registered today",
    "18 Listings approved",
    "12 Orders dispatched",
    "5 New delivery partners added",
  ];

  const products = ["Organic Tomato", "Fresh Onion", "Green Chilli", "Brinjal"];

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-5xl font-bold text-green-800">Analytics Dashboard</h1>

      <p className="mt-2 text-lg text-gray-700">
        Monitor platform performance and business metrics.
      </p>

      {/* Stats Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-gray-600">{item.title}</p>

            <h2 className="mt-3 text-4xl font-bold text-green-700">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Revenue Section */}
      <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-green-800">
          Revenue Summary
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-xl bg-green-100 p-4 text-center">
            <p className="text-gray-700">Jan</p>
            <p className="text-2xl font-bold text-green-700">₹1.2L</p>
          </div>

          <div className="rounded-xl bg-green-100 p-4 text-center">
            <p className="text-gray-700">Feb</p>
            <p className="text-2xl font-bold text-green-700">₹1.8L</p>
          </div>

          <div className="rounded-xl bg-green-100 p-4 text-center">
            <p className="text-gray-700">Mar</p>
            <p className="text-2xl font-bold text-green-700">₹2.5L</p>
          </div>

          <div className="rounded-xl bg-green-100 p-4 text-center">
            <p className="text-gray-700">Apr</p>
            <p className="text-2xl font-bold text-green-700">₹2.9L</p>
          </div>
        </div>
      </div>

      {/* Activity + Products */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-green-800">
            Platform Activity
          </h2>

          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity}
                className="rounded-lg bg-green-50 p-4 text-gray-800"
              >
                ✓ {activity}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-green-800">
            Top Products
          </h2>

          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product}
                className="rounded-lg bg-green-50 p-4 text-gray-800"
              >
                {product}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-8">
        <button
          onClick={() => {
            const report = `
Analytics Report

Total Farmers: 1248
Pending Approvals: 24
Total Orders: 3567
Revenue: ₹8.4 Lakh

Generated On: ${new Date().toLocaleString()}
`;

            const blob = new Blob([report], {
              type: "text/plain",
            });

            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "analytics-report.txt";
            a.click();

            URL.revokeObjectURL(url);
          }}
          className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
        >
          Download Report
        </button>
      </div>
    </div>
  );
}
