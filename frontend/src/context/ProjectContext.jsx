import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const res = await api.get('/projects');
      setProjects(res.data.data.projects);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (projectData) => {
    try {
      const res = await api.post('/projects', projectData);
      setProjects((prev) => [...prev, res.data.data.project]);
      toast.success('Project created successfully');
      return res.data.data.project;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
      throw error;
    }
  };

  const updateProject = async (id, updates) => {
    try {
      const res = await api.put(`/projects/${id}`, updates);
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? res.data.data.project : p))
      );
      toast.success('Project updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update project');
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success('Project deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete project');
    }
  };

  const value = {
    projects,
    loading,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within ProjectProvider');
  return context;
};
