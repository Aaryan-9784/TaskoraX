import { HiOutlineCheckCircle, HiOutlineDocumentText, HiOutlineUserPlus, HiOutlineKey } from 'react-icons/hi2';

const MOCK_ACTIVITIES = [
  {
    id: 1,
    type: 'task',
    title: 'Completed task "Update Landing Page Hero Section"',
    time: '2 hours ago',
    icon: HiOutlineCheckCircle,
    color: 'text-success-500',
    bgColor: 'bg-success-100/50',
    borderColor: 'border-success-200'
  },
  {
    id: 2,
    type: 'project',
    title: 'Created new project "Q3 Marketing Campaign"',
    time: 'Yesterday at 4:30 PM',
    icon: HiOutlineDocumentText,
    color: 'text-primary-500',
    bgColor: 'bg-primary-100/50',
    borderColor: 'border-primary-200'
  },
  {
    id: 3,
    type: 'team',
    title: 'Added Sarah Jenkins to "Design Team"',
    time: 'Oct 12, 2023',
    icon: HiOutlineUserPlus,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-100/50',
    borderColor: 'border-indigo-200'
  },
  {
    id: 4,
    type: 'security',
    title: 'Enabled Two-Factor Authentication',
    time: 'Oct 10, 2023',
    icon: HiOutlineKey,
    color: 'text-warning-500',
    bgColor: 'bg-warning-100/50',
    borderColor: 'border-warning-200'
  }
];

const ActivityTimeline = () => {
  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm h-full">
      <div className="px-6 py-5 border-b border-border/50 bg-surface-secondary/30">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="relative border-l border-border/60 ml-4 space-y-8">
          {MOCK_ACTIVITIES.map((activity, index) => (
            <div key={activity.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline dot */}
              <span className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-2 ${activity.bgColor} ${activity.borderColor} ${activity.color} flex items-center justify-center bg-white ring-4 ring-white transition-transform duration-300 group-hover:scale-110`}>
                <activity.icon className="w-4 h-4" />
              </span>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                <h4 className="text-sm font-medium text-text-primary">{activity.title}</h4>
                <time className="text-xs text-text-tertiary whitespace-nowrap">{activity.time}</time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
