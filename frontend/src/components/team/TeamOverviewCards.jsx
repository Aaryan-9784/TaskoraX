import { 
  HiOutlineUsers, 
  HiOutlineUserGroup, 
  HiOutlineClipboardDocumentCheck, 
  HiOutlineChartBar, 
  HiOutlineClock, 
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown
} from 'react-icons/hi2';

import { useTask } from '../../context/TaskContext';

const getCards = (stats) => [
  {
    title: 'Total Members',
    value: '24',
    trend: '+2',
    trendUp: true,
    icon: HiOutlineUsers,
    color: 'text-primary-500',
    bg: 'bg-primary-500/10'
  },
  {
    title: 'Active Now',
    value: '18',
    trend: 'Stable',
    trendUp: true,
    icon: HiOutlineUserGroup,
    color: 'text-success-500',
    bg: 'bg-success-500/10'
  },
  {
    title: 'Tasks Completed',
    value: stats ? stats.completed : '0',
    trend: '+12%',
    trendUp: true,
    icon: HiOutlineClipboardDocumentCheck,
    color: 'text-accent-500',
    bg: 'bg-accent-500/10'
  },
  {
    title: 'Team Productivity',
    value: stats?.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}%` : '0%',
    trend: '+4%',
    trendUp: true,
    icon: HiOutlineChartBar,
    color: 'text-secondary-500',
    bg: 'bg-secondary-500/10'
  },
  {
    title: 'Overdue Tasks',
    value: stats ? stats.overdue : '0',
    trend: '-2',
    trendUp: true, // fewer overdue is good
    icon: HiOutlineClock,
    color: 'text-warning-500',
    bg: 'bg-warning-500/10'
  }
];

const TeamOverviewCards = () => {
  const { stats } = useTask();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {getCards(stats).map((card, idx) => (
        <div key={idx} className="glass-panel p-5 rounded-2xl hover:shadow-card-hover transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
              <card.icon className="h-6 w-6" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${card.trendUp ? 'bg-success-50 text-success-600' : 'bg-danger-50 text-danger-600'}`}>
              {card.trendUp ? <HiOutlineArrowTrendingUp className="w-3 h-3" /> : <HiOutlineArrowTrendingDown className="w-3 h-3" />}
              {card.trend}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-tertiary mb-1">{card.title}</h3>
            <p className="text-2xl font-extrabold text-text-primary">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamOverviewCards;
