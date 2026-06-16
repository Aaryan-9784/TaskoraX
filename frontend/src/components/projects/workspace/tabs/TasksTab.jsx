import { useState } from 'react';
import { HiOutlinePlus, HiOutlineViewColumns, HiOutlineListBullet, HiOutlineCheckCircle } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import Modal from '../../../common/Modal';

const TasksTab = ({ project, onUpdateProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskStartDay, setTaskStartDay] = useState(0);
  const [taskDuration, setTaskDuration] = useState(5);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'board'
  
  const tasksList = project.tasksList || [];

  const handleCreateTask = () => {
    if (!taskName.trim()) {
      toast.error('Task name is required');
      return;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      name: taskName,
      status: 'Todo',
      startDay: taskStartDay,
      durationDays: taskDuration
    };

    const newTasksList = [newTask, ...tasksList];
    
    const newTotal = project.tasks.total + 1;
    const newCompleted = project.tasks.completed;
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
    setTaskStartDay(0);
    setTaskDuration(5);
    setIsModalOpen(false);
  };

  const toggleTaskCompletion = (taskId, currentStatus) => {
    const isCompleting = currentStatus !== 'Done';
    const newStatus = isCompleting ? 'Done' : 'Todo';
    
    const newTasksList = tasksList.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    
    const newCompleted = project.tasks.completed + (isCompleting ? 1 : -1);
    const newTotal = project.tasks.total;
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
              <div key={task.id} className="glass-panel p-4 rounded-xl border border-border/40 flex items-center justify-between hover:border-border/80 transition-colors">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleTaskCompletion(task.id, task.status)}
                    className={`flex items-center justify-center w-6 h-6 rounded-full border transition-colors ${task.status === 'Done' ? 'bg-success-500 border-success-500 text-white' : 'border-border/80 hover:border-success-500 text-transparent hover:text-success-500/30'}`}
                  >
                    <HiOutlineCheckCircle className="w-5 h-5" />
                  </button>
                  <span className={`text-sm font-medium ${task.status === 'Done' ? 'text-text-tertiary line-through' : 'text-text-primary'}`}>
                    {task.name}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-md ${task.status === 'Done' ? 'bg-success-500/10 text-success-500' : 'bg-surface-secondary text-text-secondary'}`}>
                  {task.status}
                </span>
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
                  <div key={task.id} className="bg-surface-primary p-4 rounded-xl border border-border/40 shadow-sm flex flex-col gap-4 hover:border-border/80 transition-colors group">
                    <span className="text-sm font-semibold text-text-primary">{task.name}</span>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => toggleTaskCompletion(task.id, task.status)}
                        className="flex items-center gap-1.5 text-xs font-bold px-2 py-1.5 rounded-lg bg-surface-secondary text-text-secondary hover:bg-success-500/10 hover:text-success-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <HiOutlineCheckCircle className="w-4 h-4" /> Mark Done
                      </button>
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
                  <div key={task.id} className="bg-surface-primary p-4 rounded-xl border border-border/40 shadow-sm flex flex-col gap-4 hover:border-border/80 transition-colors group">
                    <span className="text-sm font-medium text-text-tertiary line-through">{task.name}</span>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => toggleTaskCompletion(task.id, task.status)}
                        className="text-xs font-bold px-2 py-1.5 rounded-lg bg-surface-secondary text-text-tertiary hover:bg-warning-500/10 hover:text-warning-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Undo
                      </button>
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Task">
        <div className="space-y-4">
          <Input 
            label="Task Name" 
            placeholder="e.g. Design Landing Page" 
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateTask()}
          />
          <div className="grid grid-cols-2 gap-4">
             <Input 
               label="Start Day (0-30)"
               type="number"
               min="0"
               max="30"
               value={taskStartDay}
               onChange={(e) => setTaskStartDay(parseInt(e.target.value) || 0)}
             />
             <Input 
               label="Duration (days)"
               type="number"
               min="1"
               max="30"
               value={taskDuration}
               onChange={(e) => setTaskDuration(parseInt(e.target.value) || 1)}
             />
          </div>
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTask}>Create Task</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TasksTab;
