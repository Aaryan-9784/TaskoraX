import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineUsers, 
  HiOutlineFolderOpen, 
  HiOutlineClipboardDocumentList, 
  HiOutlineCheckCircle, 
  HiOutlineClock, 
  HiOutlineUserGroup,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiOutlinePlus,
  HiOutlineDocumentText,
  HiOutlineCog,
  HiExclamationCircle,
  HiArrowPath
} from 'react-icons/hi2';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line
} from 'recharts';
import api from '../../services/api';

// --- Theming & Styling Constants ---
const THEME = {
  maroon: '#800000',
  maroonLight: '#a31a1a',
  maroonDark: '#5c0000',
  white: '#ffffff',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate500: '#64748b',
  slate800: '#1e293b',
};

const glassCardClasses = "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden";

// --- Components ---

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
      className="flex items-center gap-2 px-6 py-3 bg-[#800000] hover:bg-[#a31a1a] text-white font-semibold rounded-xl transition-all shadow-lg shadow-maroon/20 hover:shadow-maroon/40"
    >
      <HiArrowPath className="w-5 h-5" /> Retry Connection
    </button>
  </motion.div>
);

const StatCard = ({ title, value, icon: Icon, trend, trendValue, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={`${glassCardClasses} p-6 relative group hover:-translate-y-1 transition-all duration-300`}
  >
    <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#800000]/5 rounded-full blur-2xl group-hover:bg-[#800000]/10 transition-colors"></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="p-3 rounded-xl bg-[#800000]/10 text-[#800000] dark:bg-[#800000]/20 dark:text-[#ff9999]">
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full ${trend === 'up' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400' : 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'}`}>
        {trend === 'up' ? <HiArrowTrendingUp className="w-4 h-4" /> : <HiArrowTrendingDown className="w-4 h-4" />}
        {trendValue}%
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-1 tracking-tight">{value}</h3>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
    </div>
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

// --- Main Page Component ---
const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0, totalProjects: 0, totalTasks: 0,
    completedTasks: 0, pendingTasks: 0, activeUsers: 0
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
      console.error("Dashboard fetch error:", err);
      setError(err.response?.data?.message || "An unexpected error occurred while fetching dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} onRetry={fetchDashboardData} />;

  // Prepare chart data
  const userGrowthData = analytics?.userGrowth || [];
  const taskGrowthData = analytics?.taskGrowth || [];
  const projectStats = analytics?.projectStats || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Welcome back to the admin center. Here's what's happening.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard delay={0.1} title="Total Users" value={stats.totalUsers} icon={HiOutlineUsers} trend="up" trendValue="12.5" />
        <StatCard delay={0.2} title="Active Users" value={stats.activeUsers} icon={HiOutlineUserGroup} trend="up" trendValue="8.2" />
        <StatCard delay={0.3} title="Total Projects" value={stats.totalProjects} icon={HiOutlineFolderOpen} trend="up" trendValue="24.0" />
        <StatCard delay={0.4} title="Total Tasks" value={stats.totalTasks} icon={HiOutlineClipboardDocumentList} trend="up" trendValue="15.3" />
        <StatCard delay={0.5} title="Completed Tasks" value={stats.completedTasks} icon={HiOutlineCheckCircle} trend="up" trendValue="18.7" />
        <StatCard delay={0.6} title="Pending Tasks" value={stats.pendingTasks} icon={HiOutlineClock} trend="down" trendValue="4.1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* User Growth Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className={`${glassCardClasses} p-6`}
          >
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">User Growth Overview</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={THEME.maroon} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={THEME.maroon} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="count" name="New Users" stroke={THEME.maroon} strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" activeDot={{ r: 6, fill: THEME.maroon }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Task & Project Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className={`${glassCardClasses} p-6`}
            >
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Tasks Overview</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                    <Bar dataKey="count" name="Tasks Created" fill={THEME.maroon} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className={`${glassCardClasses} p-6`}
            >
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Project Progress</h3>
              <div className="h-[250px] flex items-center justify-center">
                {projectStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectStats} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="count" name="Projects" stroke={THEME.maroon} strokeWidth={3} dot={{ fill: THEME.maroon, r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-slate-400 text-sm font-medium">No project data available</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className={`${glassCardClasses} p-6`}
          >
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/users" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-[#800000]/5 hover:border-[#800000]/20 hover:text-[#800000] transition-all text-slate-600 dark:text-slate-300">
                <HiOutlinePlus className="w-6 h-6" />
                <span className="text-xs font-bold">Add User</span>
              </Link>
              <Link to="/admin/projects" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-[#800000]/5 hover:border-[#800000]/20 hover:text-[#800000] transition-all text-slate-600 dark:text-slate-300">
                <HiOutlineFolderOpen className="w-6 h-6" />
                <span className="text-xs font-bold">Create Project</span>
              </Link>
              <Link to="/admin/activity-logs" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-[#800000]/5 hover:border-[#800000]/20 hover:text-[#800000] transition-all text-slate-600 dark:text-slate-300">
                <HiOutlineDocumentText className="w-6 h-6" />
                <span className="text-xs font-bold">View Logs</span>
              </Link>
              <Link to="/admin/users" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-[#800000]/5 hover:border-[#800000]/20 hover:text-[#800000] transition-all text-slate-600 dark:text-slate-300">
                <HiOutlineCog className="w-6 h-6" />
                <span className="text-xs font-bold">Manage Users</span>
              </Link>
            </div>
          </motion.div>

          {/* Recent Activity Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className={`${glassCardClasses} p-6 flex flex-col h-[520px]`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Activity</h3>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
