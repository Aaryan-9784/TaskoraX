import { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineUsers, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white/40 dark:bg-surface-secondary/20 backdrop-blur-md border border-border/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-text-primary group-hover:scale-105 transition-transform origin-left">{value}</h3>
      </div>
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon className="w-8 h-8" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/dashboard`, { withCredentials: true });
        setStats(res.data.data.stats);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Admin Dashboard</h1>
          <p className="text-text-secondary mt-1">Platform overview and quick metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={HiOutlineUsers} colorClass="bg-primary-50 text-primary-600" />
        <StatCard title="Active Users" value={stats?.activeUsers || 0} icon={HiOutlineCheckCircle} colorClass="bg-success-50 text-success-600" />
        <StatCard title="Total Admins" value={stats?.totalAdmins || 0} icon={HiOutlineUsers} colorClass="bg-accent-50 text-accent-600" />
        <StatCard title="New Users (Month)" value={stats?.newUsersThisMonth || 0} icon={HiOutlineUsers} colorClass="bg-info-50 text-info-600 dark:bg-info-900/30 dark:text-info-400" />
        
        <StatCard title="Total Projects" value={stats?.totalProjects || 0} icon={HiOutlineClipboardDocumentList} colorClass="bg-primary-50 text-primary-600" />
        <StatCard title="Total Tasks" value={stats?.totalTasks || 0} icon={HiOutlineClipboardDocumentList} colorClass="bg-primary-50 text-primary-600" />
        <StatCard title="Completed Tasks" value={stats?.completedTasks || 0} icon={HiOutlineCheckCircle} colorClass="bg-success-50 text-success-600" />
        <StatCard title="Pending Tasks" value={stats?.pendingTasks || 0} icon={HiOutlineClipboardDocumentList} colorClass="bg-warning-50 text-warning-600" />
        <StatCard title="Overdue Tasks" value={stats?.overdueTasks || 0} icon={HiOutlineExclamationCircle} colorClass="bg-danger-50 text-danger-600" />
      </div>

      <div className="mt-8 bg-white/40 dark:bg-surface-secondary/20 backdrop-blur-md border border-border/30 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 text-text-primary">Quick Navigation</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/users" className="px-5 py-2.5 bg-primary-600 text-white font-medium rounded-xl shadow-sm hover:bg-primary-700 hover:-translate-y-0.5 transition-all">
            Manage Users
          </Link>
          <Link to="/admin/projects" className="px-5 py-2.5 bg-surface-secondary text-text-primary font-medium rounded-xl shadow-sm hover:bg-surface-tertiary border border-border/50 hover:-translate-y-0.5 transition-all">
            Manage Projects
          </Link>
          <Link to="/admin/tasks" className="px-5 py-2.5 bg-surface-secondary text-text-primary font-medium rounded-xl shadow-sm hover:bg-surface-tertiary border border-border/50 hover:-translate-y-0.5 transition-all">
            Manage Tasks
          </Link>
          <Link to="/admin/analytics" className="px-5 py-2.5 bg-surface-secondary text-text-primary font-medium rounded-xl shadow-sm hover:bg-surface-tertiary border border-border/50 hover:-translate-y-0.5 transition-all">
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
