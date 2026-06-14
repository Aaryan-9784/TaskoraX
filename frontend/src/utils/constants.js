export const TASK_STATUS = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export const TASK_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export const PRIORITY_COLORS = {
  Low: { bg: 'bg-success-50', text: 'text-success-600', border: 'border-success-200' },
  Medium: { bg: 'bg-warning-50', text: 'text-warning-600', border: 'border-warning-200' },
  High: { bg: 'bg-danger-50', text: 'text-danger-600', border: 'border-danger-200' },
};

export const STATUS_COLORS = {
  Todo: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
  'In Progress': { bg: 'bg-primary-50', text: 'text-primary-600', border: 'border-primary-200' },
  Done: { bg: 'bg-success-50', text: 'text-success-600', border: 'border-success-200' },
};

export const ITEMS_PER_PAGE = 6;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Statistics', href: '#statistics' },
  { label: 'Testimonials', href: '#testimonials' },
];

export const SIDEBAR_LINKS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { label: 'Tasks', path: '/tasks', icon: 'tasks' },
  { label: 'Profile', path: '/profile', icon: 'profile' },
  { label: 'Settings', path: '/settings', icon: 'settings' },
];
