'use client';

import Link from 'next/link';
import { farmers } from '../data/farmers';

export default function AssignedFarmersPage() {
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Assigned Farmers</h1>
        <p className="text-sm text-gray-600">All farmers assigned to you for verification</p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="px-3 py-2">Farmer</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Date Assigned</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((f) => (
              <tr key={f.id} className="border-b bg-white text-sm">
                <td className="px-3 py-3">
                  <Link href={`/authorizer/farmers/${f.id}`} className="font-medium text-indigo-600 hover:underline">
                    {f.name}
                  </Link>
                </td>
                <td className="px-3 py-3 text-gray-600">{f.location}</td>
                <td className="px-3 py-3 text-gray-600">{f.dateAssigned}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{f.status}</td>
                <td className="px-3 py-3">
                  <Link href={`/authorizer/farmers/${f.id}/verification/stage1`} className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700">
                    Start Verification
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
