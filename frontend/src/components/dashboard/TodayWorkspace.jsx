import { HiOutlineCalendarDays, HiOutlineExclamationCircle, HiOutlineCheckCircle, HiOutlinePlus } from 'react-icons/hi2';
import { useTask } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const TodayWorkspace = () => {
  const { tasks } = useTask();
  const navigate = useNavigate();
  
  // Show more tasks since this is now the main view
  const displayTasks = tasks.slice(0, 8);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold font-display text-text-primary">Your Tasks</h3>
          <p className="text-sm text-text-tertiary mt-1">Focus on what matters most today</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/tasks')}
            className="text-sm font-semibold text-text-secondary hover:text-primary-600 transition-colors px-3 py-1.5"
          >
            View All
          </button>
          <button 
            onClick={() => navigate('/tasks?new=true')}
            className="btn-primary shadow-glow text-sm py-2 px-4 flex items-center gap-2"
          >
            <HiOutlinePlus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {displayTasks.length > 0 ? (
          displayTasks.map((task) => (
            <div 
              key={task._id || task.id} 
              className={`group px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer
                ${task.status === 'Done' ? 'bg-surface-secondary/30 border-transparent opacity-60 hover:opacity-100' : 'bg-white border-border/40 hover:border-border hover:shadow-sm'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors
                  ${task.status === 'Done' ? 'bg-success-500 border-success-500 text-white' : 'border-border group-hover:border-primary-400'}`}>
                  {task.status === 'Done' && <HiOutlineCheckCircle className="h-3 w-3" />}
                </div>
                <div className="flex flex-col">
                  <p className={`text-[15px] font-medium leading-snug ${task.status === 'Done' ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                    {task.title}
                  </p>
                  {task.status !== 'Done' && (
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-medium text-text-tertiary flex items-center gap-1.5">
                        <HiOutlineCalendarDays className="h-3.5 w-3.5" />
                        {formatDate(task.dueDate)}
                      </span>
                      {task.priority === 'High' && (
                         <span className="text-xs font-semibold text-danger-500 flex items-center gap-1">
                           <HiOutlineExclamationCircle className="h-3.5 w-3.5" /> High Priority
                         </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-md border
                  ${task.status === 'Done' ? 'bg-success-50 text-success-700 border-success-100' : 
                    task.status === 'In Progress' ? 'bg-primary-50 text-primary-700 border-primary-100' : 
                    'bg-surface-secondary text-text-secondary border-border/50'}`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-border/60 rounded-2xl bg-surface-secondary/20">
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
              <HiOutlineCheckCircle className="w-6 h-6 text-primary-500" />
            </div>
            <h4 className="text-text-primary font-bold mb-1">You're all caught up!</h4>
            <p className="text-text-tertiary text-sm text-center max-w-sm mb-6">
              You have no active tasks at the moment. Enjoy your free time or start planning your next project.
            </p>
            <button 
              onClick={() => navigate('/tasks?new=true')}
              className="btn-primary"
            >
              <HiOutlinePlus className="w-4 h-4 mr-2 inline" />
              Create Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayWorkspace;
