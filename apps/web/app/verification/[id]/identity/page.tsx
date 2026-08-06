"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function IdentityVerificationPage() {
  const params = useParams();

  const [nameMatch, setNameMatch] = useState(false);
  const [photoMatch, setPhotoMatch] = useState(false);
  const [idMatch, setIdMatch] = useState(false);
  const [notes, setNotes] = useState("");

  const handleComplete = () => {
    console.log({
      farmerId: params.id,
      nameMatch,
      photoMatch,
      idMatch,
      notes,
    });

    alert("Identity Verification Stage Completed");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">
          Verification Stage 1 - Identity Check
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Farmer Information</h2>
            <p>Name: Ramesh Kumar</p>
            <p>ID: {params.id}</p>
          </div>

          <hr />

          <div className="space-y-3">
            <h2 className="font-semibold">
              Identity Checklist
            </h2>

            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={nameMatch}
                onChange={(e) =>
                  setNameMatch(e.target.checked)
                }
              />
              Name matches
            </label>

            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={photoMatch}
                onChange={(e) =>
                  setPhotoMatch(e.target.checked)
                }
              />
              Photo matches
            </label>

            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={idMatch}
                onChange={(e) =>
                  setIdMatch(e.target.checked)
                }
              />
              ID number matches
            </label>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              On-site Photo Upload
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
              placeholder="Enter verification notes..."
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