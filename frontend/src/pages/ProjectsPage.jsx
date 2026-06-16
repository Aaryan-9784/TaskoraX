import { useState, useMemo } from 'react';
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
  const [activeModal, setActiveModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [archivedProjects, setArchivedProjects] = useState([
    { id: 'proj-arc-1', name: 'Legacy Dashboard UI', date: '2025-11-20' },
    { id: 'proj-arc-2', name: 'Old Marketing Site', date: '2025-08-14' }
  ]);
  
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImportSubmit = () => {
    if (!selectedFile) return;
    toast.success(`Successfully imported projects from ${selectedFile.name}`);
    handleCloseModal();
  };

  const handleRestore = (id) => {
    setArchivedProjects(prev => prev.filter(p => p.id !== id));
    toast.success('Project restored successfully');
  };

  const handleCreateProject = () => {
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
      
      {!searchQuery && <ProjectOverviewCards metrics={projectMetrics} />}
      
      {filteredProjects.length > 0 ? (
        <ProjectsGrid projects={filteredProjects} />
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
      <Modal isOpen={activeModal === 'import'} onClose={handleCloseModal} title="Import Projects">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">Select a CSV or Excel file to import your projects.</p>
          <label className="relative block border-2 border-dashed border-border rounded-xl p-8 text-center bg-surface-secondary cursor-pointer hover:bg-surface-tertiary transition-colors group overflow-hidden">
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
            {selectedFile ? (
              <div className="text-primary-500 font-medium break-all relative z-10 pointer-events-none">
                {selectedFile.name}
              </div>
            ) : (
              <div className="text-text-tertiary group-hover:text-text-secondary transition-colors relative z-10 pointer-events-none">
                <svg className="w-8 h-8 mx-auto mb-3 text-text-tertiary group-hover:text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Drag and drop your file here or click to browse
              </div>
            )}
          </label>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleImportSubmit} disabled={!selectedFile}>Import</Button>
          </div>
        </div>
      </Modal>

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
          <Input label="Project Name" placeholder="e.g. Website Redesign" />
          <Input label="Description" placeholder="Briefly describe the project..." />
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
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
