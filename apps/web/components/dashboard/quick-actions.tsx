"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    { label: "Approve Farmer", path: "/farmers" },
    { label: "Review Listing", path: "/listings" },
    { label: "Create Sub Admin", path: "/sub-admin" },
    { label: "View Analytics", path: "/analytics" },
  ];

  return (
    <div className="rounded-2xl bg-white border border-green-100 p-6 shadow-md">
      <h2 className="text-xl font-bold text-green-800">Quick Actions</h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => router.push(action.path)}
            className="rounded-xl bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
