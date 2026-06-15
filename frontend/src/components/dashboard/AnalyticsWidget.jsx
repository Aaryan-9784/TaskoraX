import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiOutlineChartPie } from 'react-icons/hi2';
import Select from '../common/Select';

const data = [
  { name: 'Mon', tasks: 12, productivity: 65 },
  { name: 'Tue', tasks: 19, productivity: 85 },
  { name: 'Wed', tasks: 15, productivity: 75 },
  { name: 'Thu', tasks: 22, productivity: 95 },
  { name: 'Fri', tasks: 18, productivity: 80 },
  { name: 'Sat', tasks: 5, productivity: 40 },
  { name: 'Sun', tasks: 8, productivity: 55 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-border/60 p-3 rounded-xl shadow-elevated">
        <p className="text-sm font-bold text-text-primary mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-xs text-text-secondary">
              {entry.name}: <span className="font-bold text-text-primary">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsWidget = () => {
  const [timeframe, setTimeframe] = useState('This Week');

  return (
    <div className="card-premium h-full flex flex-col group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold font-display text-text-primary flex items-center gap-2">
            <HiOutlineChartPie className="h-5 w-5 text-primary-500" />
            Performance Analytics
          </h3>
          <p className="text-sm text-text-tertiary mt-0.5">Weekly task completion & velocity</p>
        </div>
        
        <div className="w-36">
          <Select 
            options={[
              { label: 'This Week', value: 'This Week' },
              { label: 'Last Week', value: 'Last Week' },
              { label: 'This Month', value: 'This Month' }
            ]}
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 600 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="productivity" 
              name="Productivity Score"
              stroke="#8b5cf6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorProd)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6', className: 'shadow-glow-accent' }}
            />
            <Area 
              type="monotone" 
              dataKey="tasks" 
              name="Tasks Completed"
              stroke="#ef4444" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTasks)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#ef4444', className: 'shadow-glow' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsWidget;
