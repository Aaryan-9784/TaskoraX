import { getRelativeTime } from '../../utils/helpers';

const activities = [
  {
    id: 1,
    action: 'Created task',
    target: 'Design new landing page',
    time: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: 'create',
  },
  {
    id: 2,
    action: 'Completed task',
    target: 'Write API documentation',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: 'complete',
  },
  {
    id: 3,
    action: 'Updated task',
    target: 'Optimize database queries',
    time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    type: 'update',
  },
  {
    id: 4,
    action: 'Deleted task',
    target: 'Old migration script',
    time: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    type: 'delete',
  },
  {
    id: 5,
    action: 'Created task',
    target: 'Set up CI/CD pipeline',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    type: 'create',
  },
];

const typeColors = {
  create: 'bg-primary-500',
  complete: 'bg-success-500',
  update: 'bg-warning-500',
  delete: 'bg-danger-500',
};

const ActivityFeed = () => {
  return (
    <div className="bg-white border border-border/50 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Activity Feed
      </h3>
      <div className="space-y-0">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-3 group">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div
                className={`w-2.5 h-2.5 rounded-full ${typeColors[activity.type]} flex-shrink-0 mt-1.5`}
              />
              {index < activities.length - 1 && (
                <div className="w-px h-full bg-border min-h-[32px]" />
              )}
            </div>

            {/* Content */}
            <div className="pb-4">
              <p className="text-sm text-text-primary">
                <span className="font-medium">{activity.action}</span>{' '}
                <span className="text-text-secondary">"{activity.target}"</span>
              </p>
              <p className="text-xs text-text-tertiary mt-0.5">
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
