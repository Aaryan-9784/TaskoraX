import ProjectCard from './ProjectCard';

const ProjectsGrid = ({ projects, onDelete, onArchive, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onDelete={() => onDelete(project.id)}
          onArchive={() => onArchive(project)}
          onEdit={() => onEdit(project)}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
