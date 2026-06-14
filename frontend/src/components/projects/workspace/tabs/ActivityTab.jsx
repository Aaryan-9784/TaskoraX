import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';

const ActivityTab = ({ project }) => {
  const activities = [
    { id: 1, action: 'created the project', user: 'You', time: '2 days ago', icon: 'bg-primary-500' },
    { id: 2, action: 'added 3 new tasks', user: 'Alice', time: '1 day ago', icon: 'bg-accent-500' },
    { id: 3, action: 'completed task "Initial Design"', user: 'Bob', time: '5 hours ago', icon: 'bg-success-500' },
  ];

  return (
    <div className="p-6 animate-fade-in">
      <h3 className="text-lg font-bold text-text-primary mb-6">Recent Activity</h3>
      
      <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-border/60 ml-2">
        {activities.map((item) => (
          <div key={item.id} className="relative flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-surface-primary ${item.icon} text-white shadow-sm z-10`}>
              <span className="text-xs font-bold">{item.user.charAt(0)}</span>
            </div>
            <div className="flex-1 pt-2">
              <p className="text-sm text-text-primary">
                <span className="font-bold">{item.user}</span> {item.action}
              </p>
              <p className="text-xs text-text-tertiary mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTab;
