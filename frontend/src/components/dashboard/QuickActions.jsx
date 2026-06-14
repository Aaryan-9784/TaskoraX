import { useNavigate } from 'react-router-dom';
import {
  HiOutlinePlusCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Create Task',
      description: 'Add a new task to your board',
      icon: HiOutlinePlusCircle,
      onClick: () => navigate('/tasks?new=true'),
      color: 'bg-primary-50 text-primary-500 group-hover:bg-primary-100',
    },
    {
      label: 'View All Tasks',
      description: 'Browse and manage all tasks',
      icon: HiOutlineClipboardDocumentList,
      onClick: () => navigate('/tasks'),
      color: 'bg-success-50 text-success-500 group-hover:bg-success-100',
    },
    {
      label: 'Settings',
      description: 'Configure your preferences',
      icon: HiOutlineCog6Tooth,
      onClick: () => navigate('/settings'),
      color: 'bg-warning-50 text-warning-500 group-hover:bg-warning-100',
    },
  ];

  return (
    <div className="bg-white border border-border/50 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Quick Actions
      </h3>
      <div className="space-y-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-secondary transition-all duration-200 group text-left"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${action.color}`}
            >
              <action.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {action.label}
              </p>
              <p className="text-xs text-text-tertiary">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
