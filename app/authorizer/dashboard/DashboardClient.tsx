'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Hourglass, MapPin, Search, XCircle } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import StatusChart from './StatusChart';
import { VerificationTask, VerificationTaskStatus } from './dashboard-data';

const filterSchema = z.object({
  query: z.string().max(60, 'Search needs to be 60 characters or less'),
  status: z.enum(['all', 'assigned', 'in-progress', 'completed', 'rejected']),
});

type FilterFormValues = z.infer<typeof filterSchema>;

const defaultFilters: FilterFormValues = {
  query: '',
  status: 'all',
};

export default function DashboardClient({ tasks }: { tasks: VerificationTask[] }) {
  const [activeFilters, setActiveFilters] = useState<FilterFormValues>(defaultFilters);
  const [validationMessage, setValidationMessage] = useState<string | undefined>();

  const form = useForm<
    FilterFormValues,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  >({
    defaultValues: defaultFilters,
    onSubmit: ({ value }) => {
      const parsed = filterSchema.safeParse(value);
      if (!parsed.success) {
        setValidationMessage(parsed.error.issues[0]?.message);
        return;
      }

      setValidationMessage(undefined);
      setActiveFilters(parsed.data);
    },
  });

  const filteredTasks = useMemo(() => {
    const searchTerm = activeFilters.query.trim().toLowerCase();
    return tasks
      .filter((task) => {
        const matchesStatus = activeFilters.status === 'all' || task.status === activeFilters.status;
        const matchesQuery =
          !searchTerm ||
          task.farmer.toLowerCase().includes(searchTerm) ||
          task.id.toLowerCase().includes(searchTerm);
        return matchesStatus && matchesQuery;
      })
      .sort(sortByUrgencyAndDate);
  }, [activeFilters, tasks]);

  type SummaryState = {
    total: number;
    assigned: number;
    inProgress: number;
    completed: number;
    rejected: number;
  };

  const summary = useMemo(
    () =>
      tasks.reduce<SummaryState>((acc, task) => {
        acc.total += 1;

        switch (task.status) {
          case 'assigned':
            acc.assigned += 1;
            break;
          case 'in-progress':
            acc.inProgress += 1;
            break;
          case 'completed':
            acc.completed += 1;
            break;
          case 'rejected':
            acc.rejected += 1;
            break;
        }

        return acc;
      },
      { total: 0, assigned: 0, inProgress: 0, completed: 0, rejected: 0 }),
    [tasks]
  );

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Authorizer Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of verification tasks and approval status.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-4 mb-6">
        <SummaryCard title="Assigned" count={summary.assigned} icon={<MapPin className="h-5 w-5 text-indigo-600" />} color="bg-indigo-50" />
        <SummaryCard title="In Progress" count={summary.inProgress} icon={<Hourglass className="h-5 w-5 text-yellow-600" />} color="bg-yellow-50" />
        <SummaryCard title="Completed" count={summary.completed} icon={<CheckCircle className="h-5 w-5 text-green-600" />} color="bg-green-50" />
        <SummaryCard title="Rejected" count={summary.rejected} icon={<XCircle className="h-5 w-5 text-red-600" />} color="bg-red-50" />
      </section>

      <main className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void form.handleSubmit();
            }}
            className="space-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="space-y-2">
              <label htmlFor="query" className="block text-sm font-medium text-slate-700">
                Search tasks
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <form.Field name="query">
                  {(fieldApi) => (
                    <input
                      id="query"
                      type="text"
                      value={fieldApi.state.value || ''}
                      onChange={(event) => fieldApi.setValue(event.target.value)}
                      placeholder="Farmer name or task ID"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm text-slate-900 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  )}
                </form.Field>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                Filter by status
              </label>
              <form.Field name="status">
                {(fieldApi) => (
                  <select
                    id="status"
                    value={fieldApi.state.value ?? 'all'}
                    onChange={(event) => fieldApi.setValue(event.target.value as FilterFormValues['status'])}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="all">All statuses</option>
                    <option value="assigned">Assigned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                )}
              </form.Field>
            </div>

            {validationMessage ? <p className="text-sm text-red-600">{validationMessage}</p> : null}

            <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Apply filters
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <TaskList title="Task queue" tasks={filteredTasks} />
            {filteredTasks.length === 0 ? <p className="text-sm text-slate-500">No tasks match the current filter.</p> : null}
          </div>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <StatusChart tasks={tasks} />

          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Assigned farms map</h2>
              <p className="text-xs text-slate-500">UI-only placeholder for future map integration</p>
            </div>
            <MapPlaceholder tasks={tasks} />
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ title, count, icon, color }: { title: string; count: number; icon: React.ReactNode; color: string }) {
  return (
    <div className={`rounded-3xl border border-gray-100 p-4 ${color}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{count}</p>
        </div>
        <div className="rounded-2xl bg-white p-3 shadow-sm">{icon}</div>
      </div>
    </div>
  );
}

function TaskList({ title, tasks }: { title: string; tasks: VerificationTask[] }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-slate-50 p-4">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

function TaskRow({ task }: { task: VerificationTask }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900">
          <Link href={`/authorizer/farmers/${task.id}`} className="hover:text-indigo-600 hover:underline">
            {task.farmer}
          </Link>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">{task.id}</span>
        </div>
        <p className="mt-2 text-sm text-slate-500">{task.location}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <StatusPill status={task.status} />
          <UrgencyPill urgency={task.urgency} />
          <span className="ml-auto text-slate-400">{task.date}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/authorizer/farmers/${task.id}/verification/stage1`} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
          Start
        </Link>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: VerificationTaskStatus }) {
  const statusMap: Record<VerificationTaskStatus, { label: string; className: string }> = {
    assigned: { label: 'Assigned', className: 'bg-indigo-50 text-indigo-700' },
    'in-progress': { label: 'In Progress', className: 'bg-amber-50 text-amber-700' },
    completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-700' },
    rejected: { label: 'Rejected', className: 'bg-rose-50 text-rose-700' },
  };

  return <span className={`rounded-full px-2 py-1 font-medium ${statusMap[status].className}`}>{statusMap[status].label}</span>;
}

function UrgencyPill({ urgency }: { urgency: VerificationTask['urgency'] }) {
  const urgencyMap: Record<VerificationTask['urgency'], string> = {
    low: 'bg-slate-100 text-slate-700',
    medium: 'bg-orange-50 text-orange-700',
    high: 'bg-red-50 text-red-700',
  };

  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${urgencyMap[urgency]}`}>{urgency}</span>;
}

function MapPlaceholder({ tasks }: { tasks: VerificationTask[] }) {
  return (
    <div className="h-72 overflow-hidden rounded-3xl border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4">
      <svg className="h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
        <rect x="0" y="0" width="800" height="400" rx="16" fill="#f8fafc" />
        {tasks.map((task, index) => {
          const x = 90 + (index * 130) % 620;
          const y = 70 + ((index * 85) % 240);
          return (
            <g key={task.id} transform={`translate(${x}, ${y})`}>
              <circle cx="0" cy="0" r="14" fill="#2563eb" opacity="0.95" />
              <text x="22" y="6" fontSize="12" fill="#0f172a">
                {task.farmer}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function sortByUrgencyAndDate(a: VerificationTask, b: VerificationTask) {
  const urgencyRank: Record<VerificationTask['urgency'], number> = { high: 0, medium: 1, low: 2 };
  if (urgencyRank[a.urgency] !== urgencyRank[b.urgency]) {
    return urgencyRank[a.urgency] - urgencyRank[b.urgency];
  }

  return new Date(b.date).getTime() - new Date(a.date).getTime();
}
