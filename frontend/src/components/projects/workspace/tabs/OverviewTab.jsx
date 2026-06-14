import { HiOutlineChartPie, HiOutlineClock, HiOutlineFire } from 'react-icons/hi2';

const OverviewTab = ({ project }) => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Summary */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-border/40">
          <h3 className="text-lg font-bold text-text-primary mb-4">Project Summary</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            {project.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-secondary border border-border/60">
              <div className="flex items-center gap-2 text-text-secondary mb-2">
                <HiOutlineChartPie className="h-5 w-5" />
                <span className="text-sm font-medium">Completion</span>
              </div>
              <div className="text-2xl font-bold text-text-primary">{project.progress}%</div>
            </div>
            
            <div className="p-4 rounded-xl bg-surface-secondary border border-border/60">
              <div className="flex items-center gap-2 text-text-secondary mb-2">
                <HiOutlineClock className="h-5 w-5" />
                <span className="text-sm font-medium">Remaining Tasks</span>
              </div>
              <div className="text-2xl font-bold text-text-primary">{project.tasks.total - project.tasks.completed}</div>
            </div>
          </div>
        </div>

        {/* Project Health */}
        <div className="glass-panel p-6 rounded-2xl border border-border/40">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <HiOutlineFire className="h-5 w-5 text-warning-500" /> Health Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border/40">
              <span className="text-sm text-text-secondary">Overall Health</span>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold bg-success-500/10 text-success-500`}>On Track</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border/40">
              <span className="text-sm text-text-secondary">Budget</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-surface-secondary text-text-primary">85% Used</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Resources</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-warning-500/10 text-warning-500">Stretched</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
