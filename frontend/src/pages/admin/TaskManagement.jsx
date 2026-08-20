import { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineArrowPath
} from 'react-icons/hi2';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Delete Confirm State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/tasks');
      setTasks(res.data?.data?.tasks || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = !search || task.title?.toLowerCase().includes(search.toLowerCase()) || task.description?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const metrics = useMemo(() => {
    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === 'Todo').length,
      inProgress: tasks.filter((t) => t.status === 'In Progress').length,
      completed: tasks.filter((t) => t.status === 'Done' || t.status === 'Completed').length,
    };
  }, [tasks]);

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      await api.delete(`/admin/tasks/${taskToDelete._id || taskToDelete.id}`);
      toast.success('Task removed successfully');
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== (taskToDelete._id || taskToDelete.id)));
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error(error.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Task Management</h1>
          <p className="text-sm text-text-secondary mt-1">
            Global oversight and administrative control of all tasks across workspaces.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchTasks}
            disabled={loading}
            className="p-2.5 rounded-xl border border-border/50 hover:bg-surface-secondary text-text-secondary hover:text-text-primary transition-all duration-200 disabled:opacity-50"
            title="Refresh Tasks"
          >
            <HiOutlineArrowPath className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-primary-50 rounded-xl text-primary-600">
            <HiOutlineClipboardDocumentList className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Total Tasks</p>
            <p className="text-xl font-bold text-text-primary">{metrics.total}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-warning-50 rounded-xl text-warning-600">
            <HiOutlineClock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">To Do</p>
            <p className="text-xl font-bold text-text-primary">{metrics.todo}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
            <HiOutlineClock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">In Progress</p>
            <p className="text-xl font-bold text-text-primary">{metrics.inProgress}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-success-50 rounded-xl text-success-600">
            <HiOutlineCheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Completed</p>
            <p className="text-xl font-bold text-text-primary">{metrics.completed}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            className="input-field pl-10 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            className="input-field py-2 px-3 text-sm cursor-pointer w-full sm:w-auto bg-surface-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Todo">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Completed</option>
          </select>
        </div>
      </div>

      {/* Tasks Table Card */}
      <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary/50 border-b border-border/30">
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Task Title</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Priority</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Creator</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-text-secondary">
                    <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2"></div>
                    Loading tasks...
                  </td>
                </tr>
              ) : filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-text-secondary">
                    <HiOutlineClipboardDocumentList className="w-10 h-10 text-text-tertiary mx-auto mb-2 opacity-50" />
                    No tasks found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task._id || task.id} className="hover:bg-surface-secondary/30 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-bold text-text-primary text-sm">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-text-tertiary truncate max-w-xs">{task.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${
                        task.status === 'Done' || task.status === 'Completed'
                          ? 'bg-success-50 text-success-700 border-success-200'
                          : task.status === 'In Progress'
                          ? 'bg-primary-50 text-primary-700 border-primary-200'
                          : 'bg-surface-secondary text-text-secondary border-border/60'
                      }`}>
                        {task.status || 'Todo'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold ${
                        task.priority === 'High' ? 'text-danger-600' : task.priority === 'Medium' ? 'text-warning-600' : 'text-success-600'
                      }`}>
                        {task.priority || 'Medium'}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-medium text-text-secondary">
                      {task.createdBy?.name || 'Workspace User'}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setTaskToDelete(task);
                          setDeleteConfirmOpen(true);
                        }}
                        className="p-2 text-text-tertiary hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                        title="Delete Task"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      <Modal isOpen={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} title="Confirm Task Deletion">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Are you sure you want to permanently delete the task <strong className="text-text-primary">{taskToDelete?.title}</strong>?
          </p>
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-4">
            <Button variant="secondary" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteTask} className="bg-danger-500 hover:bg-danger-600 text-white border-transparent">
              Delete Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskManagement;
