import { useState, useMemo, useEffect } from 'react';
import ProjectsHeader from '../components/projects/ProjectsHeader';
import ProjectOverviewCards from '../components/projects/ProjectOverviewCards';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import EmptyProjectsState from '../components/projects/EmptyProjectsState';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Switch from '../components/common/Switch';
import toast from 'react-hot-toast';
import { useProjects } from '../context/ProjectContext';

const ProjectsPage = () => {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
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

  const [filterActive, setFilterActive] = useState(false);
  const [filterCompleted, setFilterCompleted] = useState(false);

  const [sortOption, setSortOption] = useState('Date Created (Newest First)');

  useEffect(() => {
    localStorage.setItem('taskora_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('taskora_archived_projects', JSON.stringify(archivedProjects));
  }, [archivedProjects]);
  
  const filteredProjects = useMemo(() => {
    let result = projects.filter((project) => 
      project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterActive || filterCompleted) {
      result = result.filter(project => {
        if (filterActive && (project.status === 'Active' || project.status === 'Planning')) return true;
        if (filterCompleted && project.status === 'Completed') return true;
        return false;
      });
    }

    result.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      if (sortOption === 'Name (A-Z)') return nameA.localeCompare(nameB);
      if (sortOption === 'Name (Z-A)') return nameB.localeCompare(nameA);
      
      const dateA = new Date(a.createdAt || a.dueDate || 0).getTime();
      const dateB = new Date(b.createdAt || b.dueDate || 0).getTime();
      
      if (sortOption === 'Date Created (Newest First)') return dateB - dateA;
      if (sortOption === 'Date Created (Oldest First)') return dateA - dateB;
      return 0;
    });

    return result;
  }, [projects, searchQuery, filterActive, filterCompleted, sortOption]);

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

  const handleRestore = async (id) => {
    const projectToRestore = archivedProjects.find(p => p.id === id);
    if (projectToRestore) {
      setArchivedProjects(prev => prev.filter(p => p.id !== id));
      
      const restoredProject = {
        name: projectToRestore.name,
        description: 'Restored from archive',
        status: 'Active',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      await addProject(restoredProject);
    }
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
  };

  const handleArchiveProject = async (project) => {
    const pId = project._id || project.id;
    await deleteProject(pId);
    setArchivedProjects(prev => [{ id: pId, name: project.name, date: new Date().toISOString().split('T')[0] }, ...prev]);
    toast.success('Project moved to archive');
  };

  const handleEditClick = (project) => {
    setEditingProjectId(project._id || project.id);
    setEditProjectName(project.name);
    setEditProjectDescription(project.description);
    setActiveModal('edit');
  };

  const handleSaveEdit = async () => {
    const finalName = editProjectName.trim() || 'Untitled Project';
    try {
      await updateProject(editingProjectId, { name: finalName, description: editProjectDescription });
      handleCloseModal();
    } catch (err) {
      console.error('Failed to update project:', err);
    }
  };

  const handleCreateProject = async () => {
    const finalName = newProjectName.trim() || 'Untitled Project';
    const newProject = {
      name: finalName,
      description: newProjectDescription || 'No description provided.',
      status: 'Planning',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'Medium'
    };
    try {
      await addProject(newProject);
      handleCloseModal();
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };


  const currentMetrics = useMemo(() => {
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'Active' || p.status === 'Planning').length,
      completed: projects.filter(p => p.status === 'Completed').length,
      atRisk: projects.filter(p => p.status === 'At Risk').length,
    };
  }, [projects]);

  if (loading) {
    return <div className="p-8 text-center text-text-secondary">Loading projects...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      <ProjectsHeader 
        projectCount={filteredProjects.length} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onArchive={() => setActiveModal('archive')}
        onNew={() => setActiveModal('new')}
        onFilter={() => setActiveModal('filter')}
        onSort={() => setActiveModal('sort')}
      />
      
      {!searchQuery && <ProjectOverviewCards metrics={currentMetrics} />}
      
      {filteredProjects.length > 0 ? (
        <ProjectsGrid 
          projects={filteredProjects.map(p => ({...p, id: p._id || p.id}))} 
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
          <EmptyProjectsState 
            onNew={() => setActiveModal('new')}
          />
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
            <Switch
              label="Active Projects"
              checked={filterActive}
              onChange={setFilterActive}
            />
            <Switch
              label="Completed Projects"
              checked={filterCompleted}
              onChange={setFilterCompleted}
            />
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'sort'} onClose={handleCloseModal} title="Sort Projects" overflowVisible={true}>
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">Sort projects by:</p>
          <Select 
            value={sortOption} 
            onChange={(e) => {
              setSortOption(e.target.value);
              toast.success('Sorting applied successfully');
              handleCloseModal();
            }} 
            options={[
              { label: 'Name (A-Z)', value: 'Name (A-Z)' },
              { label: 'Name (Z-A)', value: 'Name (Z-A)' },
              { label: 'Date Created (Newest First)', value: 'Date Created (Newest First)' },
              { label: 'Date Created (Oldest First)', value: 'Date Created (Oldest First)' }
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
