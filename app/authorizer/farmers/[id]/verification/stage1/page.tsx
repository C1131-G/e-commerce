'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { farmers } from '../../../../data/farmers';

export default function VerificationStage1({ params }: { params: { id: string } }) {
  const { id } = params;
  const farmer = farmers.find((f) => f.id === id);
  const router = useRouter();
  const [nameMatch, setNameMatch] = useState(false);
  const [photoMatch, setPhotoMatch] = useState(false);
  const [idNumberMatch, setIdNumberMatch] = useState(false);
  const [notes, setNotes] = useState('');

  if (!farmer) return <div className="p-6">Farmer not found.</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Identity Check — {farmer.name}</h1>
          <p className="text-sm text-gray-500">Stage 1 of 6 — Verify identity on-site</p>
        </div>
        <div>
          <button onClick={() => router.back()} className="rounded border px-3 py-2">Back</button>
        </div>
      </div>

      <div className="rounded bg-white p-4 shadow-sm">
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={nameMatch} onChange={(e) => setNameMatch(e.target.checked)} />
            <span className="text-sm">Name matches submitted record</span>
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" checked={photoMatch} onChange={(e) => setPhotoMatch(e.target.checked)} />
            <span className="text-sm">Photo matches identity document</span>
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" checked={idNumberMatch} onChange={(e) => setIdNumberMatch(e.target.checked)} />
            <span className="text-sm">ID number matches submitted</span>
          </label>

          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full rounded border-gray-200 p-2 text-sm" rows={4} />
          </div>

          <div className="flex items-center gap-3">
            <label className="block text-sm font-medium">Upload photo (on-site)</label>
            <input type="file" accept="image/*" className="ml-2 text-sm" />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => alert('Stage marked complete (UI-only)')}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Mark Stage Complete
            </button>
            <button onClick={() => router.push(`/authorizer/farmers/${id}`)} className="rounded border px-3 py-2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
