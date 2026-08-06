export default function FarmerProfilePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">

        <h1 className="mb-6 text-2xl font-bold">
          Farmer Profile — Read Only
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            Farmer Bio Summary
          </h2>

          <p>Name: Ramesh Kumar</p>
          <p>Farmer ID: 1</p>
          <p>Location: Nellore, Andhra Pradesh</p>
        </section>

        <hr />

        <section className="my-6">
          <h2 className="text-xl font-semibold">
            Land Details
          </h2>

          <p>Land Size: 5 Acres</p>
          <p>Ownership: Own Land</p>
          <p>Crop Type: Rice, Vegetables</p>
        </section>

        <hr />

        <section className="my-6">
          <h2 className="text-xl font-semibold">
            Documents
          </h2>

          <div className="rounded border p-4">
            Document thumbnails will appear here
          </div>
        </section>

        <hr />

        <section className="my-6">
          <h2 className="text-xl font-semibold">
            Farm Location
          </h2>

          <div className="flex h-40 items-center justify-center rounded border">
            Map location will be shown here
          </div>
        </section>

        <hr />

        <section className="mt-6">
          <h2 className="text-xl font-semibold">
            Last 2 Years Records
          </h2>

          <ul className="list-disc pl-5">
            <li>2024 Crop Record</li>
            <li>2025 Crop Record</li>
          </ul>
        </section>

      </div>
    </main>
  );
}