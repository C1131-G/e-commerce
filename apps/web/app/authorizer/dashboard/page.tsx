export default function AuthorizerDashboard() {
  const stats = [
    { title: "Assigned", count: 12 },
    { title: "In Progress", count: 5 },
    { title: "Completed", count: 6 },
    { title: "Rejected", count: 1 },
  ];

  const tasks = [
    {
      name: "Ramesh Kumar",
      location: "Nellore, Andhra Pradesh",
      status: "Pending",
    },
    {
      name: "Suresh Kumar",
      location: "Guntur, Andhra Pradesh",
      status: "In Progress",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-6 text-2xl font-bold">
          Authorizer Dashboard
        </h1>

        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-lg bg-white p-5 shadow"
            >
              <h2 className="text-gray-500">
                {item.title}
              </h2>
              <p className="text-3xl font-bold">
                {item.count}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-white p-5 shadow">
          <h2 className="mb-4 text-xl font-bold">
            Assigned Verification Tasks
          </h2>

          {tasks.map((task) => (
            <div
              key={task.name}
              className="mb-3 rounded border p-4"
            >
              <p>
                <b>Farmer:</b> {task.name}
              </p>

              <p>
                <b>Location:</b> {task.location}
              </p>

              <p>
                <b>Status:</b> {task.status}
              </p>

              <button className="mt-3 rounded bg-black px-4 py-2 text-white">
                Start Verification
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-white p-5 shadow">
          <h2 className="mb-3 text-xl font-bold">
            Farm Locations Map
          </h2>

          <div className="flex h-48 items-center justify-center rounded border">
            Map will be integrated here
          </div>
        </div>

      </div>
    </main>
  );
}