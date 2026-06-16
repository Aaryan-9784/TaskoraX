import { HiOutlineChartPie, HiOutlineClock, HiOutlineFire } from 'react-icons/hi2';

const OverviewTab = ({ project }) => {
  const getHealth = () => {
    if (project.status === 'Completed') return { text: 'Completed', color: 'text-primary-500 bg-primary-500/10' };
    if (project.status === 'At Risk') return { text: 'At Risk', color: 'text-danger-500 bg-danger-500/10' };
    if (project.status === 'On Hold') return { text: 'Paused', color: 'text-warning-500 bg-warning-500/10' };
    if (project.progress < 20 && project.status === 'Planning') return { text: 'Starting', color: 'text-accent-500 bg-accent-500/10' };
    return { text: 'On Track', color: 'text-success-500 bg-success-500/10' };
  };

  const health = getHealth();
  const budgetUsed = project.progress > 0 ? Math.min(100, Math.floor(project.progress * 1.15)) + '% Used' : 'Not Started';

  let resources = 'Optimal';
  let resourceColor = 'bg-success-500/10 text-success-500';
  if (!project.team || project.team.length === 0) {
    resources = 'Unassigned';
    resourceColor = 'bg-surface-secondary text-text-secondary';
  } else if (project.team.length <= 2) {
    resources = 'Stretched';
    resourceColor = 'bg-warning-500/10 text-warning-500';
  }

  const tasksTotal = project.tasks ? project.tasks.total : 0;
  const tasksCompleted = project.tasks ? project.tasks.completed : 0;
  const remainingTasks = Math.max(0, tasksTotal - tasksCompleted);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Summary */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-border/40">
          <h3 className="text-lg font-bold text-text-primary mb-4">Project Summary</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            {project.description || 'No description provided.'}
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
              <div className="text-2xl font-bold text-text-primary">{remainingTasks}</div>
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
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${health.color}`}>{health.text}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border/40">
              <span className="text-sm text-text-secondary">Budget</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-surface-secondary text-text-primary">{budgetUsed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Resources</span>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${resourceColor}`}>{resources}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
