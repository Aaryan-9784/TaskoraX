import { useState, useEffect } from 'react';
import api from '../../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { HiOutlineChartBar, HiOutlineUsers, HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi2';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/admin/analytics');
        setData(res.data.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const COLORS = ['#d93b3b', '#6366f1', '#22c55e', '#f59e0b', '#06b6d4'];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">System Analytics</h1>
          <p className="text-sm text-text-secondary mt-1">
            Platform-wide user growth curves, task completion rates, and project performance statistics.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-text-secondary">
          <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2"></div>
          Loading system analytics...
        </div>
      ) : (
        <div className="space-y-8">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-text-primary">User Registration Growth</h2>
                  <p className="text-xs text-text-tertiary mt-0.5">New registered accounts over the past 30 days</p>
                </div>
                <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                  <HiOutlineUsers className="w-5 h-5" />
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.userGrowth || []}>
                    <defs>
                      <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d93b3b" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#d93b3b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="_id" tick={{fontSize: 11, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                    <YAxis tick={{fontSize: 11, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                    <Area type="monotone" dataKey="count" name="New Users" stroke="#d93b3b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorUser)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Task Status Distribution */}
            <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-text-primary">Task Status Distribution</h2>
                  <p className="text-xs text-text-tertiary mt-0.5">Global task breakdown by lifecycle status</p>
                </div>
                <div className="p-2 bg-success-50 rounded-lg text-success-600">
                  <HiOutlineCheckCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="h-72 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.taskStats || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={5}
                      dataKey="count"
                      nameKey="_id"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {(data?.taskStats || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Activity Growth Chart */}
          <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-text-primary">Platform System Activity</h2>
                <p className="text-xs text-text-tertiary mt-0.5">Total operations, audit events, and updates over time</p>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <HiOutlineChartBar className="w-5 h-5" />
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.activityGrowth || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="_id" tick={{fontSize: 11, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                  <YAxis tick={{fontSize: 11, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="count" name="Audit Events" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
