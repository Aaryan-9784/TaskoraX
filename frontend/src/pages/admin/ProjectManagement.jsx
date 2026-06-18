import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { HiOutlineFolderOpen, HiOutlineTrash } from 'react-icons/hi2';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/projects`, { withCredentials: true });
      setProjects(res.data.data.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this project?')) return;
    
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/projects/${id}`, { withCredentials: true });
      toast.success('Project deleted successfully');
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Project Management</h1>
        <p className="text-text-secondary mt-1">Overview of all system projects</p>
      </div>

      <div className="bg-white/40 dark:bg-surface-secondary/20 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary/50 border-b border-border/30">
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Project Name</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Priority</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Progress</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Owner</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-text-secondary">Loading projects...</td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-text-secondary">No projects found.</td></tr>
              ) : (
                projects.map(project => (
                  <tr key={project._id} className="hover:bg-surface-secondary/30 transition-colors">
                    <td className="p-4 font-semibold text-text-primary flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${project.coverColor || 'bg-primary-500'}`} />
                      {project.name}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-surface-secondary text-text-secondary">
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4">{project.priority}</td>
                    <td className="p-4 font-medium text-text-secondary">{project.progress}%</td>
                    <td className="p-4">{project.owner?.name || 'Unknown'}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDeleteProject(project._id)}
                        className="p-1.5 text-danger-500 hover:bg-danger-50 rounded-lg transition-colors"
                        title="Delete Project"
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
    </div>
  );
};

export default ProjectManagement;
