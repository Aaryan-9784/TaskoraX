const formatDistanceToNow = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const TeamActivityFeed = ({ activities }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-border/50 h-full flex flex-col">
      <div className="p-5 border-b border-border/50 bg-surface-secondary/30">
        <h3 className="text-lg font-bold text-text-primary">Recent Activity</h3>
        <p className="text-xs text-text-tertiary mt-1">Latest actions from the team.</p>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
        <div className="relative pl-3 space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
          {activities.map((activity, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-surface-primary bg-primary-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {/* Could add specific icons per activity type here */}
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl glass-panel border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-full bg-secondary-100 text-secondary-700 flex items-center justify-center font-bold text-[10px]">
                    {activity.user.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-text-primary">{activity.user}</span>
                  <span className="text-[10px] text-text-tertiary ml-auto">
                    {formatDistanceToNow(new Date(activity.timestamp))}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">{activity.action}</span> {activity.target}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamActivityFeed;
