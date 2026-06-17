export type Farmer = {
  id: string;
  name: string;
  location: string;
  dateAssigned: string;
  status: 'assigned' | 'in-progress' | 'completed' | 'rejected';
  bio?: string;
  landSizeSubmitted?: string;
  documents?: { name: string; url?: string }[];
};

export const farmers: Farmer[] = [
  {
    id: 'T-001',
    name: 'Ravi Kumar',
    location: 'Plot A - 1.243, 103.823',
    dateAssigned: '2026-06-09',
    status: 'assigned',
    bio: 'Smallholder growing rice and vegetables.',
    landSizeSubmitted: '1.2 ha',
    documents: [{ name: 'ID Card' }, { name: 'Land Title' }],
  },
  {
    id: 'T-002',
    name: 'Anita Singh',
    location: 'Plot B - 1.245, 103.829',
    dateAssigned: '2026-06-08',
    status: 'in-progress',
    bio: 'Family farm focused on vegetables.',
    landSizeSubmitted: '0.8 ha',
    documents: [{ name: 'ID Card' }],
  },
  {
    id: 'T-003',
    name: 'Mohan Patel',
    location: 'Plot C - 1.246, 103.831',
    dateAssigned: '2026-06-05',
    status: 'completed',
    bio: 'Mixed crops and small livestock.',
    landSizeSubmitted: '2.0 ha',
    documents: [{ name: 'ID Card' }, { name: 'Certificate' }],
  },
];
