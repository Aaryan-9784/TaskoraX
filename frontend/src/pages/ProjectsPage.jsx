import { useState, useMemo } from 'react';
import ProjectsHeader from '../components/projects/ProjectsHeader';
import ProjectOverviewCards from '../components/projects/ProjectOverviewCards';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import EmptyProjectsState from '../components/projects/EmptyProjectsState';
import { mockProjects, projectMetrics } from '../utils/mockProjects';

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      <ProjectsHeader 
        projectCount={filteredProjects.length} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
    </div>
  );
};

export default ProjectsPage;
