import { HiOutlineClock, HiOutlineSparkles } from 'react-icons/hi2';

const getAvatarColor = (name) => {
  if (!name) return 'bg-primary-500/10 text-primary-600 ring-primary-500/30';
  const colors = [
    'bg-primary-500/10 text-primary-600 ring-primary-500/30',
    'bg-success-500/10 text-success-600 ring-success-500/30',
    'bg-warning-500/10 text-warning-600 ring-warning-500/30',
    'bg-accent-500/10 text-accent-600 ring-accent-500/30',
    'bg-info-500/10 text-info-600 ring-info-500/30'
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

const ActivityTab = ({ project }) => {
  // Dynamically generate activities based on current project state
  const generateActivities = () => {
    let acts = [];
    
    const baseTime = Date.now() - 10000000; // Fake old time for mock data

    // Add creation event
    acts.push({
      id: 'create',
      action: `created the project "${project?.name || 'New Project'}"`,
      user: 'You',
      time: 'Just now',
      timestamp: baseTime - 10000
    });

    // Add team members
    if (project?.team) {
       project.team.forEach((m, idx) => {
          if (m.id !== 'u1') {
             acts.push({
                 id: `team-${m.id}`,
                 action: `joined the project as ${m.role || 'Member'}`,
                 user: m.name,
                 time: 'Recently',
                 timestamp: baseTime - 5000 + idx
             });
          }
       });
    }

    // Add tasks
    if (project?.tasksList) {
       project.tasksList.forEach((t, idx) => {
           let ts = baseTime + (project.tasksList.length - idx); // Default order for mock tasks
           if (typeof t.id === 'string' && t.id.startsWith('task-')) {
               const parsed = parseInt(t.id.replace('task-', ''));
               if (!isNaN(parsed) && parsed > 1000000) ts = parsed;
           }
           
           if (t.status === 'Done') {
              acts.push({
                  id: `task-done-${t.id}`,
                  action: `completed task "${t.name}"`,
                  user: 'You',
                  time: 'Recently',
                  timestamp: ts + 1 // slight offset for completion
              });
           } else {
              acts.push({
                  id: `task-${t.id}`,
                  action: `created task "${t.name}"`,
                  user: 'You',
                  time: 'Recently',
                  timestamp: ts
              });
           }
       });
    }

    // Add files
    if (project?.files) {
       project.files.forEach((f, idx) => {
          let ts = baseTime + idx;
          if (typeof f.id === 'number' && f.id > 1000000) {
              ts = f.id;
          }
          acts.push({
              id: `file-${f.id}`,
              action: `uploaded file "${f.name}"`,
              user: 'You',
              time: f.date || 'Recently',
              timestamp: ts
          });
       });
    }

    // Sort descending by timestamp (newest first)
    return acts.sort((a, b) => b.timestamp - a.timestamp);
  };

  const activities = generateActivities();

  return (
    <div className="p-6 h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <HiOutlineSparkles className="w-6 h-6 text-primary-500" />
          Recent Activity
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
        <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-border/60 ml-2">
          {activities.length > 0 ? (
            activities.map((item) => (
              <div key={item.id} className="relative flex gap-4 group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-surface-primary ring-1 ${getAvatarColor(item.user)} z-10 transition-transform group-hover:scale-110`}>
                  <span className="text-sm font-bold">{item.user.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 pt-1 pb-6">
                  <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/40 group-hover:border-border/80 transition-colors shadow-sm group-hover:shadow-md">
                    <p className="text-sm text-text-primary leading-relaxed">
                      <span className="font-bold text-text-primary">{item.user}</span> <span className="text-text-secondary">{item.action}</span>
                    </p>
                    <p className="text-xs font-medium text-text-tertiary mt-2 flex items-center gap-1.5">
                      <HiOutlineClock className="w-3.5 h-3.5" /> {item.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="pl-12 text-sm text-text-tertiary italic">No recent activity.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
