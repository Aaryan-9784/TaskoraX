import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { HiOutlineUsers, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineClipboardDocumentList, HiOutlineChartBar, HiOutlineClock, HiArrowPath, HiOutlineUserPlus, HiOutlineFolderPlus, HiOutlineDocumentPlus, HiOutlineShieldExclamation, HiOutlineCheck, HiOutlineXMark } from 'react-icons/hi2';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Sector } from 'recharts';

const COLORS = ['#800020', '#A52A44', '#f59e0b', '#ef4444', '#A5183A', '#C82B51', '#D95878'];

const StatCard = ({ title, value, icon: Icon, colorClass, glowClass }) => {
  return (
    <div className={`relative bg-white dark:bg-surface-secondary overflow-hidden rounded-[2rem] p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-border/10 flex flex-col justify-between group min-h-[140px] hover:-translate-y-1 transition-all duration-300 ${glowClass || 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'}`}>
      <div className="absolute -right-6 -bottom-6 opacity-[0.03] dark:opacity-[0.02] transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
        <Icon className="w-32 h-32" />
      </div>
      <div className="flex justify-between items-start z-10 mb-4">
        <div className={`p-3 rounded-2xl ${colorClass} bg-opacity-50 backdrop-blur-sm`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="z-10 mt-auto mb-2 relative">
        <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">{value}</h3>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
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
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill} cornerRadius={8} />
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700}>{value}</text>
    </g>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState({ atRiskProjects: [], overdueTasks: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('system');
  const [activeTaskIdx, setActiveTaskIdx] = useState(-1);
  const [activeRoleIdx, setActiveRoleIdx] = useState(-1);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const statsRes = await api.get('/admin/dashboard');
      if (statsRes.data?.data?.stats) setStats(statsRes.data.data.stats);
      else setStats({});
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      setStats({});
    }

    try {
      const analyticsRes = await api.get('/admin/analytics');
      if (analyticsRes.data?.data) setAnalytics(analyticsRes.data.data);
      else setAnalytics({});
    } catch (error) {
      console.error('Failed to fetch admin analytics:', error);
      setAnalytics({});
    }

    try {
      const logsRes = await api.get('/admin/activity-logs?limit=15');
      if (logsRes.data?.data?.logs) setRecentLogs(logsRes.data.data.logs);
      else setRecentLogs([]);
    } catch (error) {
      console.error('Failed to fetch admin logs:', error);
      setRecentLogs([]);
    }

    try {
      const [usersRes, projRes, taskRes] = await Promise.all([
        api.get('/admin/users?sort=-createdAt&limit=5').catch(() => null),
        api.get('/admin/projects?status=At Risk&limit=4').catch(() => null),
        api.get('/admin/tasks?overdue=true&limit=4').catch(() => null)
      ]);
      if (usersRes?.data?.data?.users) setRecentUsers(usersRes.data.data.users);
      else setRecentUsers([]);
      
      setSystemAlerts({
        atRiskProjects: projRes?.data?.data?.projects || [],
        overdueTasks: taskRes?.data?.data?.tasks || []
      });
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }

    if (!isRefresh) setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchData(); }, []);

  const userGrowthData = analytics?.userGrowth?.length === 1 
    ? [{ _id: new Date(new Date(analytics.userGrowth[0]._id).setDate(new Date(analytics.userGrowth[0]._id).getDate() - 1)).toISOString(), count: 0 }, analytics.userGrowth[0]]
    : analytics?.userGrowth || [];

  const taskGrowthData = analytics?.taskGrowth?.length === 1 
    ? [{ _id: new Date(new Date(analytics.taskGrowth[0]._id).setDate(new Date(analytics.taskGrowth[0]._id).getDate() - 1)).toISOString(), count: 0 }, analytics.taskGrowth[0]]
    : analytics?.taskGrowth || [];

  const activityGrowthData = analytics?.activityGrowth?.length === 1 
    ? [{ _id: new Date(new Date(analytics.activityGrowth[0]._id).setDate(new Date(analytics.activityGrowth[0]._id).getDate() - 1)).toISOString(), count: 0 }, analytics.activityGrowth[0]]
    : analytics?.activityGrowth || [];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Platform overview and quick metrics</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/team" className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-sm text-sm font-medium">
            <HiOutlineUserPlus className="w-4 h-4" /> Add User
          </Link>
          <Link to="/analytics" className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-colors shadow-sm text-sm font-medium">
            <HiOutlineDocumentPlus className="w-4 h-4" /> View Reports
          </Link>
          <button onClick={() => fetchData(true)} disabled={refreshing} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-secondary text-slate-700 dark:text-slate-300 border border-border/50 rounded-xl hover:bg-slate-50 dark:hover:bg-surface-tertiary transition-colors shadow-sm disabled:opacity-50 text-sm font-medium">
            <HiArrowPath className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /> {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* TOP LEVEL KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={HiOutlineUsers} colorClass="bg-primary-50 text-primary-600" glowClass="hover:shadow-[0_8px_30px_rgba(128,0,32,0.15)]" />
        <StatCard title="Active Users" value={stats?.activeUsers || 0} icon={HiOutlineCheckCircle} colorClass="bg-success-50 text-success-600" glowClass="hover:shadow-[0_8px_30px_rgba(34,197,94,0.15)]" />
        <StatCard title="Total Projects" value={stats?.totalProjects || 0} icon={HiOutlineFolderPlus} colorClass="bg-accent-50 text-accent-600" glowClass="hover:shadow-[0_8px_30px_rgba(165,24,58,0.15)]" />
        <StatCard title="Total Tasks" value={stats?.totalTasks || 0} icon={HiOutlineClipboardDocumentList} colorClass="bg-primary-50 text-primary-600" glowClass="hover:shadow-[0_8px_30px_rgba(128,0,32,0.15)]" />
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-2 border-b border-border/40 pb-px mb-8 overflow-x-auto custom-scrollbar">
        <button onClick={() => setActiveTab('system')} className={`px-5 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'system' ? 'border-primary-600 text-primary-600 bg-primary-50/50 dark:bg-primary-900/10' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-surface-secondary'}`}>System & Activity</button>
        <button onClick={() => setActiveTab('users')} className={`px-5 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'users' ? 'border-primary-600 text-primary-600 bg-primary-50/50 dark:bg-primary-900/10' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-surface-secondary'}`}>User Analytics</button>
        <button onClick={() => setActiveTab('projects')} className={`px-5 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'projects' ? 'border-primary-600 text-primary-600 bg-primary-50/50 dark:bg-primary-900/10' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-surface-secondary'}`}>Projects & Tasks</button>
      </div>

      {activeTab === 'system' && (
        <div className="space-y-6 animate-fade-in">
          {/* System Alerts */}
          <section className="bg-danger-50 dark:bg-danger-900/10 border border-danger-200 dark:border-danger-800/30 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-danger-100 dark:bg-danger-800/40 text-danger-600 dark:text-danger-400 rounded-xl shrink-0">
                <HiOutlineShieldExclamation className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-danger-900 dark:text-danger-400 mb-1">System Alerts (Needs Attention)</h3>
                <p className="text-sm text-danger-700 dark:text-danger-300/80 mb-4">The following items are at risk or overdue and require immediate review.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* At Risk Projects */}
                  <div className="bg-white dark:bg-surface-secondary rounded-lg p-4 border border-danger-100 dark:border-danger-800/20 shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">At Risk Projects ({systemAlerts.atRiskProjects.length})</h4>
                    <div className="space-y-2">
                      {systemAlerts.atRiskProjects.length === 0 ? (
                        <p className="text-xs text-slate-500">No projects currently at risk. Great job!</p>
                      ) : systemAlerts.atRiskProjects.map(proj => (
                        <div key={proj._id} className="flex justify-between items-center p-2 hover:bg-slate-50 dark:hover:bg-surface-tertiary rounded-md transition-colors">
                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{proj.name}</span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-danger-100 dark:bg-danger-900/40 text-danger-700 dark:text-danger-400 rounded-full shrink-0 ml-2">At Risk</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overdue Tasks */}
                  <div className="bg-white dark:bg-surface-secondary rounded-lg p-4 border border-danger-100 dark:border-danger-800/20 shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Overdue Tasks ({systemAlerts.overdueTasks.length})</h4>
                    <div className="space-y-2">
                      {systemAlerts.overdueTasks.length === 0 ? (
                        <p className="text-xs text-slate-500">No overdue tasks.</p>
                      ) : systemAlerts.overdueTasks.map(task => (
                        <div key={task._id} className="flex justify-between items-center p-2 hover:bg-slate-50 dark:hover:bg-surface-tertiary rounded-md transition-colors">
                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{task.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-danger-100 dark:bg-danger-900/40 text-danger-700 dark:text-danger-400 rounded-full shrink-0 ml-2">Due {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Activity Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">System Activity</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Total logs (Last 30 Days)</p>
                </div>
                <div className="p-1.5 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg">
                  <HiOutlineChartBar className="w-4 h-4" />
                </div>
              </div>
              <div className="h-72 flex items-center justify-center">
                {!analytics ? (
                  <div className="h-full w-full flex flex-col items-center justify-center text-slate-400"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div></div>
                ) : activityGrowthData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityGrowthData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                      <defs>
                        <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#800020" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#800020" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                      <XAxis dataKey="_id" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} tickLine={false} axisLine={false} dy={10} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickLine={false} axisLine={false} allowDecimals={false} dx={-10} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="count" name="System Events" stroke="#800020" strokeWidth={4} fillOpacity={1} fill="url(#colorActivity)" activeDot={{ r: 6, strokeWidth: 0, fill: '#5C0014' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No activity data available</div>
                )}
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50 flex flex-col h-[380px]">
              <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Live system feed</p>
                </div>
                <div className="p-1.5 bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 rounded-lg">
                  <HiOutlineClock className="w-4 h-4" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto -mr-2 pr-2 flex flex-col gap-3 pb-2 custom-scrollbar">
                {!recentLogs || recentLogs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 font-medium">No recent activity</div>
                ) : (
                  recentLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-3 relative group">
                      {idx !== recentLogs.length - 1 && <div className="absolute left-[15px] top-8 bottom-[-12px] w-px bg-border/40 group-hover:bg-primary-200 transition-colors"></div>}
                      <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 flex items-center justify-center flex-shrink-0 text-primary-600 font-bold text-[10px] shadow-sm z-10">{log.user?.name ? log.user.name.charAt(0).toUpperCase() : 'S'}</div>
                      <div className="flex-1 pb-1">
                        <p className="text-[13px] text-slate-800 dark:text-slate-200"><span className="font-semibold text-primary-700 dark:text-primary-400">{log.user?.name || 'System'}</span> <span className="text-slate-500"> {log.action}</span></p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{new Date(log.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sub KPIs for Users */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <StatCard title="Total Admins" value={stats?.totalAdmins || 0} icon={HiOutlineUsers} colorClass="bg-accent-50 text-accent-600" glowClass="hover:shadow-[0_8px_30px_rgba(165,24,58,0.15)]" />
            <StatCard title="New Users (This Month)" value={stats?.newUsersThisMonth || 0} icon={HiOutlineUserPlus} colorClass="bg-info-50 text-info-600 dark:bg-info-900/30 dark:text-info-400" glowClass="hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">User Growth</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">New registrations (Last 30 Days)</p>
                </div>
              </div>
              <div className="h-72">
                {!analytics ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div></div>
                ) : userGrowthData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userGrowthData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }} barSize={36}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                      <XAxis dataKey="_id" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} tickLine={false} axisLine={false} dy={10} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickLine={false} axisLine={false} allowDecimals={false} dx={-10} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="count" name="New Users" fill="#800020" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No data available</div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">User Roles</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Distribution</p>
                </div>
              </div>
              <div className="h-72 flex items-center justify-center">
                {!analytics ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400"><div className="w-8 h-8 border-4 border-accent-200 border-t-accent-600 rounded-full animate-spin mb-4"></div></div>
                ) : analytics.userRoleStats && analytics.userRoleStats.length > 0 ? (
                  <div className="relative w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={analytics.userRoleStats} dataKey="count" nameKey="_id" cx="50%" cy="45%" innerRadius={65} outerRadius={90} paddingAngle={6} cornerRadius={8} stroke="none" activeIndex={activeRoleIdx} activeShape={renderActiveShape} onMouseEnter={(_, index) => setActiveRoleIdx(index)} onMouseLeave={() => setActiveRoleIdx(-1)}>
                          {analytics.userRoleStats.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />)}
                        </Pie>
                        <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={10} formatter={(value) => <span className="text-slate-600 dark:text-slate-400 font-medium ml-1.5 capitalize">{value}</span>} wrapperStyle={{ paddingTop: '24px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{activeRoleIdx !== -1 ? analytics.userRoleStats[activeRoleIdx].count : analytics.userRoleStats.reduce((sum, item) => sum + item.count, 0)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No role data</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Signups</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Quickly manage new users</p>
              </div>
              <Link to="/team" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">View All Users &rarr;</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {recentUsers.length === 0 ? (
                    <tr><td colSpan="4" className="py-6 text-center text-slate-400 text-sm">No recent users found</td></tr>
                  ) : recentUsers.map(user => (
                    <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-surface-tertiary transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center font-bold text-xs">{user.name.charAt(0).toUpperCase()}</div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3"><span className="px-2.5 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded-lg text-xs font-semibold capitalize">{user.role}</span></td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${user.isActive ? 'bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400' : 'bg-danger-50 text-danger-600 dark:bg-danger-900/20 dark:text-danger-400'}`}>
                          {user.isActive ? <HiOutlineCheck className="w-3 h-3" /> : <HiOutlineXMark className="w-3 h-3" />} {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sub KPIs for Projects & Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard title="Pending Tasks" value={stats?.pendingTasks || 0} icon={HiOutlineClock} colorClass="bg-warning-50 text-warning-500" glowClass="hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]" />
            <StatCard title="Completed Tasks" value={stats?.completedTasks || 0} icon={HiOutlineCheckCircle} colorClass="bg-success-50 text-success-500" glowClass="hover:shadow-[0_8px_30px_rgba(34,197,94,0.15)]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Task Activity</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Tasks created (Last 30 Days)</p>
                </div>
              </div>
              <div className="h-72">
                {!analytics ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div></div>
                ) : taskGrowthData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={taskGrowthData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                      <defs>
                        <linearGradient id="colorTask" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A52A44" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#A52A44" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                      <XAxis dataKey="_id" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => new Date(val).toLocaleDateString()} tickLine={false} axisLine={false} dy={10} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickLine={false} axisLine={false} allowDecimals={false} dx={-10} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="count" name="Tasks Created" stroke="#A52A44" strokeWidth={4} fillOpacity={1} fill="url(#colorTask)" activeDot={{ r: 6, strokeWidth: 0, fill: '#800020' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400">No task data available</div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-surface-secondary rounded-xl p-6 shadow-sm border border-border/50">
              <div className="flex justify-between items-center mb-6">
                <div><h3 className="text-base font-bold text-slate-900 dark:text-white">Task Status</h3></div>
              </div>
              <div className="h-72 flex items-center justify-center">
                {!analytics ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div></div>
                ) : analytics.taskStats && analytics.taskStats.length > 0 ? (
                  <div className="relative w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={analytics.taskStats} dataKey="count" nameKey="_id" cx="50%" cy="45%" innerRadius={65} outerRadius={90} paddingAngle={6} cornerRadius={8} stroke="none" activeIndex={activeTaskIdx} activeShape={renderActiveShape} onMouseEnter={(_, index) => setActiveTaskIdx(index)} onMouseLeave={() => setActiveTaskIdx(-1)}>
                          {analytics.taskStats.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={10} formatter={(value) => <span className="text-slate-600 dark:text-slate-400 font-medium ml-1.5 capitalize">{value}</span>} wrapperStyle={{ paddingTop: '24px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{activeTaskIdx !== -1 ? analytics.taskStats[activeTaskIdx].count : analytics.taskStats.reduce((sum, item) => sum + item.count, 0)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400">No task data available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
