"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function LandSizeVerificationPage() {
  const params = useParams();

  const [actualSize, setActualSize] = useState("");
  const [match, setMatch] = useState(false);
  const [notes, setNotes] = useState("");

  const handleComplete = () => {
    console.log({
      farmerId: params.id,
      actualSize,
      match,
      notes,
    });

    alert("Land Size Verification Stage Completed");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Verification Stage 3 - Land Size
        </h1>

        <div className="space-y-5">

          <div>
            <h2 className="font-semibold">
              Farmer Information
            </h2>

            <p>Name: Ramesh Kumar</p>
            <p>ID: {params.id}</p>
          </div>

          <hr />

          <div>
            <h2 className="font-semibold">
              Submitted Land Size
            </h2>

            <p>
              Submitted Size: 5 Acres
            </p>
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Actual Measured Land Size (Acres)
            </label>

            <input
              type="number"
              value={actualSize}
              onChange={(e) =>
                setActualSize(e.target.value)
              }
              className="w-full rounded border p-2"
              placeholder="Enter actual land size"
            />
          </div>


          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={match}
              onChange={(e) =>
                setMatch(e.target.checked)
              }
            />

            Land size matches submitted details
          </label>


          <div>
            <label className="mb-2 block font-medium">
              Land Boundary Photo Upload
            </label>

            <input
              type="file"
              className="rounded border p-2"
            />
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Verification Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              className="w-full rounded border p-3"
              rows={4}
              placeholder="Enter land verification notes..."
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