const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }) => {
  const colorMap = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'text-primary-500',
      trend: 'text-primary-600',
    },
    success: {
      bg: 'bg-success-50',
      icon: 'text-success-500',
      trend: 'text-success-600',
    },
    warning: {
      bg: 'bg-warning-50',
      icon: 'text-warning-500',
      trend: 'text-warning-600',
    },
    danger: {
      bg: 'bg-danger-50',
      icon: 'text-danger-500',
      trend: 'text-danger-600',
    },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <div className="bg-white border border-border/40 rounded-3xl p-6 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-3xl font-bold text-text-primary">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-1.5 ${colors.trend}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
            </p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`h-5 w-5 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
