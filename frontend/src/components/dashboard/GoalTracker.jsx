import { useState, useEffect } from 'react';
import { HiOutlineTrophy, HiOutlineTrash, HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi2';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const GoalTracker = () => {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('taskora_goals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse goals', e);
      }
    }
    return [
      { id: 1, title: 'Launch MVP', progress: 85, color: 'primary' },
      { id: 2, title: 'Acquire 100 Users', progress: 40, color: 'secondary' },
      { id: 3, title: 'Publish 5 Blog Posts', progress: 60, color: 'accent' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('taskora_goals', JSON.stringify(goals));
  }, [goals]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');

  const handleAddGoal = () => {
    if (!newGoalTitle.trim()) {
      toast.error('Goal title cannot be empty');
      return;
    }

    const newGoal = {
      id: Date.now(),
      title: newGoalTitle,
      progress: 0,
      color: ['primary', 'secondary', 'accent'][Math.floor(Math.random() * 3)]
    };

    setGoals([newGoal, ...goals]);
    setNewGoalTitle('');
    setIsModalOpen(false);
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.success('Goal deleted');
  };

  const handleUpdateProgress = (id, amount) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newProgress = Math.min(100, Math.max(0, goal.progress + amount));
        return { ...goal, progress: newProgress };
      }
      return goal;
    }));
  };

  const getColorClasses = (color) => {
    switch(color) {
      case 'primary': return 'bg-primary-500 shadow-glow';
      case 'secondary': return 'bg-secondary-500 shadow-glow';
      case 'accent': return 'bg-accent-500 shadow-glow-accent';
      default: return 'bg-primary-500';
    }
  };

  const getTextClasses = (color) => {
    switch(color) {
      case 'primary': return 'text-primary-600';
      case 'secondary': return 'text-secondary-600';
      case 'accent': return 'text-accent-600';
      default: return 'text-primary-600';
    }
  };

  return (
    <div className="card-premium h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold font-display text-text-primary flex items-center gap-2">
            <HiOutlineTrophy className="h-5 w-5 text-warning-500" />
            Monthly Goals
          </h3>
          <p className="text-sm text-text-tertiary mt-0.5">Track your major milestones</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar">
        {goals.map((goal) => (
          <div key={goal.id} className="group shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold text-text-primary group-hover:text-primary-600 transition-colors truncate pr-2">
                {goal.title}
              </span>
              
              <div className="flex items-center shrink-0">
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                  <button 
                    onClick={() => handleUpdateProgress(goal.id, -10)}
                    className="p-1 text-text-tertiary hover:text-primary-500 transition-colors rounded hover:bg-primary-500/10"
                    title="Decrease progress (-10%)"
                  >
                    <HiOutlineMinus className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleUpdateProgress(goal.id, 10)}
                    className="p-1 text-text-tertiary hover:text-primary-500 transition-colors rounded hover:bg-primary-500/10"
                    title="Increase progress (+10%)"
                  >
                    <HiOutlinePlus className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="p-1 text-text-tertiary hover:text-danger-500 transition-colors rounded hover:bg-danger-500/10"
                    title="Delete goal"
                  >
                    <HiOutlineTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className={`text-xs font-bold ${getTextClasses(goal.color)} w-8 text-right`}>
                  {goal.progress}%
                </span>
              </div>
            </div>
            <div className="w-full bg-surface-secondary border border-border/40 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getColorClasses(goal.color)}`}
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/40 text-center shrink-0">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-xs font-bold text-text-secondary hover:text-primary-600 transition-colors"
        >
          + Add New Goal
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Goal">
        <div className="space-y-4">
          <Input 
            label="Goal Title" 
            placeholder="e.g. Reach $10k MRR" 
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
          />
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GoalTracker;
