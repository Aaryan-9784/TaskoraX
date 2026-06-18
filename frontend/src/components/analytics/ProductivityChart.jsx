import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTask } from '../../context/TaskContext';
import { useMemo } from 'react';

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
  const { allTasks = [] } = useTask();

  const { chartData, avgScore } = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const now = new Date();
    const currentDayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - currentDayOfWeek + 1);
    monday.setHours(0, 0, 0, 0);

    let totalScore = 0;
    let daysPassed = 0;

    const chartData = days.map((dayName, index) => {
      const targetDate = new Date(monday);
      targetDate.setDate(monday.getDate() + index);
      const nextDate = new Date(targetDate);
      nextDate.setDate(targetDate.getDate() + 1);

      let activeToday = 0;
      let completedToday = 0;

      allTasks.forEach(t => {
        const createdTime = new Date(t.createdAt || 0).getTime();
        const updatedTime = new Date(t.updatedAt || t.createdAt || 0).getTime();
        const isDone = t.status === 'Done';

        const wasCreatedBeforeEndOfDay = createdTime < nextDate.getTime();
        const wasCompletedBeforeStartOfDay = isDone && updatedTime < targetDate.getTime();

        if (wasCreatedBeforeEndOfDay && !wasCompletedBeforeStartOfDay) {
          activeToday++;
          if (isDone && updatedTime >= targetDate.getTime() && updatedTime < nextDate.getTime()) {
            completedToday++;
          }
        }
      });

      const score = activeToday > 0 ? Math.round((completedToday / activeToday) * 100) : 0;
      
      if (targetDate.getTime() <= now.getTime()) {
        totalScore += score;
        daysPassed++;
      }

      return {
        name: dayName,
        score
      };
    });

    const avgScore = daysPassed > 0 ? Math.round(totalScore / daysPassed) : 0;

    return { chartData, avgScore };
  }, [allTasks]);

  return (
    <div className="card-premium h-full flex flex-col group relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl -z-10 group-hover:bg-accent-500/10 transition-colors duration-700"></div>

      <div className="mb-6 flex justify-between items-start relative z-10">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Weekly Productivity</h3>
          <p className="text-sm text-text-tertiary">Based on tasks completed on time</p>
        </div>
        <div className="bg-accent-50 text-accent-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm border border-accent-100/50">
          <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse-soft shadow-[0_0_8px_rgba(139,92,246,0.5)]"></span>
          Avg: {avgScore}%
        </div>
      </div>
      
      <div className="flex-1 min-h-[300px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScoreHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={1}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="colorScoreMed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="colorScoreLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={1}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.05)', radius: 4 }} />
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.score > 80 ? 'url(#colorScoreHigh)' : entry.score > 60 ? 'url(#colorScoreMed)' : 'url(#colorScoreLow)'} 
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
