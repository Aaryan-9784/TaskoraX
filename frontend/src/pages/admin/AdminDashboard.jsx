import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineUsers,
  HiOutlineFolderOpen,
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlinePlus,
  HiOutlineDocumentText,
  HiOutlineCog,
  HiExclamationCircle,
  HiArrowPath
} from 'react-icons/hi2';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import api from '../../services/api';
import StatCard from '../../components/dashboard/StatCard';

const glassCardClasses = 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden';

const SkeletonLoader = () => (
  <div className="space-y-6 p-6 animate-pulse">
    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/4 mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
  >
    <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
      <HiExclamationCircle className="w-10 h-10 text-red-500" />
    </div>
    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Failed to load dashboard</h2>
    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">{message}</p>
    <button
      onClick={onRetry}
      className="flex items-center gap-2 px-6 py-3 bg-[#800000] hover:bg-[#a31a1a] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#800000]/20 hover:shadow-[#800000]/40"
    >
      <HiArrowPath className="w-5 h-5" /> Retry Connection
    </button>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-xl">
        <p className="text-sm font-bold text-slate-800 dark:text-white mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    activeUsers: 0
  });
  const [analytics, setAnalytics] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, analyticsRes, logsRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/analytics'),
        api.get('/admin/activity-logs?limit=8')
      ]);

      const data = statsRes.data?.data?.stats || {};
      setStats({
        totalUsers: data.totalUsers || 0,
        totalProjects: data.totalProjects || 0,
        totalTasks: data.totalTasks || 0,
        completedTasks: data.completedTasks || 0,
        pendingTasks: data.pendingTasks || 0,
        activeUsers: data.activeUsers || 0
      });

      setAnalytics(analyticsRes.data?.data || {});
      setRecentLogs(logsRes.data?.data?.logs || []);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(err.response?.data?.message || 'An unexpected error occurred while fetching dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} onRetry={fetchDashboardData} />;

  const userGrowthData = analytics?.userGrowth || [];
  const taskGrowthData = analytics?.taskGrowth || [];
  const projectStats = analytics?.projectStats || [];

  const generateSparkline = (trend, base) => {
    return Array.from({ length: 7 }).map((_, i) => ({
      value: Math.max(10, Math.floor(Math.random() * base) + (trend > 0 ? i * 2 : (7 - i) * 2))
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="animate-in animate-in-delay-1"
      >
        <div className="card-premium overflow-hidden p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">Admin Dashboard</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Admin hub with dashboard-grade layout
              </h1>
              <p className="max-w-2xl text-sm md:text-base text-slate-500 dark:text-slate-400">
                Keep the admin experience aligned with the main dashboard using consistent cards, grids, and theme styling.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 w-full">
              <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 text-center">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Users</p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{stats.totalUsers}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 text-center">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Projects</p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{stats.totalProjects}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 text-center">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Tasks</p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{stats.totalTasks}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-in animate-in-delay-2">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={HiOutlineUsers}
          color="primary"
          trend={12}
          sparklineData={generateSparkline(12, 30)}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={HiOutlineUserGroup}
          color="accent"
          trend={8}
          sparklineData={generateSparkline(8, 25)}
        />
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={HiOutlineFolderOpen}
          color="success"
          trend={22}
          sparklineData={generateSparkline(22, 35)}
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon={HiOutlineCheckCircle}
          color="success"
          trend={18}
          sparklineData={generateSparkline(18, 40)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in animate-in-delay-3 items-start">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className={glassCardClasses}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 p-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Growth Overview</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track growth and engagement across your organization.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Admin analytics
              </div>
            </div>
            <div className="h-[320px] px-6 pb-6">
              {userGrowthData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="adminUserGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#800020" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#800020" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      name="New Users"
                      stroke="#800020"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#adminUserGradient)"
                      activeDot={{ r: 6, fill: '#800020' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">No growth chart data available</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={glassCardClasses}>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Task Performance</h3>
                <div className="h-[250px]">
                  {taskGrowthData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={taskGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                        <Bar dataKey="count" name="Tasks Created" fill="#800020" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">No task analytics available</div>
                  )}
                </div>
              </div>
            </div>

            <div className={glassCardClasses}>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Project Progress</h3>
                <div className="h-[250px]">
                  {projectStats.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={projectStats} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="count" name="Projects" stroke="#800020" strokeWidth={3} dot={{ fill: '#800020', r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">No project data available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className={glassCardClasses}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quick Actions</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Shortcuts for common admin workflows.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/admin/users" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:bg-[#800000]/5 transition-all text-slate-700 dark:text-slate-200">
                  <HiOutlinePlus className="w-5 h-5" />
                  <span className="text-xs font-semibold">Add User</span>
                </Link>
                <Link to="/admin/projects" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:bg-[#800000]/5 transition-all text-slate-700 dark:text-slate-200">
                  <HiOutlineFolderOpen className="w-5 h-5" />
                  <span className="text-xs font-semibold">Create Project</span>
                </Link>
                <Link to="/admin/activity-logs" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:bg-[#800000]/5 transition-all text-slate-700 dark:text-slate-200">
                  <HiOutlineDocumentText className="w-5 h-5" />
                  <span className="text-xs font-semibold">View Logs</span>
                </Link>
                <Link to="/admin/users" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:bg-[#800000]/5 transition-all text-slate-700 dark:text-slate-200">
                  <HiOutlineCog className="w-5 h-5" />
                  <span className="text-xs font-semibold">Manage Users</span>
                </Link>
              </div>
            </div>
          </div>

          <div className={glassCardClasses}>
            <div className="p-6 flex flex-col h-[520px]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Latest admin actions and system events.</p>
                </div>
                <Link to="/admin/activity-logs" className="text-sm font-semibold text-[#800000] hover:underline">View All</Link>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                {recentLogs.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium">No recent activities</div>
                ) : (
                  recentLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#800000] ring-4 ring-[#800000]/20 mt-1.5"></div>
                        {idx !== recentLogs.length - 1 && <div className="w-px h-full bg-slate-200 dark:bg-slate-700 mt-2"></div>}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                          <span className="font-bold text-slate-900 dark:text-white mr-1">{log.user?.name || 'System'}</span>
                          {log.action}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">
                          {new Date(log.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
