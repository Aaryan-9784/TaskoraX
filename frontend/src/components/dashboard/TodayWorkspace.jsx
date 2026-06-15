import { HiOutlineCalendarDays, HiOutlineExclamationCircle, HiOutlineCheckCircle } from 'react-icons/hi2';
import { useTask } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const TodayWorkspace = () => {
  const { tasks } = useTask();
  const navigate = useNavigate();
  
  // Show top 4 most recent tasks
  const displayTasks = tasks.slice(0, 4);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="card-premium h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold font-display text-text-primary">Today's Workspace</h3>
          <p className="text-sm text-text-tertiary mt-0.5">Your immediate focus areas</p>
        </div>
        <button 
          onClick={() => navigate('/tasks')}
          className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          View All
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {displayTasks.length > 0 ? (
          displayTasks.map((task) => (
            <div 
              key={task._id || task.id} 
              className={`group p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer
                ${task.status === 'Done' ? 'bg-surface-secondary/50 border-border/40 opacity-70' : 'bg-white border-border/60 hover:border-primary-300 hover:shadow-md'}`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors
                  ${task.status === 'Done' ? 'bg-success-500 border-success-500 text-white' : 'border-border group-hover:border-primary-400'}`}>
                  {task.status === 'Done' && <HiOutlineCheckCircle className="h-3 w-3" />}
                </div>
                <div>
                  <p className={`text-sm font-semibold mb-0.5 ${task.status === 'Done' ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="text-text-tertiary">{task.status}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="text-text-secondary flex items-center gap-1">
                      <HiOutlineCalendarDays className="h-3.5 w-3.5" />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {task.priority === 'High' && (
                  <span className="badge bg-danger-50 text-danger-600 border border-danger-100 flex items-center gap-1">
                    <HiOutlineExclamationCircle className="h-3 w-3" /> High
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-text-secondary text-center py-4">
            No tasks available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayWorkspace;
