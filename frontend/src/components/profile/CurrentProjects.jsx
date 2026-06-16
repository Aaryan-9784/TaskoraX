import { HiOutlineFolder, HiOutlineUsers, HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi2';
import { useProjects } from '../../context/ProjectContext';
import { useNavigate } from 'react-router-dom';

const CurrentProjects = () => {
  const { projects } = useProjects();
  const navigate = useNavigate();
  
  const currentProjects = projects.slice(0, 3); // Show top 3

  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-border/50 bg-surface-secondary/30 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Current Projects</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 group">
          View All <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      <div className="divide-y divide-border/50">
        {currentProjects.length === 0 && <div className="p-6 text-sm text-text-secondary text-center">No projects assigned yet.</div>}
        {currentProjects.map((project) => (
          <div key={project._id || project.id} className="p-6 hover:bg-surface-secondary/30 transition-colors group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary-100 group-hover:scale-105 transition-transform">
                  <HiOutlineFolder className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-text-primary group-hover:text-primary-600 transition-colors cursor-pointer">{project.name}</h4>
                  <div className="flex items-center gap-4 mt-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><HiOutlineCalendar className="w-3.5 h-3.5" /> Due {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'No date'}</span>
                    <span className="flex items-center gap-1"><HiOutlineUsers className="w-3.5 h-3.5" /> {project.team?.length || 0} members</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border self-start sm:self-auto whitespace-nowrap`}>
                {project.status}
              </span>
            </div>
            
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-text-tertiary">Progress</span>
                <span className="text-xs font-bold text-text-secondary">{project.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${project.progress === 100 ? 'bg-success-500' : 'bg-primary-500'}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentProjects;
