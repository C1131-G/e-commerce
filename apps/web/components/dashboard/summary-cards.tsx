"use client";
import { useRouter } from "next/navigation";
export default function SummaryCards() {
  const router = useRouter();
  const stats = [
    {
      change: "+12%",
      title: "Total Farmers",
      value: "1,248",
    },
    {
      change: "+5 Today",
      title: "Pending Approvals",
      value: "24",
    },
    {
      change: "+18%",
      title: "Total Orders",
      value: "3,567",
    },
    {
      change: "+21%",
      title: "Revenue",
      value: "₹8.4 Lakh",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          onClick={() => router.push("item.path")}
          className=" cursor-pointerrounded-2xl bg-white border border-green-100 p-6 shadow-md hover:shadow-lg transition"
        >
          <p className="text-sm font-medium text-gray-500">{item.title}</p>

          <h2 className="mt-3 text-4xl font-bold text-green-700">
            {item.value}
          </h2>

          <p className="mt-2 text-sm font-semibold text-green-600">
            {item.change}
          </p>
        </div>
      ))}
    </div>
  );
}
