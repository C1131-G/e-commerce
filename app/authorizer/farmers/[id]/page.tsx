'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { farmers } from '../../data/farmers';

export default function FarmerProfile({ params }: { params: { id: string } }) {
  const { id } = params;
  const farmer = useMemo(() => farmers.find((f) => f.id === id), [id]);
  const router = useRouter();

  if (!farmer) return <div className="p-6">Farmer not found.</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{farmer.name}</h1>
          <p className="text-sm text-gray-500">Assigned: {farmer.dateAssigned}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="rounded border px-3 py-2">Back</button>
          <Link href={`/authorizer/farmers/${farmer.id}/verification/stage1`} className="rounded bg-green-600 px-3 py-2 text-white">
            Start Verification
          </Link>
          <Link href={`/authorizer/navigation/${farmer.id}`} className="ml-2 rounded border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Navigate
          </Link>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded bg-white p-4 shadow-sm">
          <h2 className="text-sm font-medium">Farmer Bio</h2>
          <p className="mt-2 text-sm text-gray-700">{farmer.bio}</p>

          <div className="mt-4">
            <h3 className="text-sm font-medium">Land Details</h3>
            <p className="mt-1 text-sm text-gray-700">Submitted size: {farmer.landSizeSubmitted}</p>
            <p className="mt-1 text-sm text-gray-700">Location: {farmer.location}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium">Documents</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
              {farmer.documents?.map((d, i) => (
                <li key={i}>{d.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="rounded bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium">Quick Info</h3>
          <p className="mt-2 text-sm text-gray-600">Status: {farmer.status}</p>
          <p className="mt-1 text-sm text-gray-600">Assigned: {farmer.dateAssigned}</p>
        </aside>
      </section>
    </div>
  );
}
