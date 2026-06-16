import { HiOutlineCheckCircle, HiOutlineDocumentText, HiOutlineUserPlus, HiOutlineKey, HiOutlineSparkles } from 'react-icons/hi2';
import { useTeam } from '../../context/TeamContext';

const ActivityTimeline = () => {
  const { activities } = useTeam();
  const displayActivities = activities.slice(0, 5); // Show latest 5

  const getIcon = (action) => {
    if (action.includes('task')) return HiOutlineCheckCircle;
    if (action.includes('project')) return HiOutlineDocumentText;
    if (action.includes('team')) return HiOutlineUserPlus;
    return HiOutlineSparkles;
  };

  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm h-full">
      <div className="px-6 py-5 border-b border-border/50 bg-surface-secondary/30">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="relative border-l border-border/60 ml-4 space-y-8">
          {displayActivities.length === 0 && <div className="text-sm text-text-secondary pl-4">No recent activity.</div>}
          {displayActivities.map((activity) => {
            const Icon = getIcon(activity.action);
            return (
              <div key={activity._id} className="relative pl-6 sm:pl-8 group">
                {/* Timeline dot */}
                <span className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-2 border-primary-200 text-primary-500 flex items-center justify-center bg-white ring-4 ring-white transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-4 h-4" />
                </span>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                  <h4 className="text-sm font-medium text-text-primary">{activity.user?.name} {activity.action} {activity.target}</h4>
                  <time className="text-xs text-text-tertiary whitespace-nowrap">{new Date(activity.timestamp).toLocaleDateString()}</time>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
