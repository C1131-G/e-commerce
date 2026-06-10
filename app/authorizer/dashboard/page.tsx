'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, CheckCircle, Hourglass, XCircle } from 'lucide-react';

type Task = {
  id: string;
  farmer: string;
  location: string;
  status: 'assigned' | 'in-progress' | 'completed' | 'rejected';
  urgency: 'low' | 'medium' | 'high';
  date: string;
};

const mockTasks: Task[] = [
  { id: 'T-001', farmer: 'Ravi Kumar', location: 'Plot A - 1.243, 103.823', status: 'assigned', urgency: 'high', date: '2026-06-09' },
  { id: 'T-002', farmer: 'Anita Singh', location: 'Plot B - 1.245, 103.829', status: 'in-progress', urgency: 'medium', date: '2026-06-08' },
  { id: 'T-003', farmer: 'Mohan Patel', location: 'Plot C - 1.246, 103.831', status: 'completed', urgency: 'low', date: '2026-06-05' },
  { id: 'T-004', farmer: 'Sita Devi', location: 'Plot D - 1.250, 103.835', status: 'rejected', urgency: 'high', date: '2026-06-07' },
  { id: 'T-005', farmer: 'Kiran Rao', location: 'Plot E - 1.252, 103.838', status: 'assigned', urgency: 'medium', date: '2026-06-10' },
];

export default function AuthorizerDashboard() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    return tasks.reduce(
      (acc, t) => {
        acc.total += 1;
        if (t.status === 'assigned') acc.assigned += 1;
        if (t.status === 'in-progress') acc.inProgress += 1;
        if (t.status === 'completed') acc.completed += 1;
        if (t.status === 'rejected') acc.rejected += 1;
        return acc;
      },
      { total: 0, assigned: 0, inProgress: 0, completed: 0, rejected: 0 }
    );
  }, [tasks]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasks.slice().sort(sortByUrgencyAndDate);
    return tasks
      .filter((t) => t.farmer.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
      .sort(sortByUrgencyAndDate);
  }, [tasks, query]);

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Authorizer Dashboard</h1>
        <p className="text-sm text-gray-600">Overview of assigned verification tasks and locations</p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
        <SummaryCard title="Assigned" count={counts.assigned} icon={<MapPin className="h-5 w-5 text-indigo-600" />} color="bg-indigo-50" />
        <SummaryCard title="In Progress" count={counts.inProgress} icon={<Hourglass className="h-5 w-5 text-yellow-600" />} color="bg-yellow-50" />
        <SummaryCard title="Completed" count={counts.completed} icon={<CheckCircle className="h-5 w-5 text-green-600" />} color="bg-green-50" />
        <SummaryCard title="Rejected" count={counts.rejected} icon={<XCircle className="h-5 w-5 text-red-600" />} color="bg-red-50" />
      </section>

      <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by farmer or task id"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="space-y-3">
            {filtered.map((t) => (
              <TaskRow key={t.id} task={t} />
            ))}
            {filtered.length === 0 && <p className="text-sm text-gray-500">No tasks match your search.</p>}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="h-80 rounded border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-medium">Assigned Farms Map</h2>
              <p className="text-xs text-gray-500">Mock map — replace with interactive map later</p>
            </div>
            <MapPlaceholder tasks={tasks} />
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ title, count, icon, color }: { title: string; count: number; icon: React.ReactNode; color?: string }) {
  return (
    <div className={`rounded-lg border border-gray-100 p-4 ${color || 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold">{count}</p>
        </div>
        <div className="rounded-full bg-white p-2 shadow-sm">{icon}</div>
      </div>
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  return (
    <div className="flex items-start justify-between rounded-lg border border-gray-100 bg-white p-3">
      <div>
        <div className="flex items-center gap-2">
          <Link href={`/authorizer/farmers/${task.id}`} className="text-sm font-semibold text-indigo-600 hover:underline">
            {task.farmer}
          </Link>
          <span className="text-xs text-gray-400">{task.id}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">{task.location}</p>
        <div className="mt-2 flex items-center gap-2">
          <StatusPill status={task.status} />
          <UrgencyPill urgency={task.urgency} />
          <span className="ml-auto text-xs text-gray-400">{task.date}</span>
        </div>
      </div>
      <div className="ml-4 flex items-center gap-2">
        <Link href={`/authorizer/farmers/${task.id}/verification/stage1`} className="rounded bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">
          Start
        </Link>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: Task['status'] }) {
  const map: Record<Task['status'], { text: string; cls: string }> = {
    assigned: { text: 'Assigned', cls: 'bg-indigo-50 text-indigo-700' },
    'in-progress': { text: 'In Progress', cls: 'bg-yellow-50 text-yellow-700' },
    completed: { text: 'Completed', cls: 'bg-green-50 text-green-700' },
    rejected: { text: 'Rejected', cls: 'bg-red-50 text-red-700' },
  };
  const { text, cls } = map[status];
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${cls}`}>{text}</span>;
}

function UrgencyPill({ urgency }: { urgency: Task['urgency'] }) {
  const map: Record<Task['urgency'], string> = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-orange-50 text-orange-700',
    high: 'bg-red-50 text-red-700',
  };
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${map[urgency]}`}>{urgency}</span>;
}

function MapPlaceholder({ tasks }: { tasks: Task[] }) {
  return (
    <div className="h-full w-full overflow-hidden rounded border border-dashed border-gray-200 bg-gradient-to-b from-gray-50 to-white p-4">
      <svg className="h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
        <rect x="0" y="0" width="800" height="400" rx="8" fill="#f8fafc" />
        {tasks.map((t, i) => {
          const x = 80 + (i * 120) % 640;
          const y = 60 + ((i * 90) % 280);
          return (
            <g key={t.id} transform={`translate(${x}, ${y})`}>
              <circle cx="0" cy="0" r="12" fill="#2563eb" opacity="0.95" />
              <text x="22" y="6" fontSize="12" fill="#0f172a">{t.farmer}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function sortByUrgencyAndDate(a: Task, b: Task) {
  const urgencyRank = { high: 0, medium: 1, low: 2 } as Record<Task['urgency'], number>;
  if (urgencyRank[a.urgency] !== urgencyRank[b.urgency]) return urgencyRank[a.urgency] - urgencyRank[b.urgency];
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}
