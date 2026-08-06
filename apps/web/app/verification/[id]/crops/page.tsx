"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function CropsVerificationPage() {
  const params = useParams();

  const [actualCrops, setActualCrops] = useState("");
  const [farmingMethod, setFarmingMethod] = useState(false);
  const [organic, setOrganic] = useState(false);
  const [notes, setNotes] = useState("");

  const handleComplete = () => {
    console.log({
      farmerId: params.id,
      actualCrops,
      farmingMethod,
      organic,
      notes,
    });

    alert("Crops and Farming Method Verification Stage Completed");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Verification Stage 5 - Crops and Farming Method
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
              Submitted Crop Details
            </h2>

            <p>
              Crops: Rice, Vegetables
            </p>
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Actual Observed Crops
            </label>

            <input
              value={actualCrops}
              onChange={(e) =>
                setActualCrops(e.target.value)
              }
              className="w-full rounded border p-2"
              placeholder="Enter observed crops"
            />
          </div>


          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={farmingMethod}
              onChange={(e) =>
                setFarmingMethod(e.target.checked)
              }
            />

            Farming method verified
          </label>


          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={organic}
              onChange={(e) =>
                setOrganic(e.target.checked)
              }
            />

            Organic certificate verified (if applicable)
          </label>


          <div>
            <label className="mb-2 block font-medium">
              Field Photos Upload
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
              placeholder="Enter crop verification notes..."
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