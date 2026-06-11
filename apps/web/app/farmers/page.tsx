export default function FarmersPage() {
  const farmers = [
    {
      id: "F001",
      location: "Madurai",
      name: "Rajesh Kumar",
      status: "Pending",
    },
    {
      id: "F002",
      location: "Coimbatore",
      name: "Suresh Kumar",
      status: "Approved",
    },
    {
      id: "F003",
      location: "Trichy",
      name: "Manikandan",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800">Farmer Management</h1>

        <p className="mt-2 text-gray-700">
          Manage farmer registrations and approvals.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Farmer ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {farmers.map((farmer) => (
              <tr key={farmer.id} className="border-b hover:bg-green-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {farmer.id}
                </td>

                <td className="px-6 py-4 text-gray-800">{farmer.name}</td>

                <td className="px-6 py-4 text-gray-800">{farmer.location}</td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      farmer.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {farmer.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    View Details
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
