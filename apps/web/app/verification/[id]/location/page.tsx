"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function FarmLocationVerificationPage() {
  const params = useParams();

  const [locationMatch, setLocationMatch] = useState(false);
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");

  const handleComplete = () => {
    console.log({
      farmerId: params.id,
      locationMatch,
      distance,
      notes,
    });

    alert("Farm Location Verification Stage Completed");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Verification Stage 2 - Farm Location
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
            <h2 className="mb-3 font-semibold">
              Location Verification
            </h2>

            <div className="flex h-48 items-center justify-center rounded border bg-gray-50">
              Map will be integrated here
            </div>
          </div>


          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={locationMatch}
              onChange={(e) =>
                setLocationMatch(e.target.checked)
              }
            />

            Location matches submitted GPS
          </label>


          <div>
            <label className="mb-2 block font-medium">
              Distance Discrepancy (meters)
            </label>

            <input
              type="number"
              value={distance}
              onChange={(e) =>
                setDistance(e.target.value)
              }
              className="w-full rounded border p-2"
              placeholder="Enter distance difference"
            />
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Farm Photo Upload
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
              placeholder="Enter location verification notes..."
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