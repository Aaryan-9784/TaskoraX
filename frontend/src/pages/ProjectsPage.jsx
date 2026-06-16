import { useState, useMemo, useEffect } from 'react';
import ProjectsHeader from '../components/projects/ProjectsHeader';
import ProjectOverviewCards from '../components/projects/ProjectOverviewCards';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import EmptyProjectsState from '../components/projects/EmptyProjectsState';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';
import { mockProjects, projectMetrics } from '../utils/mockProjects';

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('taskora_projects');
    const parsed = saved ? JSON.parse(saved) : mockProjects;
    
    // Backfill tasksList for projects that have tasks.total but no tasksList
    return parsed.map(p => {
      if (!p.tasksList && p.tasks && p.tasks.total > 0) {
        const list = [];
        for (let i = 0; i < p.tasks.total; i++) {
          list.push({
            id: `mock-task-${p.id}-${i}`,
            name: `Project Task ${i + 1}`,
            status: i < p.tasks.completed ? 'Done' : 'Todo'
          });
        }
        return { ...p, tasksList: list };
      }
      return p;
    });
  });

  const [activeModal, setActiveModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectName, setEditProjectName] = useState('');
  const [editProjectDescription, setEditProjectDescription] = useState('');
  const [archivedProjects, setArchivedProjects] = useState(() => {
    const saved = localStorage.getItem('taskora_archived_projects');
    return saved ? JSON.parse(saved) : [
      { id: 'proj-arc-1', name: 'Legacy Dashboard UI', date: '2025-11-20' },
      { id: 'proj-arc-2', name: 'Old Marketing Site', date: '2025-08-14' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('taskora_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('taskora_archived_projects', JSON.stringify(archivedProjects));
  }, [archivedProjects]);
  
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedFile(null);
    setNewProjectName('');
    setNewProjectDescription('');
    setEditingProjectId(null);
    setEditProjectName('');
    setEditProjectDescription('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!newProjectName) {
        setNewProjectName(file.name.split('.')[0]);
      }
    }
  };


  const handleRestore = (id) => {
    const projectToRestore = archivedProjects.find(p => p.id === id);
    if (projectToRestore) {
      setArchivedProjects(prev => prev.filter(p => p.id !== id));
      
      const restoredProject = {
        id: projectToRestore.id,
        name: projectToRestore.name,
        description: 'Restored from archive',
        status: 'Active',
        progress: 0,
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'Medium',
        coverColor: 'bg-primary-500',
        team: [],
        tasks: { total: 0, completed: 0 },
        tasksList: []
      };
      
      setProjects([restoredProject, ...projects]);
      toast.success('Project restored successfully');
    }
  };

  const handleDeleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast.success('Project deleted permanently');
  };

  const handleArchiveProject = (project) => {
    setProjects(prev => prev.filter(p => p.id !== project.id));
    setArchivedProjects(prev => [{ id: project.id, name: project.name, date: new Date().toISOString().split('T')[0] }, ...prev]);
    toast.success('Project moved to archive');
  };

  const handleEditClick = (project) => {
    setEditingProjectId(project.id);
    setEditProjectName(project.name);
    setEditProjectDescription(project.description);
    setActiveModal('edit');
  };

  const handleSaveEdit = () => {
    if (!editProjectName.trim()) {
      toast.error('Project name is required');
      return;
    }
    
    setProjects(prev => prev.map(p => {
      if (p.id === editingProjectId) {
        return { ...p, name: editProjectName, description: editProjectDescription };
      }
      return p;
    }));
    
    toast.success('Project updated successfully!');
    handleCloseModal();
  };

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      toast.error('Project name is required');
      return;
    }
    
    const newProject = {
      id: `proj-${Date.now()}`,
      name: newProjectName,
      description: newProjectDescription || 'No description provided.',
      status: 'Planning',
      progress: 0,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'Medium',
      coverColor: ['bg-primary-500', 'bg-secondary-500', 'bg-accent-500', 'bg-warning-500'][Math.floor(Math.random() * 4)],
      team: [],
      tasks: { total: 0, completed: 0 },
      tasksList: []
    };
    
    setProjects([newProject, ...projects]);
    toast.success('Project created successfully!');
    handleCloseModal();
  };

  const handleApplyFilters = () => {
    toast.success('Filters applied successfully');
    handleCloseModal();
  };

  const handleApplySort = () => {
    toast.success('Sorting applied successfully');
    handleCloseModal();
  };

  const currentMetrics = useMemo(() => {
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'Active' || p.status === 'Planning').length,
      completed: projects.filter(p => p.status === 'Completed').length,
      atRisk: projects.filter(p => p.status === 'At Risk').length,
    };
  }, [projects]);

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      <ProjectsHeader 
        projectCount={filteredProjects.length} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onImport={() => setActiveModal('import')}
        onArchive={() => setActiveModal('archive')}
        onNew={() => setActiveModal('new')}
        onFilter={() => setActiveModal('filter')}
        onSort={() => setActiveModal('sort')}
      />
      
      {!searchQuery && <ProjectOverviewCards metrics={currentMetrics} />}
      
      {filteredProjects.length > 0 ? (
        <ProjectsGrid 
          projects={filteredProjects} 
          onDelete={handleDeleteProject} 
          onArchive={handleArchiveProject} 
          onEdit={handleEditClick}
        />
      ) : (
        searchQuery ? (
          <div className="text-center py-24 text-text-secondary">
            No projects found matching "{searchQuery}"
          </div>
        ) : (
          <EmptyProjectsState />
        )
      )}

      {/* Modals */}
      <Modal isOpen={activeModal === 'archive'} onClose={handleCloseModal} title="Archived Projects">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">View and restore your archived projects.</p>
          {archivedProjects.length > 0 ? (
            <div className="space-y-3 mt-4">
              {archivedProjects.map(proj => (
                <div key={proj.id} className="flex items-center justify-between p-4 bg-surface-secondary rounded-xl border border-border/40">
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">{proj.name}</h4>
                    <p className="text-xs text-text-tertiary mt-1">Archived on {proj.date}</p>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => handleRestore(proj.id)}>Restore</Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-tertiary bg-surface-secondary rounded-xl border border-dashed border-border">
              No archived projects found.
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'new'} onClose={handleCloseModal} title="Create New Project">
        <div className="space-y-4">
          <label className="relative block border-2 border-dashed border-border rounded-xl p-6 text-center bg-surface-secondary cursor-pointer hover:bg-surface-tertiary transition-colors group overflow-hidden">
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
            {selectedFile ? (
              <div className="text-success-500 font-medium break-all relative z-10 pointer-events-none flex flex-col items-center gap-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {selectedFile.name} uploaded successfully
              </div>
            ) : (
              <div className="text-text-tertiary group-hover:text-text-secondary transition-colors relative z-10 pointer-events-none">
                <svg className="w-6 h-6 mx-auto mb-2 text-text-tertiary group-hover:text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-sm">Upload project materials (optional)</span>
              </div>
            )}
          </label>
          <Input 
            label="Project Name" 
            placeholder="e.g. Website Redesign" 
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <Input 
            label="Description" 
            placeholder="Briefly describe the project..." 
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-6">
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'edit'} onClose={handleCloseModal} title="Edit Project">
        <div className="space-y-4">
          <Input 
            label="Project Name" 
            placeholder="e.g. Website Redesign" 
            value={editProjectName}
            onChange={(e) => setEditProjectName(e.target.value)}
          />
          <Input 
            label="Description" 
            placeholder="Briefly describe the project..." 
            value={editProjectDescription}
            onChange={(e) => setEditProjectDescription(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-6">
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'filter'} onClose={handleCloseModal} title="Filter Projects">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">Filter by status or priority.</p>
          <div className="space-y-2">
             <label className="flex items-center gap-2 text-sm text-text-primary">
                <input type="checkbox" className="rounded border-border text-primary-500 focus:ring-primary-500" /> Active
             </label>
             <label className="flex items-center gap-2 text-sm text-text-primary">
                <input type="checkbox" className="rounded border-border text-primary-500 focus:ring-primary-500" /> Completed
             </label>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={handleCloseModal}>Clear</Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'sort'} onClose={handleCloseModal} title="Sort Projects">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">Sort projects by:</p>
          <select className="w-full bg-surface-primary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500">
            <option>Name (A-Z)</option>
            <option>Name (Z-A)</option>
            <option>Date Created (Newest First)</option>
            <option>Date Created (Oldest First)</option>
          </select>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleApplySort}>Apply Sort</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
