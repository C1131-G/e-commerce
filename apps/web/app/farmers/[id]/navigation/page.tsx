"use client";

import { useParams } from "next/navigation";

export default function FarmNavigationPage() {
  const params = useParams();

  const handleNavigate = () => {
    alert("Opening Maps Navigation...");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Farm Navigation
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
              Farm Location
            </h2>

            <div className="flex h-48 items-center justify-center rounded border bg-gray-50">
              Map will be integrated here
            </div>
          </div>


          <div className="rounded border p-4">
            <p>
              <span className="font-medium">
                Farmer Pin Location:
              </span>{" "}
              Nellore, Andhra Pradesh
            </p>

            <p>
              <span className="font-medium">
                Current Location:
              </span>{" "}
              Detecting current location
            </p>

            <p>
              <span className="font-medium">
                Distance:
              </span>{" "}
              5 km
            </p>

            <p>
              <span className="font-medium">
                Estimated Travel Time:
              </span>{" "}
              15 minutes
            </p>
          </div>


          <button
            onClick={handleNavigate}
            className="rounded bg-black px-5 py-2 text-white"
          >
            Navigate
          </button>

        </div>

      </div>
    </main>
  );
}