import { getRelativeTime } from '../../utils/helpers';
import { HiOutlineDocumentPlus, HiOutlineCheckBadge, HiOutlinePencilSquare, HiOutlineTrash, HiOutlineCog8Tooth } from 'react-icons/hi2';

const activities = [
  {
    id: 1,
    action: 'Created task',
    target: 'Design new landing page',
    time: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: 'create',
    user: 'Sarah M.',
    avatar: 'bg-accent-100 text-accent-600',
  },
  {
    id: 2,
    action: 'Completed task',
    target: 'Write API documentation',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: 'complete',
    user: 'You',
    avatar: 'bg-primary-100 text-primary-600',
  },
  {
    id: 3,
    action: 'Updated task',
    target: 'Optimize database queries',
    time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    type: 'update',
    user: 'Alex K.',
    avatar: 'bg-secondary-100 text-secondary-600',
  },
  {
    id: 4,
    action: 'Deleted task',
    target: 'Old migration script',
    time: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    type: 'delete',
    user: 'You',
    avatar: 'bg-primary-100 text-primary-600',
  },
];

const typeIcons = {
  create: <HiOutlineDocumentPlus className="w-4 h-4 text-accent-500" />,
  complete: <HiOutlineCheckBadge className="w-4 h-4 text-success-500" />,
  update: <HiOutlinePencilSquare className="w-4 h-4 text-warning-500" />,
  delete: <HiOutlineTrash className="w-4 h-4 text-danger-500" />,
};

const ActivityFeed = () => {
  return (
    <div className="card-premium h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold font-display text-text-primary">Activity Center</h3>
          <p className="text-sm text-text-tertiary mt-0.5">Recent team updates</p>
        </div>
        <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
          Filter
        </button>
      </div>
      
      <div className="flex-1 space-y-0 relative">
        <div className="absolute left-5 top-2 bottom-6 w-px bg-gradient-to-b from-border/80 via-border/40 to-transparent"></div>
        
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4 group relative z-10 pb-6 last:pb-0">
            {/* Avatar & Icon */}
            <div className="relative">
              <div className={`w-10 h-10 rounded-full ${activity.avatar} flex items-center justify-center text-sm font-bold shadow-sm ring-4 ring-white group-hover:scale-110 transition-transform`}>
                {activity.user.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-border/40">
                {typeIcons[activity.type]}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-surface-secondary/30 group-hover:bg-surface-secondary border border-transparent group-hover:border-border/60 rounded-xl p-3 -mt-1 transition-colors">
              <p className="text-sm text-text-primary leading-snug">
                <span className="font-bold">{activity.user}</span>{' '}
                <span className="text-text-secondary">{activity.action.toLowerCase()}</span>{' '}
                <span className="font-semibold">"{activity.target}"</span>
              </p>
              <p className="text-xs font-medium text-text-tertiary mt-1">
                {getRelativeTime(activity.time)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
