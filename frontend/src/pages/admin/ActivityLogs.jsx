import { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiOutlineDocumentText
} from 'react-icons/hi2';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/activity-logs?limit=50');
      setLogs(res.data?.data?.logs || []);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      toast.error('Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const userName = log.user?.name || 'System';
      const userEmail = log.user?.email || '';
      const action = log.action || '';
      const ip = log.ip || '';

      const matchesSearch =
        !search ||
        userName.toLowerCase().includes(search.toLowerCase()) ||
        userEmail.toLowerCase().includes(search.toLowerCase()) ||
        action.toLowerCase().includes(search.toLowerCase()) ||
        ip.toLowerCase().includes(search.toLowerCase());

      const matchesAction = !actionFilter || action === actionFilter;

      return matchesSearch && matchesAction;
    });
  }, [logs, search, actionFilter]);

  const uniqueActions = useMemo(() => {
    const set = new Set();
    logs.forEach((l) => l.action && set.add(l.action));
    return Array.from(set);
  }, [logs]);

  const getActionBadgeColor = (action = '') => {
    const a = action.toLowerCase();
    if (a.includes('delete')) return 'bg-danger-50 text-danger-700 border-danger-200';
    if (a.includes('create') || a.includes('registration')) return 'bg-success-50 text-success-700 border-success-200';
    if (a.includes('update') || a.includes('status')) return 'bg-primary-50 text-primary-700 border-primary-200';
    if (a.includes('login')) return 'bg-info-50 text-info-700 border-info-200';
    return 'bg-surface-secondary text-text-secondary border-border/60';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">System Activity Logs</h1>
          <p className="text-sm text-text-secondary mt-1">
            Real-time security audit trail, administrative actions, and system event history.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="p-2.5 rounded-xl border border-border/50 hover:bg-surface-secondary text-text-secondary hover:text-text-primary transition-all duration-200 disabled:opacity-50"
            title="Refresh Activity Logs"
          >
            <HiOutlineArrowPath className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search & Action Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary w-5 h-5" />
          <input
            type="text"
            placeholder="Search by user, action, or IP address..."
            className="input-field pl-10 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            className="input-field py-2 px-3 text-sm cursor-pointer w-full sm:w-auto bg-surface-primary"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="">All Action Types</option>
            {uniqueActions.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Activity Logs Table Card */}
      <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary/50 border-b border-border/30">
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Timestamp</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">User</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Action Event</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-text-secondary">
                    <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2"></div>
                    Loading audit trail...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-text-secondary">
                    <HiOutlineDocumentText className="w-10 h-10 text-text-tertiary mx-auto mb-2 opacity-50" />
                    No activity logs recorded matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-surface-secondary/30 transition-colors">
                    <td className="p-4 text-xs font-medium text-text-secondary whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {log.user?.name ? log.user.name.charAt(0).toUpperCase() : <HiOutlineUser className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="font-bold text-text-primary text-xs truncate">{log.user?.name || 'System / Guest'}</p>
                          {log.user?.email && <p className="text-[10px] text-text-tertiary truncate">{log.user.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${getActionBadgeColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-mono text-text-tertiary">
                      {log.ip || '127.0.0.1'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
