import { notFound } from "next/navigation";
import Link from "next/link";

type Farmer = {
  id: string;
  name: string;
  phone: string;
  location?: string;
  status?: string;
  farmLocation?: string;
  district?: string;
  village?: string;
};

async function getFarmer(id: string): Promise<Farmer | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const res = await fetch(
      new URL(`/api/farmers/${id}`, baseUrl).toString(),
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    return json.data;
  } catch (error) {
    console.error("Farmer fetch error:", error);
    return null;
  }
}

export default async function FarmerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const farmer = await getFarmer(id);

  if (!farmer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-lg bg-white p-6 shadow">
          <h1 className="text-3xl font-bold">
            Farmer Details
          </h1>

          <p className="mt-2 text-gray-500">
            Complete farmer verification information
          </p>

          <Link
            href={`/verification/${id}/identity`}
            className="mt-4 inline-block rounded bg-black px-5 py-2 text-white"
          >
            Start Identity Verification
          </Link>
        </div>


        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Personal Information
          </h2>

          <div className="space-y-3">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {farmer.name}
            </p>

            <p>
              <span className="font-medium">Phone:</span>{" "}
              {farmer.phone}
            </p>

            <p>
              <span className="font-medium">Location:</span>{" "}
              {farmer.location ??
                farmer.farmLocation ??
                farmer.district ??
                farmer.village ??
                "N/A"}
            </p>

            <p>
              <span className="font-medium">Status:</span>{" "}
              {farmer.status ?? "Pending"}
            </p>
          </div>
        </section>


        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Verification Summary
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">

            <div className="rounded border p-6 text-center">
              <p className="text-gray-500">
                Documents
              </p>
              <h3 className="text-2xl font-bold">
                Pending
              </h3>
            </div>


            <div className="rounded border p-6 text-center">
              <p className="text-gray-500">
                Land Check
              </p>
              <h3 className="text-2xl font-bold">
                Pending
              </h3>
            </div>


            <div className="rounded border p-6 text-center">
              <p className="text-gray-500">
                Final Status
              </p>
              <h3 className="text-2xl font-bold">
                {farmer.status ?? "Pending"}
              </h3>
            </div>

          </div>
        </section>


        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Location Map
          </h2>

          <div className="flex h-48 items-center justify-center rounded border bg-gray-50">
            Map will be integrated here
          </div>
        </section>


        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Verification Notes
          </h2>

          <div className="rounded border p-4">
            <p className="text-gray-500">
              No notes available
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}