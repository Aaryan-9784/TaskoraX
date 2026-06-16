import { useNavigate } from 'react-router-dom';

const ProjectCollaboration = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-border/50">
      <div className="p-5 border-b border-border/50 bg-surface-secondary/30 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Active Projects</h3>
          <p className="text-xs text-text-tertiary mt-1">Cross-functional team initiatives.</p>
        </div>
        <button 
          onClick={() => navigate('/projects')}
          className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          View All
        </button>
      </div>
      
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-border bg-surface-primary hover:border-primary-200 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-sm font-bold text-text-primary group-hover:text-primary-600 transition-colors">{project.name}</h4>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                project.status === 'Completed' ? 'bg-success-50 text-success-600' :
                project.status === 'Active' ? 'bg-primary-50 text-primary-600' :
                project.status === 'Planning' ? 'bg-info-50 text-info-600' :
                project.status === 'At Risk' ? 'bg-danger-50 text-danger-600' :
                project.status === 'On Hold' ? 'bg-warning-50 text-warning-600' :
                'bg-surface-secondary text-text-secondary'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs mb-1 font-medium text-text-secondary">
                <span>Progress</span>
                <span>{project.tasks?.total > 0 ? Math.round((project.tasks.completed / project.tasks.total) * 100) : project.progress || 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${
                  project.status === 'Completed' ? 'bg-success-500' :
                  project.status === 'Active' ? 'bg-primary-500' :
                  project.status === 'Planning' ? 'bg-info-500' :
                  project.status === 'At Risk' ? 'bg-danger-500' :
                  project.status === 'On Hold' ? 'bg-warning-500' :
                  'bg-surface-secondary'
                }`} style={{ width: `${project.tasks?.total > 0 ? Math.round((project.tasks.completed / project.tasks.total) * 100) : project.progress || 0}%` }}></div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/50">
              <div className="flex -space-x-2">
                {project.team && project.team.slice(0, 3).map((member, i) => (
                  <div 
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-surface-primary bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-[10px]"
                    title={member.name}
                  >
                    {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                  </div>
                ))}
                {project.team && project.team.length > 3 && (
                  <div className="w-6 h-6 rounded-full border-2 border-surface-primary bg-surface-secondary text-text-secondary flex items-center justify-center text-[8px] font-bold">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
              <span className="text-xs text-text-tertiary font-medium">Due {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCollaboration;
