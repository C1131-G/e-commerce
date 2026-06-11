export default function SubAdminPage() {
  const admins = [
    {
      email: "arun@example.com",
      id: "SA001",
      name: "Arun Kumar",
      role: "Manager",
      status: "Active",
    },
    {
      email: "priya@example.com",
      id: "SA002",
      name: "Priya Devi",
      role: "Approver",
      status: "Active",
    },
    {
      email: "karthik@example.com",
      id: "SA003",
      name: "Karthik",
      role: "Reviewer",
      status: "Suspended",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800">
          Sub Admin Management
        </h1>

        <p className="mt-2 text-gray-700">
          Manage sub-admin accounts and platform permissions.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-gray-200 hover:bg-green-50"
              >
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {admin.id}
                </td>

                <td className="px-6 py-4 text-gray-900">{admin.name}</td>

                <td className="px-6 py-4 text-gray-700">{admin.email}</td>

                <td className="px-6 py-4 text-gray-700">{admin.role}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      admin.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    View
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
