import { useState } from 'react';
import { HiOutlinePlus, HiOutlineViewColumns, HiOutlineListBullet, HiOutlineCheckCircle, HiCheck, HiOutlineCalendarDays, HiOutlineClock, HiOutlineTrash } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import Modal from '../../../common/Modal';

const TasksTab = ({ project, onUpdateProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskStartDay, setTaskStartDay] = useState('');
  const [taskDuration, setTaskDuration] = useState('');
  const [errors, setErrors] = useState({});
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'board'
  
  const tasksList = project.tasksList || [];

  const validateTaskForm = () => {
    const newErrors = {};
    if (!taskName.trim()) {
      newErrors.name = 'Task name is required';
    }
    const startDayNum = parseInt(taskStartDay, 10);
    if (isNaN(startDayNum) || startDayNum < 0 || startDayNum > 30) {
      newErrors.startDay = 'Must be 0-30';
    }
    const durationNum = parseInt(taskDuration, 10);
    if (isNaN(durationNum) || durationNum < 1 || durationNum > 30) {
      newErrors.duration = 'Must be 1-30';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateTask = () => {
    if (!validateTaskForm()) return;

    const newTask = {
      taskId: `task-${Date.now()}`,
      name: taskName.trim(),
      status: 'Todo',
      startDay: parseInt(taskStartDay, 10),
      durationDays: parseInt(taskDuration, 10)
    };

    const newTasksList = [newTask, ...tasksList];
    
    const currentTasks = project.tasks || { total: 0, completed: 0 };
    const newTotal = currentTasks.total + 1;
    const newCompleted = currentTasks.completed;
    const newProgress = newTotal > 0 ? Math.round((newCompleted / newTotal) * 100) : 0;
    
    onUpdateProject({
      ...project,
      tasksList: newTasksList,
      progress: newProgress,
      tasks: {
        total: newTotal,
        completed: newCompleted
      }
    });

    toast.success('Task created successfully');
    setTaskName('');
    setTaskStartDay('');
    setTaskDuration('');
    setErrors({});
    setIsModalOpen(false);
  };

  const toggleTaskCompletion = (taskToToggle) => {
    const isCompleting = taskToToggle.status !== 'Done';
    const newStatus = isCompleting ? 'Done' : 'Todo';
    
    const newTasksList = tasksList.map(t => {
      const isMatch = (t.taskId && t.taskId === taskToToggle.taskId) || 
                      (t.id && t.id === taskToToggle.id) || 
                      (!t.taskId && !t.id && t === taskToToggle);
      return isMatch ? { ...t, status: newStatus } : t;
    });
    
    const currentTasks = project.tasks || { total: 0, completed: 0 };
    const newCompleted = currentTasks.completed + (isCompleting ? 1 : -1);
    const newTotal = currentTasks.total;
    const newProgress = newTotal > 0 ? Math.round((newCompleted / newTotal) * 100) : 0;
    
    onUpdateProject({
      ...project,
      tasksList: newTasksList,
      progress: newProgress,
      tasks: {
        total: newTotal,
        completed: newCompleted
      }
    });
    
    if (isCompleting) {
      toast.success('Task marked as complete!');
    }
  };

  const deleteTask = (taskToDelete) => {
    const newTasksList = tasksList.filter(t => {
      const isMatch = (t.taskId && t.taskId === taskToDelete.taskId) || 
                      (t.id && t.id === taskToDelete.id) || 
                      (!t.taskId && !t.id && t === taskToDelete);
      return !isMatch;
    });
    
    const currentTasks = project.tasks || { total: 0, completed: 0 };
    const wasCompleted = taskToDelete.status === 'Done';
    
    const newTotal = Math.max(0, currentTasks.total - 1);
    const newCompleted = wasCompleted ? Math.max(0, currentTasks.completed - 1) : currentTasks.completed;
    const newProgress = newTotal > 0 ? Math.round((newCompleted / newTotal) * 100) : 0;
    
    onUpdateProject({
      ...project,
      tasksList: newTasksList,
      progress: newProgress,
      tasks: {
        total: newTotal,
        completed: newCompleted
      }
    });
    
    toast.success('Task deleted');
  };

  return (
    <div className="p-6 h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary">Project Tasks</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-secondary rounded-lg p-1 border border-border/40">
            <button 
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-text-tertiary hover:text-text-secondary'}`} 
              onClick={() => { setViewMode('list'); toast.success('List view enabled'); }}
            >
              <HiOutlineListBullet className="h-4 w-4" />
            </button>
            <button 
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'board' ? 'bg-white shadow-sm text-primary-600' : 'text-text-tertiary hover:text-text-secondary'}`} 
              onClick={() => { setViewMode('board'); toast.success('Board view enabled'); }}
            >
              <HiOutlineViewColumns className="h-4 w-4" />
            </button>
          </div>
          <Button icon={HiOutlinePlus} onClick={() => setIsModalOpen(true)}>Add Task</Button>
        </div>
      </div>

      {tasksList.length > 0 ? (
        viewMode === 'list' ? (
          <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {tasksList.map(task => (
              <div key={task.taskId || task.id} className="glass-panel p-4 rounded-xl border border-border/40 flex items-center justify-between hover:border-border/80 transition-colors group">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleTaskCompletion(task)}
                    className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-all ${task.status === 'Done' ? 'bg-success-500 border-success-500 text-white' : 'border-border/80 hover:border-success-500 text-transparent hover:text-success-500/50'}`}
                  >
                    <HiCheck className="w-4 h-4" />
                  </button>
                  <div className="flex flex-col gap-1.5">
                    <span className={`text-sm font-medium ${task.status === 'Done' ? 'text-text-tertiary line-through' : 'text-text-primary'}`}>
                      {task.name}
                    </span>
                    {(task.startDay !== undefined || task.durationDays !== undefined) && (
                      <div className="flex items-center gap-3 text-xs text-text-secondary font-medium">
                        {task.startDay !== undefined && (
                          <span className="flex items-center gap-1.5 bg-surface-secondary/50 px-2 py-0.5 rounded-md border border-border/30">
                            <HiOutlineCalendarDays className="w-3.5 h-3.5" /> Start: Day {task.startDay}
                          </span>
                        )}
                        {task.durationDays !== undefined && (
                          <span className="flex items-center gap-1.5 bg-surface-secondary/50 px-2 py-0.5 rounded-md border border-border/30">
                            <HiOutlineClock className="w-3.5 h-3.5" /> Duration: {task.durationDays}d
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-md flex-shrink-0 ${task.status === 'Done' ? 'bg-success-500/10 text-success-500' : 'bg-surface-secondary text-text-secondary'}`}>
                    {task.status}
                  </span>
                  <button 
                    onClick={() => deleteTask(task)}
                    className="p-1.5 text-text-tertiary hover:text-danger-500 hover:bg-danger-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Task"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
            {/* Todo Column */}
            <div className="flex-1 min-w-[280px] max-w-sm flex flex-col bg-surface-secondary/50 rounded-xl border border-border/40 p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-warning-500"></span> Todo
                </h4>
                <span className="px-2 py-0.5 rounded bg-surface-primary border border-border/40 text-xs font-semibold text-text-secondary">
                  {tasksList.filter(t => t.status !== 'Done').length}
                </span>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                {tasksList.filter(t => t.status !== 'Done').map(task => (
                  <div key={task.taskId || task.id} className="bg-surface-primary p-4 rounded-xl border border-border/40 shadow-sm flex flex-col gap-3 hover:border-border/80 transition-colors group">
                    <span className="text-sm font-semibold text-text-primary leading-tight">{task.name}</span>
                    
                    {(task.startDay !== undefined || task.durationDays !== undefined) && (
                      <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                        {task.startDay !== undefined && (
                          <span className="flex items-center gap-1 bg-surface-secondary px-2 py-1 rounded-md border border-border/40">
                            <HiOutlineCalendarDays className="w-3 h-3" /> Day {task.startDay}
                          </span>
                        )}
                        {task.durationDays !== undefined && (
                          <span className="flex items-center gap-1 bg-surface-secondary px-2 py-1 rounded-md border border-border/40">
                            <HiOutlineClock className="w-3 h-3" /> {task.durationDays}d
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs font-bold text-text-tertiary">Todo</span>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => deleteTask(task)}
                          className="p-1.5 text-text-tertiary hover:text-danger-500 hover:bg-danger-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete Task"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleTaskCompletion(task)}
                          className="flex items-center gap-1.5 text-xs font-bold px-2 py-1.5 rounded-lg bg-surface-secondary text-text-secondary hover:bg-success-500/10 hover:text-success-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <HiCheck className="w-4 h-4" /> Mark Done
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Done Column */}
            <div className="flex-1 min-w-[280px] max-w-sm flex flex-col bg-surface-secondary/50 rounded-xl border border-border/40 p-4 opacity-75">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500"></span> Done
                </h4>
                <span className="px-2 py-0.5 rounded bg-surface-primary border border-border/40 text-xs font-semibold text-text-secondary">
                  {tasksList.filter(t => t.status === 'Done').length}
                </span>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                {tasksList.filter(t => t.status === 'Done').map(task => (
                  <div key={task.taskId || task.id} className="bg-surface-primary p-4 rounded-xl border border-border/40 shadow-sm flex flex-col gap-3 hover:border-border/80 transition-colors group">
                    <span className="text-sm font-medium text-text-tertiary line-through leading-tight">{task.name}</span>
                    
                    {(task.startDay !== undefined || task.durationDays !== undefined) && (
                      <div className="flex items-center gap-2 text-xs font-medium text-text-tertiary/70">
                        {task.startDay !== undefined && (
                          <span className="flex items-center gap-1 bg-surface-secondary/50 px-2 py-1 rounded-md border border-border/40">
                            <HiOutlineCalendarDays className="w-3 h-3" /> Day {task.startDay}
                          </span>
                        )}
                        {task.durationDays !== undefined && (
                          <span className="flex items-center gap-1 bg-surface-secondary/50 px-2 py-1 rounded-md border border-border/40">
                            <HiOutlineClock className="w-3 h-3" /> {task.durationDays}d
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs font-bold text-text-tertiary">Done</span>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => deleteTask(task)}
                          className="p-1.5 text-text-tertiary hover:text-danger-500 hover:bg-danger-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete Task"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleTaskCompletion(task)}
                          className="flex items-center gap-1.5 text-xs font-bold px-2 py-1.5 rounded-lg bg-surface-secondary text-text-tertiary hover:bg-warning-500/10 hover:text-warning-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Undo
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="flex-1 glass-panel border border-border/40 rounded-xl flex items-center justify-center p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-border/60">
              <HiOutlineListBullet className="h-8 w-8 text-text-tertiary" />
            </div>
            <h4 className="text-base font-bold text-text-primary mb-1">No tasks yet</h4>
            <p className="text-sm text-text-secondary max-w-sm">Create a task to get started with {project.name}.</p>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setErrors({}); }} title="Create New Task">
        <div className="space-y-4">
          <Input 
            label="Task Name" 
            placeholder="e.g. Design Landing Page" 
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
              if (errors.name) setErrors(prev => ({ ...prev, name: null }));
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateTask()}
            error={errors.name}
          />
          <div className="grid grid-cols-2 gap-4">
             <Input 
               label="Start Day (0-30)"
               type="number"
               min="0"
               max="30"
               placeholder="e.g. 0"
               value={taskStartDay}
               onChange={(e) => {
                 setTaskStartDay(e.target.value);
                 if (errors.startDay) setErrors(prev => ({ ...prev, startDay: null }));
               }}
               error={errors.startDay}
             />
             <Input 
               label="Duration (days)"
               type="number"
               min="1"
               max="30"
               placeholder="e.g. 5"
               value={taskDuration}
               onChange={(e) => {
                 setTaskDuration(e.target.value);
                 if (errors.duration) setErrors(prev => ({ ...prev, duration: null }));
               }}
               error={errors.duration}
             />
          </div>
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-6">
            <Button variant="secondary" onClick={() => { setIsModalOpen(false); setErrors({}); }}>Cancel</Button>
            <Button onClick={handleCreateTask}>Create Task</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TasksTab;
