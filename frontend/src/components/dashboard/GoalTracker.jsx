import { HiOutlineTrophy } from 'react-icons/hi2';

const GoalTracker = () => {
  const goals = [
    { title: 'Launch MVP', progress: 85, color: 'primary' },
    { title: 'Acquire 100 Users', progress: 40, color: 'secondary' },
    { title: 'Publish 5 Blog Posts', progress: 60, color: 'accent' },
  ];

  const getColorClasses = (color) => {
    switch(color) {
      case 'primary': return 'bg-primary-500 shadow-glow';
      case 'secondary': return 'bg-secondary-500 shadow-glow';
      case 'accent': return 'bg-accent-500 shadow-glow-accent';
      default: return 'bg-primary-500';
    }
  };

  const getTextClasses = (color) => {
    switch(color) {
      case 'primary': return 'text-primary-600';
      case 'secondary': return 'text-secondary-600';
      case 'accent': return 'text-accent-600';
      default: return 'text-primary-600';
    }
  };

  return (
    <div className="card-premium h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold font-display text-text-primary flex items-center gap-2">
            <HiOutlineTrophy className="h-5 w-5 text-warning-500" />
            Monthly Goals
          </h3>
          <p className="text-sm text-text-tertiary mt-0.5">Track your major milestones</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {goals.map((goal, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold text-text-primary group-hover:text-primary-600 transition-colors">
                {goal.title}
              </span>
              <span className={`text-xs font-bold ${getTextClasses(goal.color)}`}>
                {goal.progress}%
              </span>
            </div>
            <div className="w-full bg-surface-secondary border border-border/40 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getColorClasses(goal.color)}`}
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/40 text-center">
        <button className="text-xs font-bold text-text-secondary hover:text-primary-600 transition-colors">
          + Add New Goal
        </button>
      </div>
    </div>
  );
};

export default GoalTracker;
