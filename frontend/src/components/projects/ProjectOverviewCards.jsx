import { HiOutlineFolder, HiOutlinePlay, HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';

const ProjectOverviewCards = ({ metrics }) => {
  const cards = [
    {
      title: 'Total Projects',
      value: metrics.total,
      icon: HiOutlineFolder,
      trend: '+2 this month',
      color: 'text-primary-500',
      bg: 'bg-primary-500/10',
      border: 'border-primary-500/20'
    },
    {
      title: 'Active Projects',
      value: metrics.active,
      icon: HiOutlinePlay,
      trend: 'In progress',
      color: 'text-accent-500',
      bg: 'bg-accent-500/10',
      border: 'border-accent-500/20'
    },
    {
      title: 'Completed',
      value: metrics.completed,
      icon: HiOutlineCheckCircle,
      trend: '100% finished',
      color: 'text-success-500',
      bg: 'bg-success-500/10',
      border: 'border-success-500/20'
    },
    {
      title: 'At Risk',
      value: metrics.atRisk,
      icon: HiOutlineExclamationTriangle,
      trend: 'Needs attention',
      color: 'text-warning-500',
      bg: 'bg-warning-500/10',
      border: 'border-warning-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
      {cards.map((card, idx) => (
        <div key={idx} className="glass-panel p-5 rounded-2xl border border-border/40 hover:border-border/80 transition-all hover:shadow-soft group cursor-default">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.bg} ${card.color} ${card.border} border group-hover:scale-110 transition-transform duration-300`}>
              <card.icon className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-surface-secondary text-text-secondary rounded-full border border-border/40">
              {card.trend}
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-text-primary tracking-tight mb-1">{card.value}</h3>
            <p className="text-sm font-medium text-text-secondary">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectOverviewCards;
