import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 85 },
  { name: 'Wed', score: 70 },
  { name: 'Thu', score: 92 },
  { name: 'Fri', score: 88 },
  { name: 'Sat', score: 45 },
  { name: 'Sun', score: 55 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border/60 p-3 rounded-xl shadow-elevated glass-panel">
        <p className="text-sm font-bold text-text-primary mb-1">{label}</p>
        <p className="text-xs font-bold text-accent-500">
          Score: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const ProductivityChart = () => {
  return (
    <div className="card-premium h-full flex flex-col">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Weekly Productivity</h3>
          <p className="text-sm text-text-tertiary">Based on tasks completed on time</p>
        </div>
        <div className="bg-accent-50 text-accent-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse-soft"></span>
          Avg: 71%
        </div>
      </div>
      
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }} />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.score > 80 ? '#22c55e' : entry.score > 60 ? '#8b5cf6' : '#94a3b8'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;
