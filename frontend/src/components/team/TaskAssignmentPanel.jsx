import { useState } from 'react';
import { HiXMark, HiOutlineBriefcase, HiOutlineUser, HiOutlineCalendar, HiOutlineFlag } from 'react-icons/hi2';

const TaskAssignmentPanel = ({ isOpen, onClose, members }) => {
  const [taskName, setTaskName] = useState('');

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-[80] animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-surface-primary rounded-2xl shadow-2xl z-[90] border border-border/50 animate-scale-in flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border/50 bg-surface-secondary/30">
          <h2 className="text-xl font-extrabold text-text-primary">Assign Task</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-tertiary hover:text-text-primary transition-colors"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-5">
            {/* Task Name */}
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">Task Name</label>
              <input 
                type="text" 
                placeholder="What needs to be done?"
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-text-primary placeholder:text-text-tertiary"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <HiOutlineUser className="w-4 h-4" /> Assignee
              </label>
              <select className="w-full px-4 py-2.5 bg-surface-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-text-primary appearance-none cursor-pointer">
                <option value="">Select team member...</option>
                {members?.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Project */}
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <HiOutlineBriefcase className="w-4 h-4" /> Project
                </label>
                <select className="w-full px-4 py-2.5 bg-surface-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-text-primary appearance-none cursor-pointer">
                  <option value="">Select project...</option>
                  <option value="p1">Website Redesign</option>
                  <option value="p2">Q3 Marketing</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <HiOutlineFlag className="w-4 h-4" /> Priority
                </label>
                <select className="w-full px-4 py-2.5 bg-surface-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-text-primary appearance-none cursor-pointer">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <HiOutlineCalendar className="w-4 h-4" /> Due Date
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-text-primary cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-border/50 bg-surface-secondary/30 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold rounded-xl shadow-soft transition-colors"
            onClick={onClose}
          >
            Assign Task
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskAssignmentPanel;
