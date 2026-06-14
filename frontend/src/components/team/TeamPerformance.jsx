import { HiOutlineTrophy, HiOutlineBolt, HiOutlineCheckCircle } from 'react-icons/hi2';

const TeamPerformance = ({ topPerformer, mostActive, completionRate }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-border/50 h-full flex flex-col">
      <div className="p-5 border-b border-border/50 bg-surface-secondary/30">
        <h3 className="text-lg font-bold text-text-primary">Team Performance</h3>
        <p className="text-xs text-text-tertiary mt-1">Weekly insights and top contributors.</p>
      </div>
      
      <div className="p-5 flex-1 flex flex-col gap-6">
        {/* Top Performer */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-accent-50 to-transparent p-4 rounded-xl border border-accent-100">
          <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center shrink-0">
            <HiOutlineTrophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-accent-600 uppercase tracking-wider mb-0.5">Top Performer</p>
            <p className="text-sm font-extrabold text-text-primary">{topPerformer?.name || 'Sarah Jenkins'}</p>
            <p className="text-xs text-text-tertiary font-medium">{topPerformer?.tasksCompleted || 42} tasks completed</p>
          </div>
        </div>

        {/* Most Active */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-primary-50 to-transparent p-4 rounded-xl border border-primary-100">
          <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
            <HiOutlineBolt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-0.5">Most Active</p>
            <p className="text-sm font-extrabold text-text-primary">{mostActive?.name || 'David Chen'}</p>
            <p className="text-xs text-text-tertiary font-medium">{mostActive?.activityCount || 156} actions this week</p>
          </div>
        </div>

        {/* Simple Chart / Progress */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-2">
            <p className="text-sm font-bold text-text-primary flex items-center gap-2">
              <HiOutlineCheckCircle className="w-5 h-5 text-success-500" />
              Completion Rate
            </p>
            <span className="text-xl font-extrabold text-success-600">{completionRate || 88}%</span>
          </div>
          <div className="w-full h-3 bg-surface-secondary rounded-full overflow-hidden">
            <div className="h-full bg-success-500 rounded-full" style={{ width: `${completionRate || 88}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;
