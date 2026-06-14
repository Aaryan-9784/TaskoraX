import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'To Do', value: 12, color: '#94a3b8' },
  { name: 'In Progress', value: 8, color: '#3b82f6' },
  { name: 'In Review', value: 4, color: '#f59e0b' },
  { name: 'Completed', value: 18, color: '#22c55e' },
];

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
  return (
    <div className="card-premium h-full flex flex-col">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-text-primary">Task Distribution</h3>
        <p className="text-sm text-text-tertiary">Current status of active projects</p>
      </div>
      
      <div className="flex-1 min-h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
          <span className="text-3xl font-extrabold text-text-primary">42</span>
          <span className="text-xs font-medium text-text-tertiary">Total Tasks</span>
        </div>
      </div>
    </div>
  );
};

export default StatusDistributionChart;
