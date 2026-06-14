import { useNavigate } from 'react-router-dom';
import { HiOutlineCalendar, HiOutlineClipboardDocumentList, HiOutlineEllipsisVertical } from 'react-icons/hi2';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const statusStyles = {
    'Active': 'bg-accent-500/10 text-accent-500 border-accent-500/20',
    'Planning': 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    'Completed': 'bg-success-500/10 text-success-500 border-success-500/20',
    'At Risk': 'bg-warning-500/10 text-warning-500 border-warning-500/20',
    'On Hold': 'bg-surface-tertiary text-text-secondary border-border/40',
  };

  const statusStyle = statusStyles[project.status] || statusStyles['Active'];

  return (
    <div 
      onClick={() => navigate(`/projects/${project.id}`)}
      className="glass-panel border border-border/40 rounded-2xl overflow-hidden hover:border-border/80 hover:shadow-elevated transition-all duration-300 group cursor-pointer flex flex-col h-full relative"
    >
      {/* Top Accent Line */}
      <div className={`h-1.5 w-full ${project.coverColor}`} />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-text-primary group-hover:text-primary-500 transition-colors line-clamp-1">{project.name}</h3>
            <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full border ${statusStyle}`}>
              {project.status}
            </span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); /* handle menu */ }}
            className="p-1.5 text-text-tertiary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <HiOutlineEllipsisVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
          {project.description}
        </p>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-text-secondary">Progress</span>
            <span className="font-bold text-text-primary">{project.progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${project.coverColor}`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Meta Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
          {/* Team Avatars */}
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, idx) => (
              <img 
                key={idx}
                src={member.avatar} 
                alt={member.name}
                className="w-7 h-7 rounded-full border-2 border-surface-primary object-cover"
              />
            ))}
            {project.team.length > 3 && (
              <div className="w-7 h-7 rounded-full border-2 border-surface-primary bg-surface-secondary flex items-center justify-center text-[10px] font-bold text-text-secondary">
                +{project.team.length - 3}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-text-tertiary">
            <div className="flex items-center gap-1">
              <HiOutlineClipboardDocumentList className="h-4 w-4" />
              <span>{project.tasks.completed}/{project.tasks.total}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineCalendar className="h-4 w-4" />
              <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
