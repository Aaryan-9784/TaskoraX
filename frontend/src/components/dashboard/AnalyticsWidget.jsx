import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
      <div className="bg-white/95 backdrop-blur-xl border border-border/50 p-4 rounded-2xl shadow-xl z-50">
        <p className="text-sm font-bold text-text-primary mb-3 pb-2 border-b border-border/40">{label}</p>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm font-medium text-text-secondary">{entry.name}</span>
              </div>
              <span className="text-sm font-extrabold text-text-primary">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const AnalyticsWidget = () => {
  const [timeframe, setTimeframe] = useState('This Week');

  return (
    <div className="card-premium h-full flex flex-col group p-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-text-primary flex items-center gap-2.5 mb-1">
            <div className="p-1.5 bg-primary-50 rounded-lg">
               <HiOutlineChartPie className="h-5 w-5 text-primary-600" />
            </div>
            Performance & Velocity
          </h3>
          <div className="flex items-center gap-4 mt-3">
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
               <span className="text-xs font-semibold text-text-secondary">Productivity</span>
             </div>
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
               <span className="text-xs font-semibold text-text-secondary">Tasks Completed</span>
             </div>
          </div>
        </div>
        
        <div className="w-32">
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

      <div className="flex-1 w-full min-h-[220px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.25}/>
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.25}/>
                <stop offset="100%" stopColor="#06B6D4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} 
              dy={15}
            />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            <Area 
              type="natural" 
              dataKey="productivity" 
              name="Productivity"
              stroke="#6366F1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorProd)" 
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#FFFFFF', fill: '#6366F1' }}
            />
            <Area 
              type="natural" 
              dataKey="tasks" 
              name="Tasks"
              stroke="#06B6D4" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTasks)" 
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#FFFFFF', fill: '#06B6D4' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsWidget;
