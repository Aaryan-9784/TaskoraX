import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { HiOutlineChartPie } from 'react-icons/hi2';
import Select from '../common/Select';
import { useTask } from '../../context/TaskContext';

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
  const { allTasks = [] } = useTask();

  const chartData = useMemo(() => {
    const now = new Date();
    
    if (timeframe === 'This Month') {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((weekName, index) => {
        const start = new Date(firstDay);
        start.setDate(firstDay.getDate() + (index * 7));
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        
        const completedTasks = allTasks.filter(t => {
          if (t.status !== 'Done') return false;
          const updatedTime = new Date(t.updatedAt || t.createdAt || 0).getTime();
          return updatedTime >= start.getTime() && (index === 3 ? true : updatedTime < end.getTime());
        });
        
        const tasksCompleted = completedTasks.length;
        return {
          name: weekName,
          tasks: tasksCompleted,
          productivity: tasksCompleted > 0 ? Math.min(100, 40 + (tasksCompleted * 10)) : 0
        };
      });
    }

    // Default to a 7-day view (This Week or Last Week)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    
    const monday = new Date(now);
    if (timeframe === 'Last Week') {
      monday.setDate(now.getDate() - currentDayOfWeek - 6);
    } else {
      monday.setDate(now.getDate() - currentDayOfWeek + 1);
    }
    monday.setHours(0, 0, 0, 0);

    return days.map((dayName, index) => {
      const targetDate = new Date(monday);
      targetDate.setDate(monday.getDate() + index);
      const nextDate = new Date(targetDate);
      nextDate.setDate(targetDate.getDate() + 1);

      const completedTasks = allTasks.filter(t => {
        if (t.status !== 'Done') return false;
        const updatedTime = new Date(t.updatedAt || t.createdAt || 0).getTime();
        return updatedTime >= targetDate.getTime() && updatedTime < nextDate.getTime();
      });
      
      const tasksCompleted = completedTasks.length;
      return {
        name: dayName,
        tasks: tasksCompleted,
        productivity: tasksCompleted > 0 ? Math.min(100, 40 + (tasksCompleted * 20)) : 0
      };
    });
  }, [timeframe, allTasks]);

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
               <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(128, 0, 32,0.6)]"></div>
               <span className="text-xs font-semibold text-text-secondary">Productivity</span>
             </div>
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(200, 43, 81,0.6)]"></div>
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

      <div className="flex-1 w-full min-h-[220px] relative mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 25 }}>
            <defs>
              <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#800020" stopOpacity={0.25}/>
                <stop offset="100%" stopColor="#800020" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C82B51" stopOpacity={0.25}/>
                <stop offset="100%" stopColor="#C82B51" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }} 
              dy={15}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            <Area 
              type="natural" 
              dataKey="productivity" 
              name="Productivity"
              stroke="#800020" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorProd)" 
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#FFFFFF', fill: '#800020' }}
            />
            <Area 
              type="natural" 
              dataKey="tasks" 
              name="Tasks"
              stroke="#C82B51" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTasks)" 
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#FFFFFF', fill: '#C82B51' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsWidget;
