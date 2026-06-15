import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters & Pagination state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    inProgress: 0,
  });

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 9); // 9 items per page fits nicely in 3 columns
      
      if (search) params.append('search', search);
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (priorityFilter !== 'All') params.append('priority', priorityFilter);
      
      if (sortBy === 'dueDate') params.append('sort', 'dueDate');
      else if (sortBy === 'newest') params.append('sort', '-createdAt');
      else if (sortBy === 'priority') params.append('sort', '-priority');

      const { data } = await api.get(`/tasks?${params.toString()}`);
      setTasks(data.data.tasks);
      setTotalPages(data.pagination.totalPages);
      setTotalCount(data.pagination.totalTasks);

      fetchStats();
      
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, search, statusFilter, priorityFilter, sortBy, currentPage]);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/tasks?limit=1000'); // simple hack for stats
      const fetchedAllTasks = data.data.tasks || [];
      setAllTasks(fetchedAllTasks);
      
      const now = new Date();
      
      setStats({
        total: fetchedAllTasks.length,
        completed: fetchedAllTasks.filter(t => t.status === 'Done').length,
        inProgress: fetchedAllTasks.filter(t => t.status === 'In Progress').length,
        pending: fetchedAllTasks.filter(t => t.status === 'Todo').length,
        overdue: fetchedAllTasks.filter(t => t.dueDate && new Date(t.dueDate) < now && t.status !== 'Done').length,
      });
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      await api.post('/tasks', taskData);
      
      // Reset filters and sort by newest to ensure the new task is immediately visible
      setSearch('');
      setStatusFilter('All');
      setPriorityFilter('All');
      setSortBy('newest');
      setCurrentPage(1);
      
      // Fetch tasks again to reflect the newly added task from the server
      fetchTasks();
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add task');
    }
  };

  const updateTask = async (id, updates) => {
    try {
      await api.put(`/tasks/${id}`, updates);
      fetchTasks();
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      // If we delete the last item on a page, we might need to go back a page
      if (tasks.length === 1 && currentPage > 1) {
        setCurrentPage(p => p - 1);
      } else {
        fetchTasks();
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Done' ? 'Todo' : 'Done';
    await updateTask(id, { status: newStatus });
  };

  const value = {
    tasks, // These are already paginated and filtered by the backend
    allTasks, // All tasks for calendar and stats
    loading,
    stats,
    // Filter controls
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    // Pagination controls
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount,
    // Actions
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    refreshTasks: fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
