import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import Select from '../common/Select';
import toast from 'react-hot-toast';

const TaskAssignmentPanel = ({ isOpen, onClose, members, initialAssignee = '' }) => {
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState(initialAssignee);
  const [project, setProject] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      setAssignee(initialAssignee);
      setTaskName('');
      setProject('');
      setPriority('medium');
      setDueDate('');

      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialAssignee, onClose]);

  if (!isOpen) return null;

  const handleAssign = () => {
    if (!taskName) {
      toast.error('Please enter a task name');
      return;
    }
    if (!assignee) {
      toast.error('Please select an assignee');
      return;
    }
    toast.success('Task assigned successfully!');
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-text-primary/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[90] border border-border/50 animate-scale-in flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-bold text-text-primary">Assign Task</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-text-tertiary hover:text-text-primary transition-colors"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 pt-0 flex-1">
          <div className="space-y-5">
            {/* Task Name */}
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
                Task Name
              </label>
              <input 
                type="text" 
                placeholder="What needs to be done?"
                className="w-full px-4 py-2.5 bg-white border border-border/80 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 hover:border-primary-300 transition-all font-medium text-text-primary shadow-sm placeholder:text-text-tertiary"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
                Assignee
              </label>
              <Select 
                options={[
                  { label: 'Select team member...', value: '' },
                  ...(members?.map(m => ({ label: m.name, value: m.id })) || [])
                ]}
                className="w-full"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Project */}
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
                  Project
                </label>
                <Select
                  options={[
                    { label: 'Select project...', value: '' },
                    { label: 'Website Redesign', value: 'p1' },
                    { label: 'Q3 Marketing', value: 'p2' }
                  ]}
                  className="w-full"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
                  Priority
                </label>
                <Select
                  options={[
                    { label: 'Low', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                    { label: 'Urgent', value: 'urgent' }
                  ]}
                  className="w-full"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
                Due Date
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-2.5 bg-white border border-border/80 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 hover:border-primary-300 transition-all font-medium text-text-primary shadow-sm cursor-pointer"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-6 pt-2 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white text-sm font-bold rounded-xl shadow-soft transition-colors"
            onClick={handleAssign}
          >
            Assign Task
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TaskAssignmentPanel;
