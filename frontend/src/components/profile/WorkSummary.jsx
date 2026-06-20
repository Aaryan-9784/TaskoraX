const ProgressBar = ({ label, value, max = 100, colorClass = "bg-primary-500" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-text-secondary">{label}</span>
        <span className="text-sm font-bold text-text-primary">{value}{max === 100 ? '%' : `/${max}`}</span>
      </div>
      <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const WorkSummary = ({ stats }) => {
  // Mocked data for demonstration
  const completionRate = stats?.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  
  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <div className="px-6 py-5 border-b border-border/50 bg-surface-secondary/30">
        <h3 className="text-lg font-semibold text-text-primary">Work Summary</h3>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        
        {/* Productivity Score Circle */}
        <div className="flex items-center justify-between p-4 bg-primary-50/50 rounded-xl border border-primary-100">
          <div>
            <h4 className="text-sm font-semibold text-primary-900 mb-1">Productivity Score</h4>
            <p className="text-xs text-primary-700/80">Based on recent activity & tasks completed</p>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-primary-200"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary-600 transition-all duration-1000 ease-out"
                strokeWidth="3"
                strokeDasharray="92, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex items-center justify-center text-primary-700 font-bold text-lg">
              92
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <ProgressBar label="Task Completion Rate" value={completionRate} colorClass="bg-success-500" />
          <ProgressBar label="Assigned Tasks" value={stats?.total || 0} max={100} colorClass="bg-primary-500" />
          <ProgressBar label="Weekly Activity Goal" value={85} colorClass="bg-primary-500" />
          <ProgressBar label="Projects Contributed" value={5} max={10} colorClass="bg-warning-500" />
        </div>
      </div>
    </div>
  );
};

export default WorkSummary;
