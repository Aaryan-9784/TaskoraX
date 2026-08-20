import { useState, useEffect } from 'react';
import api from '../../services/api';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/admin/tasks');
        setTasks(res.data.data.tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Task Management</h1>
        <p className="text-text-secondary mt-1">Overview of all system tasks</p>
      </div>

      <div className="bg-white/40 dark:bg-surface-secondary/20 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary/50 border-b border-border/30">
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Title</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Priority</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Creator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                <tr><td colSpan="4" className="p-8 text-center text-text-secondary">Loading tasks...</td></tr>
              ) : tasks.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-text-secondary">No tasks found.</td></tr>
              ) : (
                tasks.map(task => (
                  <tr key={task._id} className="hover:bg-surface-secondary/30 transition-colors">
                    <td className="p-4 font-semibold text-text-primary">{task.title}</td>
                    <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-bold bg-surface-secondary text-text-secondary">{task.status}</span></td>
                    <td className="p-4">{task.priority}</td>
                    <td className="p-4">{task.createdBy?.name || 'Unknown'}</td>
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

export default TaskManagement;
