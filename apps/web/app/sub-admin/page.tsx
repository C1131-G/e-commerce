"use client";

import { useState } from "react";

interface SubAdmin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Suspended";
}

export default function SubAdminManagement() {
  const [showModal, setShowModal] = useState(false);

  const [admins, setAdmins] = useState<SubAdmin[]>([
    {
      email: "admin1@example.com",
      id: 1,
      name: "Admin User 1",
      role: "Manager",
      status: "Active",
    },
    {
      email: "admin2@example.com",
      id: 2,
      name: "Admin User 2",
      role: "Operations",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Manager");

  const handleCreate = () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    const newAdmin: SubAdmin = {
      email,
      id: Date.now(),
      name,
      role,
      status: "Active",
    };

    setAdmins([...admins, newAdmin]);

    setName("");
    setEmail("");
    setRole("Manager");
    setShowModal(false);

    alert("Sub Admin Created Successfully");
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this Sub Admin?")) {
      setAdmins(admins.filter((a) => a.id !== id));
    }
  };

  const handleSuspend = (id: number) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === "Active" ? "Suspended" : "Active",
            }
          : admin
      )
    );
  };

  const handleView = (admin: SubAdmin) => {
    alert(
      `Name: ${admin.name}
Email: ${admin.email}
Role: ${admin.role}
Status: ${admin.status}`
    );
  };

  const handleEdit = (id: number) => {
    const admin = admins.find((a) => a.id === id);

    if (!admin) {
      return;
    }

    const updatedName = prompt("Edit Name", admin.name);

    if (!updatedName) {
      return;
    }

    setAdmins(
      admins.map((a) =>
        a.id === id
          ? {
              ...a,
              name: updatedName,
            }
          : a
      )
    );
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = admins.filter((a) => a.status === "Active").length;

  const suspendedCount = admins.filter((a) => a.status === "Suspended").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold text-green-800">
            🌿 Sub Admin Management
          </h1>

          <p className="text-gray-600 mt-2">
            Manage platform administrators and access control
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          ➕ Create Sub Admin
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white p-6 rounded-2xl shadow">
          <p>👥 Total Sub Admins</p>
          <h2 className="text-5xl font-bold mt-2">{admins.length}</h2>
        </div>

        <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white p-6 rounded-2xl shadow">
          <p>✅ Active Sub Admins</p>
          <h2 className="text-5xl font-bold mt-2">{activeCount}</h2>
        </div>

        <div className="bg-gradient-to-r from-red-700 to-red-500 text-white p-6 rounded-2xl shadow">
          <p>⛔ Suspended Sub Admins</p>
          <h2 className="text-5xl font-bold mt-2">{suspendedCount}</h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow p-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search sub admins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-4 rounded-xl outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-700 to-emerald-500 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">🌾 Sub Admin List</h2>
        </div>

        <table className="w-full">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-4 text-left">👤 Name</th>

              <th className="px-6 py-4 text-left">📧 Email</th>

              <th className="px-6 py-4 text-left">🛡️ Role</th>

              <th className="px-6 py-4 text-left">📌 Status</th>

              <th className="px-6 py-4 text-left">⚙️ Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id} className="border-b hover:bg-green-50">
                <td className="px-4 py-4 font-medium">{admin.name}</td>

                <td className="px-4 py-4">{admin.email}</td>

                <td className="px-4 py-4">{admin.role}</td>

                <td className="px-4 py-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {admin.status}
                  </span>
                </td>

                <td className="px-4 py-4 flex gap-2">
                  <button
                    onClick={() => handleView(admin)}
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleEdit(admin.id)}
                    className="bg-amber-500 text-white px-3 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleSuspend(admin.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Suspend
                  </button>

                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="bg-slate-700 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-2xl p-6 shadow-2xl">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              🌱 Create Sub Admin
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-full border-2 border-gray-300 p-3 rounded-lg text-black"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full border-2 border-gray-300 p-3 rounded-lg text-black"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border-2 border-gray-300 p-3 rounded-lg text-black"
              >
                <option value="Manager">Manager</option>
                <option value="Operations">Operations</option>
                <option value="Authorizer">Authorizer</option>
                <option value="Support">Support</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
