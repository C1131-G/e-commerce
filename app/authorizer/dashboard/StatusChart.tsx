'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { VerificationTask, VerificationTaskStatus, taskStatusLabels } from './dashboard-data';

const statusColors: Record<VerificationTaskStatus, string> = {
  assigned: '#6366F1',
  'in-progress': '#F59E0B',
  completed: '#16A34A',
  rejected: '#DC2626',
};

type StatusChartProps = {
  tasks: VerificationTask[];
};

export default function StatusChart({ tasks }: StatusChartProps) {
  const breakdown = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<VerificationTaskStatus, number>
  );

  const chartData = (Object.keys(breakdown) as VerificationTaskStatus[]).map((status) => ({
    label: taskStatusLabels[status],
    value: breakdown[status],
    status,
  }));

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Task status distribution</h2>
          <p className="text-xs text-slate-500">Charts use live dashboard data.</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="label" innerRadius={48} outerRadius={88} paddingAngle={4} cornerRadius={8}>
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={statusColors[entry.status]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value} tasks`, 'Tasks']} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
