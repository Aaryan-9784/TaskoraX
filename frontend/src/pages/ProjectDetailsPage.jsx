import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineCog6Tooth, HiOutlineTrash, HiOutlineArchiveBox } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import ProjectWorkspaceTabs from '../components/projects/workspace/ProjectWorkspaceTabs';
import OverviewTab from '../components/projects/workspace/tabs/OverviewTab';
import TasksTab from '../components/projects/workspace/tabs/TasksTab';
import TeamTab from '../components/projects/workspace/tabs/TeamTab';
import TimelineTab from '../components/projects/workspace/tabs/TimelineTab';
import FilesTab from '../components/projects/workspace/tabs/FilesTab';
import ActivityTab from '../components/projects/workspace/tabs/ActivityTab';
import ProjectRightSidebar from '../components/projects/workspace/ProjectRightSidebar';
import { mockProjects } from '../utils/mockProjects';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [project, setProject] = useState(null);
  
  // Settings Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('taskora_projects');
    const allProjects = saved ? JSON.parse(saved) : mockProjects;
    
    // Also check archived projects just in case
    const savedArchived = localStorage.getItem('taskora_archived_projects');
    const archivedProjects = savedArchived ? JSON.parse(savedArchived) : [
      { id: 'proj-arc-1', name: 'Legacy Dashboard UI', date: '2025-11-20', status: 'Archived', progress: 100, coverColor: 'bg-surface-tertiary', team: [], tasks: { total: 0, completed: 0 } }
    ];

    let found = allProjects.find((p) => p.id === id);
    if (!found) {
      found = archivedProjects.find((p) => p.id === id);
      if (found && !found.tasks) {
        found = { ...found, status: 'Archived', progress: 100, coverColor: 'bg-surface-tertiary', team: [], tasks: { total: 0, completed: 0 }, description: 'Archived project.' };
      }
    }
    setProject(found);
    if (found) {
      setEditName(found.name || '');
      setEditDesc(found.description || '');
      setEditStatus(found.status || 'Active');
      setEditPriority(found.priority || 'Medium');
      setEditDueDate(found.dueDate || '');
    }
  }, [id]);

  const handleUpdateProject = (updatedProject) => {
    setProject(updatedProject);
    
    // Save to local storage
    const saved = localStorage.getItem('taskora_projects');
    const allProjects = saved ? JSON.parse(saved) : mockProjects;
    
    if (allProjects.some(p => p.id === updatedProject.id)) {
      const newProjects = allProjects.map(p => p.id === updatedProject.id ? updatedProject : p);
      localStorage.setItem('taskora_projects', JSON.stringify(newProjects));
    } else {
      const savedArchived = localStorage.getItem('taskora_archived_projects');
      const archivedProjects = savedArchived ? JSON.parse(savedArchived) : [];
      if (archivedProjects.some(p => p.id === updatedProject.id)) {
        const newArchived = archivedProjects.map(p => p.id === updatedProject.id ? updatedProject : p);
        localStorage.setItem('taskora_archived_projects', JSON.stringify(newArchived));
      }
    }
  };

  const handleSaveSettings = () => {
    if (!editName.trim()) {
      toast.error('Project name is required');
      return;
    }
    handleUpdateProject({ 
      ...project, 
      name: editName, 
      description: editDesc,
      status: editStatus,
      priority: editPriority,
      dueDate: editDueDate
    });
    toast.success('Project settings updated');
    setIsSettingsOpen(false);
  };

  const handleDeleteProject = () => {
    const saved = localStorage.getItem('taskora_projects');
    const allProjects = saved ? JSON.parse(saved) : mockProjects;
    localStorage.setItem('taskora_projects', JSON.stringify(allProjects.filter(p => p.id !== project.id)));
    toast.success('Project deleted');
    navigate('/projects');
  };

  const handleArchiveProject = () => {
    const saved = localStorage.getItem('taskora_projects');
    const allProjects = saved ? JSON.parse(saved) : mockProjects;
    localStorage.setItem('taskora_projects', JSON.stringify(allProjects.filter(p => p.id !== project.id)));
    
    const savedArchived = localStorage.getItem('taskora_archived_projects');
    const archivedProjects = savedArchived ? JSON.parse(savedArchived) : [];
    localStorage.setItem('taskora_archived_projects', JSON.stringify([{ ...project, status: 'Archived', date: new Date().toISOString().split('T')[0] }, ...archivedProjects]));
    
    toast.success('Project archived');
    navigate('/projects');
  };

  if (!project) return null; // Or a loading spinner

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] -m-6 animate-fade-in">
      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface-primary">
        {/* Workspace Header */}
        <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/projects')}
              className="p-2 text-text-tertiary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
            >
              <HiOutlineArrowLeft className="h-5 w-5" />
            </button>
            <div className={`w-3 h-3 rounded-full ${project.coverColor}`} />
            <div>
              <h1 className="text-xl font-bold text-text-primary leading-tight">{project.name}</h1>
              <span className="text-xs text-text-secondary font-medium">{project.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" icon={HiOutlineCog6Tooth} onClick={() => setIsSettingsOpen(true)}>Settings</Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <ProjectWorkspaceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-surface-secondary/20">
          {activeTab === 'overview' && <OverviewTab project={project} />}
          {activeTab === 'tasks' && <TasksTab project={project} onUpdateProject={handleUpdateProject} />}
          {activeTab === 'team' && <TeamTab project={project} onUpdateProject={handleUpdateProject} />}
          {activeTab === 'timeline' && <TimelineTab project={project} />}
          {activeTab === 'files' && <FilesTab project={project} onUpdateProject={handleUpdateProject} />}
          {activeTab === 'activity' && <ActivityTab project={project} />}
        </div>
      </div>

      {/* Right Sidebar */}
      <ProjectRightSidebar project={project} />

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Project Settings" size="md">
        <div className="space-y-5">
          <Input 
            label="Project Name" 
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Input 
            label="Description" 
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-primary">Status</label>
              <div className="relative">
                <select 
                  className="input-field appearance-none cursor-pointer"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="Planning">Planning</option>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-primary">Priority</label>
              <div className="relative">
                <select 
                  className="input-field appearance-none cursor-pointer"
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-primary">Due Date</label>
            <div className="relative">
              <input 
                type="date" 
                className="input-field w-full cursor-pointer"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border/40">
            <label className="block text-sm font-medium text-text-primary mb-3">Danger Zone</label>
            <div className="flex gap-3">
              <Button variant="secondary" icon={HiOutlineArchiveBox} onClick={handleArchiveProject} className="flex-1 text-warning-500 hover:bg-warning-500/10 hover:border-warning-500/30 border-warning-500/20">Archive Project</Button>
              <Button variant="secondary" icon={HiOutlineTrash} onClick={handleDeleteProject} className="flex-1 text-danger-500 hover:bg-danger-500/10 hover:border-danger-500/30 border-danger-500/20">Delete Project</Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-6">
            <Button variant="secondary" onClick={() => setIsSettingsOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetailsPage;
