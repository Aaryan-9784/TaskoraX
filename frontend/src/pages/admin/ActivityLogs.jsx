import { useState, useEffect } from 'react';
import api from '../../services/api';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/admin/activity-logs');
        setLogs(res.data.data.logs);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">System Activity Logs</h1>
        <p className="text-text-secondary mt-1">Audit trail of all system activities</p>
      </div>

      <div className="bg-white/40 dark:bg-surface-secondary/20 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary/50 border-b border-border/30">
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Timestamp</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">User</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Action</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                <tr><td colSpan="4" className="p-8 text-center text-text-secondary">Loading logs...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-text-secondary">No logs found.</td></tr>
              ) : (
                logs.map(log => (
                  <tr key={log._id} className="hover:bg-surface-secondary/30 transition-colors">
                    <td className="p-4 text-sm text-text-secondary">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="p-4 font-semibold text-text-primary">{log.user?.name || 'Unknown'}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-info-50 text-info-600">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-text-secondary">{log.ip || 'N/A'}</td>
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
