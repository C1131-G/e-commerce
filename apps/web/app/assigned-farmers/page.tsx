"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";

const statusClasses: Record<string, string> = {
  Assigned: "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

type Farmer = {
  id: string;
  name: string;
  location: string;
  assignedDate: string;
  status: string;
};

type AssignedFarmersResponse = {
  data: Farmer[];
};

async function fetchAssignedFarmers(): Promise<AssignedFarmersResponse> {
  const response = await fetch("/api/assigned-farmers");
  return response.json();
}

export default function AssignedFarmersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const query = useQuery<AssignedFarmersResponse>({
    queryKey: ["assignedFarmers"],
    queryFn: fetchAssignedFarmers,
  });

  const farmers = useMemo(() => {
    if (!query.data?.data) return [];

    return query.data.data.filter((farmer: Farmer) => {
      const matchesSearch =
        farmer.name.toLowerCase().includes(search.toLowerCase()) ||
        farmer.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || farmer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [query.data, search, statusFilter]);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Assigned Farmers</h1>
            <p className="text-gray-500">All farmers assigned for verification.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search by name or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded border border-border bg-white px-4 py-2 shadow-sm"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded border border-border bg-white px-4 py-2 shadow-sm"
            >
              <option>All</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Farmer Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Assigned Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {farmers.map((farmer) => (
                <tr key={farmer.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {farmer.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {farmer.location}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {farmer.assignedDate}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusClasses[farmer.status] ?? "bg-gray-100 text-gray-800"}`}>
                      {farmer.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <Button variant="secondary" size="sm" onClick={() => alert(`Start verification for ${farmer.name}`)}>
                      Start Verification
                    </Button>
                  </td>
                </tr>
              ))}

              {farmers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    {query.isLoading
                      ? "Loading farmers..."
                      : "No farmers match your search or filter."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
