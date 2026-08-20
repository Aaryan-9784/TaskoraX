import { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import {
  HiOutlineFolderOpen,
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineClock
} from 'react-icons/hi2';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Delete modal state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/projects');
      setProjects(res.data?.data?.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const metrics = useMemo(() => {
    return {
      total: projects.length,
      active: projects.filter((p) => p.status === 'Active').length,
      planning: projects.filter((p) => p.status === 'Planning').length,
      completed: projects.filter((p) => p.status === 'Completed').length,
    };
  }, [projects]);

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    try {
      await api.delete(`/admin/projects/${projectToDelete._id || projectToDelete.id}`);
      toast.success('Project removed successfully');
      setProjects((prev) => prev.filter((p) => (p._id || p.id) !== (projectToDelete._id || projectToDelete.id)));
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error(error.response?.data?.message || 'Failed to delete project');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Project Management</h1>
          <p className="text-sm text-text-secondary mt-1">
            Global overview, progress tracking, and administrative control over all workspace projects.
          </p>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-primary-50 rounded-xl text-primary-600">
            <HiOutlineBriefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Total Projects</p>
            <p className="text-xl font-bold text-text-primary">{metrics.total}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-success-50 rounded-xl text-success-600">
            <HiOutlineFolderOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Active</p>
            <p className="text-xl font-bold text-text-primary">{metrics.active}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-warning-50 rounded-xl text-warning-600">
            <HiOutlineClock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Planning</p>
            <p className="text-xl font-bold text-text-primary">{metrics.planning}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-accent-50 rounded-xl text-accent-600">
            <HiOutlineCheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Completed</p>
            <p className="text-xl font-bold text-text-primary">{metrics.completed}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects by name..."
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
            <option value="Active">Active</option>
            <option value="Planning">Planning</option>
            <option value="On Hold">On Hold</option>
            <option value="At Risk">At Risk</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Projects Table Card */}
      <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl overflow-hidden shadow-sm">
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
                <tr>
                  <td colSpan="6" className="p-12 text-center text-text-secondary">
                    <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2"></div>
                    Loading project records...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-text-secondary">
                    <HiOutlineFolderOpen className="w-10 h-10 text-text-tertiary mx-auto mb-2 opacity-50" />
                    No projects found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project._id || project.id} className="hover:bg-surface-secondary/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${project.coverColor || 'bg-primary-500'}`} />
                        <div>
                          <p className="font-bold text-text-primary text-sm">{project.name}</p>
                          {project.description && (
                            <p className="text-xs text-text-tertiary truncate max-w-xs">{project.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-surface-secondary text-text-secondary border border-border/60">
                        {project.status || 'Planning'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold ${
                        project.priority === 'High' ? 'text-danger-600' : project.priority === 'Medium' ? 'text-warning-600' : 'text-success-600'
                      }`}>
                        {project.priority || 'Medium'}
                      </span>
                    </td>
                    <td className="p-4 min-w-[140px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-text-secondary">
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-surface-secondary rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-primary-500 h-full rounded-full transition-all"
                            style={{ width: `${project.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-medium text-text-secondary">
                      {project.owner?.name || 'Workspace'}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setProjectToDelete(project);
                          setDeleteConfirmOpen(true);
                        }}
                        className="p-2 text-text-tertiary hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
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

      {/* Delete Confirm Modal */}
      <Modal isOpen={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} title="Confirm Project Deletion">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Are you sure you want to permanently delete the project <strong className="text-text-primary">{projectToDelete?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-4">
            <Button variant="secondary" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteProject} className="bg-danger-500 hover:bg-danger-600 text-white border-transparent">
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectManagement;
