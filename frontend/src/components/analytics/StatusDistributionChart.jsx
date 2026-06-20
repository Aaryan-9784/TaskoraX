import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTask } from '../../context/TaskContext';
import { useMemo } from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border/60 p-3 rounded-xl shadow-elevated glass-panel">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }}></div>
          <p className="text-sm font-bold text-text-primary">{payload[0].name}</p>
        </div>
        <p className="text-lg font-extrabold text-text-primary mt-1 pl-5">
          {payload[0].value} <span className="text-xs font-medium text-text-tertiary">tasks</span>
        </p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></span>
          <span className="font-medium">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const StatusDistributionChart = () => {
  const { stats } = useTask();

  const chartData = useMemo(() => {
    // Only include statuses that have > 0 tasks to avoid overlapping zero-width slices,
    // or just include them all, Recharts handles 0 values well.
    return [
      { name: 'To Do', value: stats.pending || 0, color: '#94a3b8' },
      { name: 'In Progress', value: stats.inProgress || 0, color: '#A52A44' },
      { name: 'Completed', value: stats.completed || 0, color: '#22c55e' },
    ].filter(item => item.value > 0);
  }, [stats]);

  const totalTasks = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="card-premium h-full flex flex-col group relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/10 transition-colors duration-700"></div>

      <div className="mb-2 relative z-10">
        <h3 className="text-lg font-bold text-text-primary">Task Distribution</h3>
        <p className="text-sm text-text-tertiary">Current status of active projects</p>
      </div>
      
      <div className="flex-1 min-h-[300px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
              </filter>
            </defs>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={6}
              dataKey="value"
              stroke="none"
              cornerRadius={8}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: 'url(#shadow)' }} className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
          <div className="bg-surface/50 backdrop-blur-sm w-28 h-28 rounded-full flex flex-col items-center justify-center border border-border/40 shadow-sm group-hover:border-primary-200/50 transition-colors">
            <span className="text-3xl font-extrabold text-text-primary group-hover:text-primary-600 transition-colors">{totalTasks}</span>
            <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider mt-0.5">Tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusDistributionChart;
