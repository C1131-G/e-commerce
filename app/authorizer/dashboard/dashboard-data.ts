export type VerificationTaskStatus = 'assigned' | 'in-progress' | 'completed' | 'rejected';
export type VerificationTaskUrgency = 'low' | 'medium' | 'high';

export type VerificationTask = {
  id: string;
  farmer: string;
  location: string;
  status: VerificationTaskStatus;
  urgency: VerificationTaskUrgency;
  date: string;
};

export const authorizerDashboardTasks: VerificationTask[] = [
  { id: 'T-001', farmer: 'Ravi Kumar', location: 'Plot A - 1.243, 103.823', status: 'assigned', urgency: 'high', date: '2026-06-09' },
  { id: 'T-002', farmer: 'Anita Singh', location: 'Plot B - 1.245, 103.829', status: 'in-progress', urgency: 'medium', date: '2026-06-08' },
  { id: 'T-003', farmer: 'Mohan Patel', location: 'Plot C - 1.246, 103.831', status: 'completed', urgency: 'low', date: '2026-06-05' },
  { id: 'T-004', farmer: 'Sita Devi', location: 'Plot D - 1.250, 103.835', status: 'rejected', urgency: 'high', date: '2026-06-07' },
  { id: 'T-005', farmer: 'Kiran Rao', location: 'Plot E - 1.252, 103.838', status: 'assigned', urgency: 'medium', date: '2026-06-10' },
];

export const taskStatusLabels: Record<VerificationTaskStatus, string> = {
  assigned: 'Assigned',
  'in-progress': 'In Progress',
  completed: 'Completed',
  rejected: 'Rejected',
};
