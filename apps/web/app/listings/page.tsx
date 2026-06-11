export default function ListingsPage() {
  const listings = [
    {
      farmer: "Rajesh Kumar",
      id: "L001",
      price: "₹40/kg",
      product: "Organic Tomatoes",
      status: "Pending",
    },
    {
      farmer: "Suresh Kumar",
      id: "L002",
      price: "₹35/kg",
      product: "Fresh Onions",
      status: "Approved",
    },
    {
      farmer: "Manikandan",
      id: "L003",
      price: "₹60/kg",
      product: "Green Chilli",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800">Listing Approvals</h1>

        <p className="mt-2 text-gray-700">
          Review and approve product listings.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Listing ID</th>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Farmer</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="border-b hover:bg-green-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {listing.id}
                </td>

                <td className="px-6 py-4 text-gray-800">{listing.product}</td>

                <td className="px-6 py-4 text-gray-800">{listing.farmer}</td>

                <td className="px-6 py-4 text-gray-800">{listing.price}</td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      listing.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {listing.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
