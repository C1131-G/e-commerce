'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function parseCoords(location: string) {
  const m = location.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (!m) return null;
  return { lat: parseFloat(m[1]), lon: parseFloat(m[2]) };
}

function haversine(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371; // km
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aa = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

export default function FarmNavigation({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [current, setCurrent] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dest, setDest] = useState<{ lat: number; lon: number } | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  useEffect(() => {
    // fetch farmer data from local module
    import('../../data/farmers').then((m) => {
      const f = m.farmers.find((x: any) => x.id === id);
      if (!f) {
        setError('Farmer not found');
        return;
      }
      const coords = parseCoords(f.location || '');
      if (!coords) setError('Farmer location unknown');
      else setDest(coords);
    });
  }, [id]);

  useEffect(() => {
    if (!dest) return;
    if (!('geolocation' in navigator)) {
      setError('Geolocation not available in this browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const cur = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setCurrent(cur);
        const d = haversine(cur, dest);
        setDistanceKm(Number(d.toFixed(2)));
      },
      (e) => setError(e.message),
      { enableHighAccuracy: true, maximumAge: 60_000 }
    );
  }, [dest]);

  const openMapsLink = () => {
    if (!dest) return '#';
    const destStr = `${dest.lat},${dest.lon}`;
    if (current) {
      const originStr = `${current.lat},${current.lon}`;
      return `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}&travelmode=driving`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${destStr}&travelmode=driving`;
  };

  const etaText = () => {
    if (distanceKm == null) return '--';
    const avgSpeedKmh = 40; // conservative
    const hours = distanceKm / avgSpeedKmh;
    const mins = Math.round(hours * 60);
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h} h ${m} min`;
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Navigate to Farmer — {id}</h1>
          <p className="text-sm text-gray-500">Open map and navigate to the farmer's pinned location</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="rounded border px-3 py-2">
            Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded bg-white p-4 shadow-sm">
          <h2 className="text-sm font-medium">Map</h2>
          <div className="mt-3 h-80 w-full rounded border border-dashed border-gray-200 bg-gradient-to-b from-gray-50 to-white p-4">
            {/* Simple placeholder with markers */}
            {dest ? (
              <svg className="h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
                <rect x="0" y="0" width="800" height="400" rx="8" fill="#f8fafc" />
                <g transform="translate(120,80)">
                  <circle cx="0" cy="0" r="12" fill="#10b981" />
                  <text x="22" y="6" fontSize="12" fill="#0f172a">Farmer location</text>
                </g>
                {current && (
                  <g transform="translate(380,220)">
                    <circle cx="0" cy="0" r="8" fill="#3b82f6" />
                    <text x="22" y="6" fontSize="12" fill="#0f172a">Your location</text>
                  </g>
                )}
              </svg>
            ) : (
              <p className="text-sm text-gray-500">Loading destination...</p>
            )}
          </div>
        </div>

        <aside className="rounded bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium">Navigation</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <p>
              <strong>Distance:</strong> {distanceKm ?? '--'} km
            </p>
            <p>
              <strong>ETA:</strong> {etaText()}
            </p>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <a href={openMapsLink()} target="_blank" rel="noreferrer" className="rounded bg-indigo-600 px-3 py-2 text-center text-sm text-white hover:bg-indigo-700">
              Open in Maps
            </a>
            <button onClick={() => alert('Mock: Start navigation (UI-only)')} className="rounded border px-3 py-2 text-sm">
              Start Navigation (mock)
            </button>
            <Link href={`/authorizer/farmers/${id}`} className="text-sm text-gray-500 hover:underline">
              View farmer profile
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
