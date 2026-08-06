"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function TwoYearRecordsPage() {
  const params = useParams();

  const [verified, setVerified] = useState(false);
  const [notes, setNotes] = useState("");

  const handleComplete = () => {
    console.log({
      farmerId: params.id,
      verified,
      notes,
    });

    alert("Two Year Records Verification Stage Completed");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">
          Verification Stage 6 - Two Year Records
        </h1>

        <div className="space-y-5">
          <div>
            <h2 className="font-semibold">Farmer Information</h2>
            <p>Name: Ramesh Kumar</p>
            <p>ID: {params.id}</p>
          </div>

          <hr />

          <div>
            <h2 className="font-semibold">Submitted Records</h2>
            <div className="rounded border p-4">
              <p>2024 Crop Record</p>
              <p>2025 Crop Record</p>
            </div>
          </div>

          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={verified}
              onChange={(e) => setVerified(e.target.checked)}
            />
            Records Verified
          </label>

          <div>
            <label className="mb-2 block font-medium">
              Upload Additional Documents
            </label>

            <input
              type="file"
              className="rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Discrepancy Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full rounded border p-3"
              placeholder="Enter discrepancy notes..."
            />
          </div>

          <button
            onClick={handleComplete}
            className="rounded bg-black px-5 py-2 text-white"
          >
            Mark Stage Complete
          </button>
        </div>
      </div>
    </main>
  );
}