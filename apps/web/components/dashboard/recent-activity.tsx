export default function RecentActivity() {
  const activities = [
    "Farmer Rajesh registered",
    "20 Listings approved",
    "New delivery provider added",
    "Revenue updated for today",
    "Sub Admin account created",
  ];

  return (
    <div className="rounded-2xl bg-white border border-green-100 p-6 shadow-md">
      <h2 className="text-xl font-bold text-green-800">Recent Activity</h2>

      <div className="mt-4 space-y-3">
        {activities.map((activity) => (
          <div key={activity} className="rounded-lg border border-gray-100 p-3">
            <p className="text-gray-700">{activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
