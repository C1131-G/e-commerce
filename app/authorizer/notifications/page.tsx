'use client';

import { useState } from 'react';
import Link from 'next/link';
import { farmers } from '../../data/farmers';

type Notification = {
  id: string;
  type: 'assignment' | 'reminder' | 'message';
  message: string;
  time: string;
  farmerId?: string;
  read?: boolean;
};

const mock: Notification[] = [
  { id: 'N1', type: 'assignment', message: 'New assignment: T-005 assigned to you', time: '10:00', farmerId: 'T-005', read: false },
  { id: 'N2', type: 'reminder', message: 'Reminder: T-002 pending verification', time: '09:30', farmerId: 'T-002', read: false },
  { id: 'N3', type: 'message', message: 'Admin: Please prioritize high urgency tasks', time: '08:15', read: false },
];

export default function NotificationCenter() {
  const [list, setList] = useState<Notification[]>(mock);

  const markRead = (id: string) => {
    setList((s) => s.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => setList((s) => s.map((n) => ({ ...n, read: true })));

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <p className="text-sm text-gray-500">Alerts for assignments, reminders, and messages</p>
        </div>
        <div>
          <button onClick={markAllRead} className="rounded border px-3 py-2 text-sm">Mark all read</button>
        </div>
      </div>

      <div className="space-y-3">
        {list.map((n) => (
          <div key={n.id} className={`flex items-start justify-between rounded border p-3 ${n.read ? 'bg-gray-50' : 'bg-white'}`}>
            <div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">{n.type[0].toUpperCase()}</div>
                <div>
                  <p className="text-sm font-medium">{n.message}</p>
                  <p className="text-xs text-gray-500">{n.time}</p>
                </div>
              </div>
              <div className="mt-2">
                {n.farmerId ? (
                  <Link href={`/authorizer/farmers/${n.farmerId}`} className="text-sm text-indigo-600 hover:underline">
                    Open farmer {n.farmerId}
                  </Link>
                ) : (
                  <p className="text-sm text-gray-600">No farmer linked</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {!n.read && (
                <button onClick={() => markRead(n.id)} className="rounded bg-green-600 px-3 py-1 text-xs text-white">Mark read</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
