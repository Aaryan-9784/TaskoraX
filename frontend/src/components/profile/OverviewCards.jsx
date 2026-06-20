import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineBriefcase, HiOutlineUserGroup, HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown } from 'react-icons/hi2';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass, bgColorClass }) => (
  <div className="bg-white border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-medium transition-shadow duration-300 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 ${bgColorClass} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-300 group-hover:scale-110`}></div>
    
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
        <h4 className="text-3xl font-bold text-text-primary tracking-tight">{value}</h4>
      </div>
      <div className={`p-3 rounded-xl ${bgColorClass} ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    
    {trend && (
      <div className="mt-4 flex items-center text-sm relative z-10">
        {trend === 'up' ? (
          <span className="flex items-center text-success-600 bg-success-50 px-1.5 py-0.5 rounded-md font-medium text-xs">
            <HiOutlineArrowTrendingUp className="w-3.5 h-3.5 mr-1" />
            {trendValue}
          </span>
        ) : trend === 'down' ? (
          <span className="flex items-center text-danger-600 bg-danger-50 px-1.5 py-0.5 rounded-md font-medium text-xs">
            <HiOutlineArrowTrendingDown className="w-3.5 h-3.5 mr-1" />
            {trendValue}
          </span>
        ) : null}
        <span className="text-text-tertiary ml-2 text-xs">vs last month</span>
      </div>
    )}
  </div>
);

const OverviewCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Tasks" 
        value={stats?.total || 0} 
        icon={HiOutlineBriefcase} 
        trend="up" 
        trendValue="12%"
        colorClass="text-primary-600"
        bgColorClass="bg-primary-100"
      />
      <StatCard 
        title="Completed Tasks" 
        value={stats?.completed || 0} 
        icon={HiOutlineCheckCircle} 
        trend="up" 
        trendValue="8%"
        colorClass="text-success-600"
        bgColorClass="bg-success-100"
      />
      <StatCard 
        title="Active Projects" 
        value="5" 
        icon={HiOutlineClock} 
        trend="down" 
        trendValue="2%"
        colorClass="text-warning-600"
        bgColorClass="bg-warning-100"
      />
      <StatCard 
        title="Team Collaborations" 
        value="12" 
        icon={HiOutlineUserGroup} 
        trend="up" 
        trendValue="24%"
        colorClass="text-primary-600"
        bgColorClass="bg-primary-100"
      />
    </div>
  );
};

export default OverviewCards;
