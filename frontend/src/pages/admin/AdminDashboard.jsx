import { useState, useEffect } from 'react';
import api from '../../services/api';
import { HiOutlineUsers, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineClipboardDocumentList, HiOutlineChartBar, HiOutlineClock, HiArrowPath, HiOutlineUserPlus, HiOutlineFolderPlus, HiOutlineDocumentPlus } from 'react-icons/hi2';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Sector } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

const StatCard = ({ title, value, icon: Icon, colorClass, trend, trendValue, sparklineData, sparklineColor, sparklineFill }) => {
  const data = sparklineData || [10, 20, 15, 30, 25, 40, 35, 50, 45];
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const step = 100 / (data.length - 1);
  
  const d = `M 0,${30 - ((data[0] - min) / range) * 30} ` + data.slice(1).map((val, i) => {
    const prevX = i * step;
    const x = (i + 1) * step;
    const prevY = 30 - ((data[i] - min) / range) * 30;
    const y = 30 - ((val - min) / range) * 30;
    const cp1x = prevX + step / 2;
    const cp2x = x - step / 2;
    return `C ${cp1x},${prevY} ${cp2x},${y} ${x},${y}`;
  }).join(' ');

  const fillD = `${d} L 100,30 L 0,30 Z`;

  return (
    <div className="relative bg-white dark:bg-surface-secondary overflow-hidden rounded-[2rem] p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-border/10 flex flex-col justify-between group min-h-[160px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
      <div className="flex justify-between items-start z-10 mb-4">
        <div className={`p-2.5 rounded-2xl ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${trend === 'up' ? 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400' : 'bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-400'}`}>
            {trend === 'up' ? (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            ) : (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
            )}
            {trendValue}
          </div>
        )}
      </div>
      
      <div className="z-10 mt-auto mb-2">
        <h3 className="text-3xl font-extrabold text-text-primary mb-1">{value}</h3>
        <p className="text-sm font-medium text-text-tertiary">{title}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full h-12 pointer-events-none opacity-90">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
          <path d={fillD} fill={sparklineFill || "rgba(156, 163, 175, 0.15)"} />
          <path d={d} fill="none" stroke={sparklineColor || "#d1d5db"} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, midAngle } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={8}
      />
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700}>
        {value}
      </text>
    </g>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTaskIdx, setActiveTaskIdx] = useState(-1);
  const [activeRoleIdx, setActiveRoleIdx] = useState(-1);
  const [activeProjectIdx, setActiveProjectIdx] = useState(-1);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const statsRes = await api.get('/admin/dashboard');
      if (statsRes.data?.data?.stats) {
        setStats(statsRes.data.data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    }

    try {
      const analyticsRes = await api.get('/admin/analytics');
      if (analyticsRes.data?.data) {
        setAnalytics(analyticsRes.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch admin analytics:', error);
    }

    if (!isRefresh) setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userGrowthData = analytics?.userGrowth?.length === 1 
    ? [
        { _id: new Date(new Date(analytics.userGrowth[0]._id).setDate(new Date(analytics.userGrowth[0]._id).getDate() - 1)).toISOString(), count: 0 },
        analytics.userGrowth[0]
      ]
    : analytics?.userGrowth || [];

  const taskGrowthData = analytics?.taskGrowth?.length === 1 
    ? [
        { _id: new Date(new Date(analytics.taskGrowth[0]._id).setDate(new Date(analytics.taskGrowth[0]._id).getDate() - 1)).toISOString(), count: 0 },
        analytics.taskGrowth[0]
      ]
    : analytics?.taskGrowth || [];

  const activityGrowthData = analytics?.activityGrowth?.length === 1 
    ? [
        { _id: new Date(new Date(analytics.activityGrowth[0]._id).setDate(new Date(analytics.activityGrowth[0]._id).getDate() - 1)).toISOString(), count: 0 },
        analytics.activityGrowth[0]
      ]
    : analytics?.activityGrowth || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Platform overview and quick metrics</p>
        </div>
        <button 
          onClick={() => fetchData(true)} 
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-secondary text-slate-700 dark:text-slate-300 border border-border/50 rounded-xl hover:bg-slate-50 dark:hover:bg-surface-tertiary transition-colors shadow-sm disabled:opacity-50 text-sm font-medium"
        >
          <HiArrowPath className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="space-y-8">
        {/* People Section */}
        <section>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <span className="p-1.5 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <HiOutlineUsers className="w-5 h-5 text-primary-600" />
            </span>
            People
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={HiOutlineUsers} colorClass="bg-primary-50 text-primary-600" trend="up" trendValue="5%" sparklineColor="#818cf8" sparklineFill="rgba(129, 140, 248, 0.15)" sparklineData={[10, 15, 10, 20, 40, 60, 70, 50, 30, 20]} />
            <StatCard title="Active Users" value={stats?.activeUsers || 0} icon={HiOutlineCheckCircle} colorClass="bg-success-50 text-success-600" trend="up" trendValue="12%" sparklineColor="#4ade80" sparklineFill="rgba(74, 222, 128, 0.15)" sparklineData={[30, 40, 30, 20, 30, 50, 40, 30, 40]} />
            <StatCard title="Total Admins" value={stats?.totalAdmins || 0} icon={HiOutlineUsers} colorClass="bg-accent-50 text-accent-600" trend="up" trendValue="2%" sparklineColor="#c084fc" sparklineFill="rgba(192, 132, 252, 0.15)" sparklineData={[20, 30, 25, 40, 45, 60, 55, 70, 80]} />
            <StatCard title="New Users (Month)" value={stats?.newUsersThisMonth || 0} icon={HiOutlineUsers} colorClass="bg-info-50 text-info-600 dark:bg-info-900/30 dark:text-info-400" trend="up" trendValue="24%" sparklineColor="#38bdf8" sparklineFill="rgba(56, 189, 248, 0.15)" sparklineData={[10, 20, 15, 30, 25, 40, 35, 50, 80]} />
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <span className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <HiOutlineClipboardDocumentList className="w-5 h-5 text-indigo-600" />
            </span>
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Projects" value={stats?.totalProjects || 0} icon={HiOutlineClipboardDocumentList} colorClass="bg-indigo-50 text-indigo-600" trend="up" trendValue="8%" sparklineColor="#818cf8" sparklineFill="rgba(129, 140, 248, 0.15)" sparklineData={[15, 20, 25, 20, 30, 45, 50, 60, 65]} />
            <StatCard title="Active Projects" value={stats?.activeProjects || 0} icon={HiOutlineCheckCircle} colorClass="bg-success-50 text-success-600" trend="up" trendValue="15%" sparklineColor="#4ade80" sparklineFill="rgba(74, 222, 128, 0.15)" sparklineData={[10, 20, 15, 30, 25, 40, 35, 50, 45]} />
            <StatCard title="Completed Projects" value={stats?.completedProjects || 0} icon={HiOutlineCheckCircle} colorClass="bg-info-50 text-info-600 dark:bg-info-900/30 dark:text-info-400" trend="up" trendValue="10%" sparklineColor="#38bdf8" sparklineFill="rgba(56, 189, 248, 0.15)" sparklineData={[5, 10, 15, 20, 30, 40, 45, 50, 55]} />
            <StatCard title="At Risk Projects" value={stats?.atRiskProjects || 0} icon={HiOutlineExclamationCircle} colorClass="bg-danger-50 text-danger-600" trend="down" trendValue="2%" sparklineColor="#f87171" sparklineFill="rgba(248, 113, 113, 0.15)" sparklineData={[60, 50, 30, 20, 15, 25, 40, 50, 45]} />
          </div>
        </section>

        {/* Tasks Section */}
        <section>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <span className="p-1.5 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
              <HiOutlineClipboardDocumentList className="w-5 h-5 text-rose-600" />
            </span>
            Tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Tasks" value={stats?.totalTasks || 0} icon={HiOutlineClipboardDocumentList} colorClass="bg-rose-50 text-rose-500" trend="up" trendValue="12%" sparklineColor="#d1d5db" sparklineFill="rgba(209, 213, 219, 0.4)" sparklineData={[10, 5, 10, 15, 30, 45, 60, 40, 20, 10]} />
            <StatCard title="Completed Tasks" value={stats?.completedTasks || 0} icon={HiOutlineCheckCircle} colorClass="bg-success-50 text-success-500" trend="up" trendValue="18%" sparklineColor="#4ade80" sparklineFill="rgba(74, 222, 128, 0.2)" sparklineData={[30, 25, 15, 20, 25, 35, 30, 25, 20]} />
            <StatCard title="Pending Tasks" value={stats?.pendingTasks || 0} icon={HiOutlineClock} colorClass="bg-amber-50 text-amber-500" trend="down" trendValue="5%" sparklineColor="#fbbf24" sparklineFill="rgba(251, 191, 36, 0.2)" sparklineData={[60, 40, 20, 10, 5, 8, 12, 15, 18]} />
            <StatCard title="Overdue Tasks" value={stats?.overdueTasks || 0} icon={HiOutlineExclamationCircle} colorClass="bg-danger-50 text-danger-500" trend="down" trendValue="8%" sparklineColor="#f87171" sparklineFill="rgba(248, 113, 113, 0.2)" sparklineData={[40, 30, 10, 5, 10, 30, 40, 20, 10]} />
          </div>
        </section>
      </div>

      {/* Analytics Section */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
          <span className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <HiOutlineChartBar className="w-5 h-5 text-indigo-600" />
          </span>
          Analytics & Trends
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">User Growth</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">New registrations (Last 30 Days)</p>
              </div>
              <div className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-semibold">+14% vs last month</div>
            </div>
            
            <div className="h-72">
              {!analytics ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                  <span className="font-medium">Loading chart data...</span>
                </div>
              ) : userGrowthData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                    <XAxis dataKey="_id" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} tickLine={false} axisLine={false} dy={10} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickLine={false} axisLine={false} allowDecimals={false} dx={-10} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)', padding: '10px 14px', fontSize: '13px' }}
                      itemStyle={{ fontWeight: 700, color: '#6366f1' }}
                      labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    />

                    <Bar dataKey="count" name="New Users" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No data available for the last 30 days</div>
              )}
            </div>
          </div>

          {/* Task Activity */}
          <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Task Activity</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Tasks created (Last 30 Days)</p>
              </div>
              <div className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <HiOutlineCheckCircle className="w-4 h-4" />
              </div>
            </div>
            
            <div className="h-72 flex items-center justify-center">
              {!analytics ? (
                <div className="h-full w-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                  <span className="font-medium">Loading chart data...</span>
                </div>
              ) : taskGrowthData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={taskGrowthData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                    <defs>
                      <linearGradient id="colorTask" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                    <XAxis dataKey="_id" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} tickLine={false} axisLine={false} dy={10} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickLine={false} axisLine={false} allowDecimals={false} dx={-10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)', padding: '10px 14px', fontSize: '13px' }}
                      itemStyle={{ fontWeight: 700, color: '#10b981' }}
                      labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    />

                    <Area type="monotone" dataKey="count" name="Tasks Created" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorTask)" activeDot={{ r: 6, strokeWidth: 0, fill: '#059669' }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No task data available</div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Task Statistics */}
          <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Task Overview</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Distribution by status</p>
              </div>
              <div className="p-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <HiOutlineChartBar className="w-4 h-4" />
              </div>
            </div>
            
            <div className="h-72 flex items-center justify-center">
              {!analytics ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                  <span className="font-medium">Loading chart data...</span>
                </div>
              ) : analytics.taskStats && analytics.taskStats.length > 0 ? (
                <div className="relative w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <filter id="pieShadow1" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
                        </filter>
                      </defs>
                      <Pie
                        data={analytics.taskStats}
                        dataKey="count"
                        nameKey="_id"
                        cx="50%"
                        cy="45%"
                        innerRadius={65}
                        outerRadius={90}
                        paddingAngle={6}
                        cornerRadius={8}
                        stroke="none"
                        filter="url(#pieShadow1)"
                        activeIndex={activeTaskIdx}
                        activeShape={renderActiveShape}
                        onMouseEnter={(_, index) => setActiveTaskIdx(index)}
                        onMouseLeave={() => setActiveTaskIdx(-1)}
                      >
                        {analytics.taskStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>

                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => <span className="text-slate-600 dark:text-slate-400 font-medium ml-1.5 capitalize">{value}</span>}
                        wrapperStyle={{ paddingTop: '24px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Center Total tasks label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {activeTaskIdx !== -1 ? analytics.taskStats[activeTaskIdx].count : analytics.taskStats.reduce((sum, item) => sum + item.count, 0)}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                      {activeTaskIdx !== -1 ? analytics.taskStats[activeTaskIdx]._id : 'Tasks'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No task data available</div>
              )}
            </div>
          </div>

          {/* User Roles Breakdown */}
          <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">User Roles</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Distribution across platform</p>
              </div>
              <div className="p-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg">
                <HiOutlineUsers className="w-4 h-4" />
              </div>
            </div>
            
            <div className="h-72 flex items-center justify-center">
              {!analytics ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mb-4"></div>
                  <span className="font-medium">Loading chart data...</span>
                </div>
              ) : analytics.userRoleStats && analytics.userRoleStats.length > 0 ? (
                <div className="relative w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <filter id="pieShadow2" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
                        </filter>
                      </defs>
                      <Pie
                        data={analytics.userRoleStats}
                        dataKey="count"
                        nameKey="_id"
                        cx="50%"
                        cy="45%"
                        innerRadius={65}
                        outerRadius={90}
                        paddingAngle={6}
                        cornerRadius={8}
                        stroke="none"
                        filter="url(#pieShadow2)"
                        activeIndex={activeRoleIdx}
                        activeShape={renderActiveShape}
                        onMouseEnter={(_, index) => setActiveRoleIdx(index)}
                        onMouseLeave={() => setActiveRoleIdx(-1)}
                      >
                        {analytics.userRoleStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                        ))}
                      </Pie>

                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => <span className="text-slate-600 dark:text-slate-400 font-medium ml-1.5 capitalize">{value}</span>}
                        wrapperStyle={{ paddingTop: '24px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Center Total roles label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {activeRoleIdx !== -1 ? analytics.userRoleStats[activeRoleIdx].count : analytics.userRoleStats.reduce((sum, item) => sum + item.count, 0)}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                      {activeRoleIdx !== -1 ? analytics.userRoleStats[activeRoleIdx]._id : 'Users'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No role data available</div>
              )}
            </div>
          </div>

          {/* Project Status Breakdown */}
          <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Project Status</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Current project health</p>
              </div>
              <div className="p-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg">
                <HiOutlineFolderPlus className="w-4 h-4" />
              </div>
            </div>
            
            <div className="h-72 flex items-center justify-center">
              {!analytics ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-4"></div>
                  <span className="font-medium">Loading chart data...</span>
                </div>
              ) : analytics.projectStats && analytics.projectStats.length > 0 ? (
                <div className="relative w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <filter id="pieShadow3" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
                        </filter>
                      </defs>
                      <Pie
                        data={analytics.projectStats}
                        dataKey="count"
                        nameKey="_id"
                        cx="50%"
                        cy="45%"
                        innerRadius={65}
                        outerRadius={90}
                        paddingAngle={6}
                        cornerRadius={8}
                        stroke="none"
                        filter="url(#pieShadow3)"
                        activeIndex={activeProjectIdx}
                        activeShape={renderActiveShape}
                        onMouseEnter={(_, index) => setActiveProjectIdx(index)}
                        onMouseLeave={() => setActiveProjectIdx(-1)}
                      >
                        {analytics.projectStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                        ))}
                      </Pie>

                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => <span className="text-slate-600 dark:text-slate-400 font-medium ml-1.5 capitalize">{value}</span>}
                        wrapperStyle={{ paddingTop: '24px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Center Total roles label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {activeProjectIdx !== -1 ? analytics.projectStats[activeProjectIdx].count : analytics.projectStats.reduce((sum, item) => sum + item.count, 0)}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                      {activeProjectIdx !== -1 ? analytics.projectStats[activeProjectIdx]._id : 'Projects'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No project data available</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 mt-6">
        {/* System Activity */}
        <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">System Activity</h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Total logs (Last 30 Days)</p>
            </div>
            <div className="p-1.5 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-lg">
              <HiOutlineChartBar className="w-4 h-4" />
            </div>
          </div>
          
          <div className="h-72 flex items-center justify-center">
            {!analytics ? (
              <div className="h-full w-full flex flex-col items-center justify-center text-slate-400">
                <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4"></div>
                <span className="font-medium">Loading chart data...</span>
              </div>
            ) : activityGrowthData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityGrowthData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                  <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                  <XAxis dataKey="_id" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} tickLine={false} axisLine={false} dy={10} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickLine={false} axisLine={false} allowDecimals={false} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)', padding: '10px 14px', fontSize: '13px' }}
                    itemStyle={{ fontWeight: 700, color: '#0ea5e9' }}
                    labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  />

                  <Area type="monotone" dataKey="count" name="System Events" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorActivity)" activeDot={{ r: 6, strokeWidth: 0, fill: '#0284c7' }} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No activity data available</div>
            )}
          </div>
        </div>


      </div>

    </div>
  );
};

export default AdminDashboard;
