import { HiOutlineFolder, HiOutlineUsers, HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi2';

const MOCK_PROJECTS = [
  {
    id: 1,
    name: 'TaskoraX Mobile App',
    status: 'In Progress',
    statusColor: 'text-warning-600 bg-warning-50 border-warning-200',
    progress: 68,
    dueDate: 'Dec 15, 2023',
    members: 4
  },
  {
    id: 2,
    name: 'Marketing Website Redesign',
    status: 'Completed',
    statusColor: 'text-success-600 bg-success-50 border-success-200',
    progress: 100,
    dueDate: 'Oct 01, 2023',
    members: 6
  },
  {
    id: 3,
    name: 'Q4 Product Roadmap',
    status: 'Planning',
    statusColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    progress: 15,
    dueDate: 'Jan 10, 2024',
    members: 3
  }
];

const CurrentProjects = () => {
  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-border/50 bg-surface-secondary/30 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Current Projects</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 group">
          View All <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      <div className="divide-y divide-border/50">
        {MOCK_PROJECTS.map((project) => (
          <div key={project.id} className="p-6 hover:bg-surface-secondary/30 transition-colors group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary-100 group-hover:scale-105 transition-transform">
                  <HiOutlineFolder className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-text-primary group-hover:text-primary-600 transition-colors cursor-pointer">{project.name}</h4>
                  <div className="flex items-center gap-4 mt-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><HiOutlineCalendar className="w-3.5 h-3.5" /> Due {project.dueDate}</span>
                    <span className="flex items-center gap-1"><HiOutlineUsers className="w-3.5 h-3.5" /> {project.members} members</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${project.statusColor} self-start sm:self-auto whitespace-nowrap`}>
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
