"use client";

import { useState } from "react";
import Link from "next/link";

export default function AssignedFarmersPage() {
  const [search, setSearch] = useState("");

  const farmers = [
    {
      id: "1",
      name: "Ramesh Kumar",
      location: "Nellore, Andhra Pradesh",
      date: "06-08-2026",
      status: "Pending",
    },
    {
      id: "2",
      name: "Suresh Kumar",
      location: "Guntur, Andhra Pradesh",
      date: "05-08-2026",
      status: "In Progress",
    },
  ];

  const filteredFarmers = farmers.filter((farmer) =>
    farmer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-6 text-2xl font-bold">
          Assigned Farmers List
        </h1>

        <input
          type="text"
          placeholder="Search farmer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-5 w-full rounded border p-3"
        />

        <div className="rounded-lg bg-white p-5 shadow">

          {filteredFarmers.map((farmer) => (
            <div
              key={farmer.id}
              className="mb-4 rounded border p-4"
            >
              <p>
                <b>Farmer Name:</b> {farmer.name}
              </p>

              <p>
                <b>Location:</b> {farmer.location}
              </p>

              <p>
                <b>Date Assigned:</b> {farmer.date}
              </p>

              <p>
                <b>Status:</b> {farmer.status}
              </p>

              <Link
                href={`/verification/${farmer.id}/identity`}
                className="mt-3 inline-block rounded bg-black px-4 py-2 text-white"
              >
                Start Verification
              </Link>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}