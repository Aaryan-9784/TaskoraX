export const mockProjects = [
  {
    id: 'proj-1',
    name: 'Website Redesign',
    description: 'Overhaul the corporate landing page with new branding.',
    status: 'Active',
    progress: 68,
    dueDate: '2026-07-15',
    priority: 'High',
    coverColor: 'bg-primary-500',
    team: [
      { id: 'u1', name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=u1' },
      { id: 'u2', name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=u2' },
      { id: 'u3', name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=u3' }
    ],
    tasks: { total: 45, completed: 30 },
  },
  {
    id: 'proj-2',
    name: 'Q3 Marketing Campaign',
    description: 'Prepare assets and copy for the upcoming Q3 product launch.',
    status: 'Planning',
    progress: 15,
    dueDate: '2026-08-01',
    priority: 'Medium',
    coverColor: 'bg-accent-500',
    team: [
      { id: 'u4', name: 'Diana', avatar: 'https://i.pravatar.cc/150?u=u4' },
      { id: 'u5', name: 'Evan', avatar: 'https://i.pravatar.cc/150?u=u5' }
    ],
    tasks: { total: 20, completed: 3 },
  },
  {
    id: 'proj-3',
    name: 'Mobile App V2',
    description: 'Implement dark mode and performance improvements.',
    status: 'At Risk',
    progress: 42,
    dueDate: '2026-06-30',
    priority: 'High',
    coverColor: 'bg-warning-500',
    team: [
      { id: 'u1', name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=u1' },
      { id: 'u6', name: 'Fiona', avatar: 'https://i.pravatar.cc/150?u=u6' }
    ],
    tasks: { total: 60, completed: 25 },
  },
  {
    id: 'proj-4',
    name: 'Security Audit Q2',
    description: 'Review access logs and update dependencies.',
    status: 'Completed',
    progress: 100,
    dueDate: '2026-05-15',
    priority: 'Low',
    coverColor: 'bg-success-500',
    team: [
      { id: 'u7', name: 'George', avatar: 'https://i.pravatar.cc/150?u=u7' }
    ],
    tasks: { total: 12, completed: 12 },
  },
  {
    id: 'proj-5',
    name: 'Customer Portal integration',
    description: 'Integrate Zendesk with our custom dashboard.',
    status: 'On Hold',
    progress: 25,
    dueDate: '2026-09-10',
    priority: 'Medium',
    coverColor: 'bg-surface-tertiary',
    team: [
      { id: 'u2', name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=u2' },
      { id: 'u4', name: 'Diana', avatar: 'https://i.pravatar.cc/150?u=u4' }
    ],
    tasks: { total: 34, completed: 8 },
  }
];

export const projectMetrics = {
  total: 24,
  active: 8,
  completed: 12,
  atRisk: 3,
};
