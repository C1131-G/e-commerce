"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function FinalReportPage() {
  const params = useParams();

  const [verdict, setVerdict] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    console.log({
      farmerId: params.id,
      verdict,
      reason,
      notes,
    });

    alert("Final Verification Report Submitted Successfully");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Final Report Submission
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
              Verification Summary
            </h2>

            <div className="space-y-2 rounded border p-4">
              <p>Stage 1 - Identity Check ✅</p>
              <p>Stage 2 - Farm Location ✅</p>
              <p>Stage 3 - Land Size ✅</p>
              <p>Stage 4 - Ownership Documents ✅</p>
              <p>Stage 5 - Crops Verification ✅</p>
              <p>Stage 6 - Two Year Records ✅</p>
            </div>
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Overall Verdict
            </label>

            <select
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              className="w-full rounded border p-2"
            >
              <option value="">
                Select Verdict
              </option>

              <option value="approve">
                Approve
              </option>

              <option value="reject">
                Reject
              </option>
            </select>
          </div>


          {verdict === "reject" && (
            <div>
              <label className="mb-2 block font-medium">
                Rejection Reason
              </label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded border p-3"
                rows={3}
                placeholder="Enter rejection reason..."
              />
            </div>
          )}


          <div>
            <label className="mb-2 block font-medium">
              Final Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded border p-3"
              rows={4}
              placeholder="Enter final verification notes..."
            />
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Supporting Photo Gallery
            </label>

            <input
              type="file"
              multiple
              className="rounded border p-2"
            />
          </div>


          <button
            onClick={handleSubmit}
            className="rounded bg-black px-5 py-2 text-white"
          >
            Submit Report
          </button>

        </div>

      </div>
    </main>
  );
}