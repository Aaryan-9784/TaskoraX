import {
  HiOutlinePlus,
  HiOutlineFolderPlus,
  HiOutlineUserPlus,
  HiOutlineDocumentText,
  HiOutlineVideoCamera,
  HiOutlineArrowUpTray
} from 'react-icons/hi2';

const actions = [
  {
    id: 'task',
    label: 'Create Task',
    desc: 'Add a new task',
    icon: HiOutlinePlus,
    color: 'bg-primary-50 text-primary-600',
    hover: 'group-hover:bg-primary-500 group-hover:text-white group-hover:shadow-glow',
  },
  {
    id: 'project',
    label: 'New Project',
    desc: 'Start a workspace',
    icon: HiOutlineFolderPlus,
    color: 'bg-accent-50 text-accent-600',
    hover: 'group-hover:bg-accent-500 group-hover:text-white group-hover:shadow-glow-accent',
  },
  {
    id: 'meeting',
    label: 'Schedule Sync',
    desc: 'Set up a meeting',
    icon: HiOutlineVideoCamera,
    color: 'bg-success-50 text-success-600',
    hover: 'group-hover:bg-success-500 group-hover:text-white',
  },
  {
    id: 'upload',
    label: 'Upload File',
    desc: 'Share documents',
    icon: HiOutlineArrowUpTray,
    color: 'bg-warning-50 text-warning-600',
    hover: 'group-hover:bg-warning-500 group-hover:text-white',
  },
  {
    id: 'invite',
    label: 'Invite Team',
    desc: 'Add members',
    icon: HiOutlineUserPlus,
    color: 'bg-secondary-50 text-secondary-600',
    hover: 'group-hover:bg-secondary-500 group-hover:text-white',
  },
  {
    id: 'report',
    label: 'Generate Report',
    desc: 'Analytics summary',
    icon: HiOutlineDocumentText,
    color: 'bg-primary-50 text-primary-600',
    hover: 'group-hover:bg-primary-500 group-hover:text-white',
  },
];

const QuickActions = () => {
  return (
    <div className="card-premium h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold font-display text-text-primary">Quick Actions</h3>
          <p className="text-sm text-text-tertiary mt-0.5">Commonly used shortcuts</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            className="group flex flex-col items-start p-3 rounded-xl bg-surface-secondary/50 border border-border/40 hover:bg-white hover:border-primary-200 hover:shadow-md transition-all duration-300 text-left"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 mb-3 ${action.color} ${action.hover}`}>
              <action.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-text-primary group-hover:text-primary-600 transition-colors">
              {action.label}
            </p>
            <p className="text-xs text-text-tertiary line-clamp-1 mt-0.5">
              {action.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
