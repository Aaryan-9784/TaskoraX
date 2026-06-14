import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';

const StatCard = ({ title, value, icon: Icon, trend, color = 'primary', sparklineData = [] }) => {
  const colorMap = {
    primary: {
      bg: 'bg-primary-50/50',
      icon: 'text-primary-500',
      trend: 'text-primary-600',
      border: 'group-hover:border-primary-300',
      glow: 'group-hover:shadow-glow',
      stroke: '#ef4444'
    },
    success: {
      bg: 'bg-success-50/50',
      icon: 'text-success-500',
      trend: 'text-success-600',
      border: 'group-hover:border-success-300',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
      stroke: '#22c55e'
    },
    warning: {
      bg: 'bg-warning-50/50',
      icon: 'text-warning-500',
      trend: 'text-warning-600',
      border: 'group-hover:border-warning-300',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
      stroke: '#f59e0b'
    },
    danger: {
      bg: 'bg-danger-50/50',
      icon: 'text-danger-500',
      trend: 'text-danger-600',
      border: 'group-hover:border-danger-300',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
      stroke: '#ef4444'
    },
    accent: {
      bg: 'bg-accent-50/50',
      icon: 'text-accent-500',
      trend: 'text-accent-600',
      border: 'group-hover:border-accent-300',
      glow: 'group-hover:shadow-glow-accent',
      stroke: '#8b5cf6'
    }
  };

  const colors = colorMap[color] || colorMap.primary;
  
  // Generate dummy data if none provided
  const data = sparklineData.length > 0 ? sparklineData : Array.from({ length: 7 }).map((_, i) => ({
    value: Math.floor(Math.random() * 50) + 10 + (trend > 0 ? i * 5 : (7 - i) * 5)
  }));

  const isPositive = trend > 0;

  return (
    <div className={`card-premium group cursor-pointer ${colors.border}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center transition-transform group-hover:scale-110 group-hover:${colors.glow}`}>
          <Icon className={`h-5 w-5 ${colors.icon}`} />
        </div>
        
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-success-50 text-success-600' : 'bg-danger-50 text-danger-600'}`}>
            {isPositive ? <HiArrowTrendingUp className="h-3 w-3" /> : <HiArrowTrendingDown className="h-3 w-3" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-3xl font-extrabold font-display text-text-primary mb-1 group-hover:text-primary-600 transition-colors">
          {value}
        </p>
        <p className="text-sm font-medium text-text-tertiary">
          {title}
        </p>
      </div>

      {/* Mini Sparkline Chart */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.stroke} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={colors.stroke} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={colors.stroke} 
              strokeWidth={2}
              fill={`url(#gradient-${title})`} 
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
