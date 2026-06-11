export default function PendingTasks() {
  const tasks = [
    "Farmer Verification Requests",
    "Product Listing Approvals",
    "Delivery Provider Assignment",
    "Profile Recheck Requests",
  ];

  return (
    <div className="rounded-2xl bg-white border border-green-100 p-6 shadow-md">
      <h2 className="text-xl font-bold text-green-800">Pending Tasks</h2>

      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <div
            key={task}
            className="rounded-lg border border-green-100 bg-green-50 p-3"
          >
            <p className="font-medium text-gray-700">{task}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
