import { HiOutlineCalendarDays } from 'react-icons/hi2';

const TimelineTab = ({ project }) => {
  const tasks = project?.tasksList || [];

  if (!tasks.length) {
    return (
      <div className="p-6 h-full flex flex-col animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-text-primary">Timeline Roadmap</h3>
        </div>
        <div className="flex-1 glass-panel border border-border/40 rounded-xl flex items-center justify-center p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-border/60">
              <HiOutlineCalendarDays className="h-8 w-8 text-text-tertiary" />
            </div>
            <h4 className="text-base font-bold text-text-primary mb-1">Timeline View</h4>
            <p className="text-sm text-text-secondary max-w-sm">A visual roadmap of your project will appear here. Add tasks to see them on the timeline.</p>
          </div>
        </div>
      </div>
    );
  }

  // Use real task duration and start day instead of purely mock data
  const timelineTasks = tasks.map((task, i) => {
    // If the user specified the time, use it, otherwise fallback to deterministic mock
    const startDay = task.startDay !== undefined ? task.startDay : (i * 3) % 20; 
    const durationDays = task.durationDays !== undefined ? task.durationDays : 4 + (i % 6);
    return {
      ...task,
      startDay,
      durationDays,
    };
  });

  const totalDays = 30; // 30 day view
  const milestones = [0, 5, 10, 15, 20, 25, 30];

  return (
    <div className="p-6 h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary">Timeline Roadmap</h3>
      </div>
      
      <div className="flex-1 glass-panel border border-border/40 rounded-xl overflow-hidden flex flex-col relative">
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <div className="min-w-[800px] flex flex-col min-h-full">
            {/* Header */}
            <div className="flex border-b border-border/40 bg-surface-secondary/80 backdrop-blur-md sticky top-0 z-30 shadow-sm">
              <div className="w-64 shrink-0 p-4 font-bold text-xs uppercase tracking-wider text-text-tertiary border-r border-border/40 bg-surface-secondary/90 sticky left-0 z-40">
                Task Name
              </div>
              <div className="flex-1 relative flex">
                {milestones.map(day => (
                  <div 
                    key={day} 
                    className="absolute top-0 bottom-0 border-l border-border/20"
                    style={{ left: `${(day / totalDays) * 100}%` }}
                  >
                    <div className="px-3 py-4 text-xs font-bold text-text-tertiary">Day {day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div className="relative flex-1 pb-10">
              {/* Background lines for rows */}
              <div className="absolute inset-0 pointer-events-none z-0" style={{ left: '16rem' }}>
                {milestones.map(day => (
                  <div 
                    key={`bg-${day}`} 
                    className="absolute top-0 bottom-0 border-l border-border/10"
                    style={{ left: `${(day / totalDays) * 100}%` }}
                  />
                ))}
              </div>

              {/* Task Rows */}
              <div className="relative z-10">
                {timelineTasks.map((task) => {
                  const leftPercent = (task.startDay / totalDays) * 100;
                  const widthPercent = (task.durationDays / totalDays) * 100;
                  const isDone = task.status === 'Done';
                  
                  return (
                    <div key={task.id} className="flex border-b border-border/20 group hover:bg-surface-secondary/30 transition-colors">
                      <div className="w-64 shrink-0 p-4 border-r border-border/40 flex items-center bg-surface-primary/80 backdrop-blur-sm sticky left-0 z-20 group-hover:bg-surface-secondary/80 transition-colors">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${isDone ? 'bg-success-500' : 'bg-warning-500'}`}></span>
                          <span className={`text-sm font-semibold truncate ${isDone ? 'text-text-tertiary line-through' : 'text-text-primary'}`} title={task.name}>
                            {task.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 relative p-3 h-[60px] flex items-center">
                        {/* Gantt Bar */}
                        <div 
                          className={`absolute h-8 rounded-lg flex items-center px-3 shadow-sm transition-all cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-surface-primary hover:z-30 ${
                            isDone 
                              ? 'bg-success-500/20 border border-success-500/30 hover:ring-success-500/50' 
                              : 'bg-gradient-to-r from-primary-500 to-primary-400 hover:ring-primary-500/50 shadow-primary-500/20'
                          }`}
                          style={{ 
                            left: `${leftPercent}%`, 
                            width: `${widthPercent}%`,
                            minWidth: '40px'
                          }}
                          title={`${task.name} (${task.durationDays} days)`}
                        >
                          <span className={`text-xs font-bold truncate ${isDone ? 'text-success-600' : 'text-white'}`}>
                            {task.durationDays}d
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineTab;
