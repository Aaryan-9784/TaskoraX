import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', completed: 4, added: 6 },
  { name: 'Tue', completed: 7, added: 5 },
  { name: 'Wed', completed: 5, added: 8 },
  { name: 'Thu', completed: 9, added: 4 },
  { name: 'Fri', completed: 12, added: 7 },
  { name: 'Sat', completed: 3, added: 2 },
  { name: 'Sun', completed: 5, added: 3 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border/60 p-3 rounded-xl shadow-elevated glass-panel">
        <p className="text-sm font-bold text-text-primary mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-xs font-medium text-text-secondary capitalize">{entry.name}:</span>
            <span className="text-xs font-bold text-text-primary">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const TaskCompletionChart = () => {
  return (
    <div className="card-premium h-full flex flex-col group relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/10 transition-colors duration-700"></div>

      <div className="mb-6 relative z-10">
        <h3 className="text-lg font-bold text-text-primary">Task Completion Trend</h3>
        <p className="text-sm text-text-tertiary">Daily tasks completed vs added</p>
      </div>
      
      <div className="flex-1 min-h-[300px] relative z-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 15 }}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAdded" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
              tickMargin={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="completed" 
              name="Completed"
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCompleted)" 
              activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="added" 
              name="Added"
              stroke="#94a3b8" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorAdded)" 
              activeDot={{ r: 6, fill: '#94a3b8', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default TaskCompletionChart;
