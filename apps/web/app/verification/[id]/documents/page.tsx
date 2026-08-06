"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function DocumentsVerificationPage() {
  const params = useParams();

  const [verified, setVerified] = useState(false);
  const [notes, setNotes] = useState("");

  const handleComplete = () => {
    console.log({
      farmerId: params.id,
      verified,
      notes,
    });

    alert("Ownership Documents Verification Stage Completed");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Verification Stage 4 - Ownership Documents
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
              Ownership Details
            </h2>

            <p>
              Ownership Type: Land Owner
            </p>
          </div>


          <div>
            <h2 className="mb-2 font-semibold">
              Documents
            </h2>

            <div className="rounded border p-4">
              Land ownership document preview
            </div>
          </div>


          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={verified}
              onChange={(e) =>
                setVerified(e.target.checked)
              }
            />

            Documents verified
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
              Verification Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              className="w-full rounded border p-3"
              rows={4}
              placeholder="Enter document verification notes..."
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