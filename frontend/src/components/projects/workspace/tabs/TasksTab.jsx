import { HiOutlinePlus, HiOutlineViewColumns, HiOutlineListBullet } from 'react-icons/hi2';
import Button from '../../../common/Button';

const TasksTab = ({ project }) => {
  return (
    <div className="p-6 h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary">Project Tasks</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-secondary rounded-lg p-1 border border-border/40">
            <button className="p-1.5 rounded-md bg-white shadow-sm text-primary-600"><HiOutlineListBullet className="h-4 w-4" /></button>
            <button className="p-1.5 rounded-md text-text-tertiary hover:text-text-secondary"><HiOutlineViewColumns className="h-4 w-4" /></button>
          </div>
          <Button icon={HiOutlinePlus}>Add Task</Button>
        </div>
      </div>

      <div className="flex-1 glass-panel border border-border/40 rounded-xl flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-border/60">
            <HiOutlineListBullet className="h-8 w-8 text-text-tertiary" />
          </div>
          <h4 className="text-base font-bold text-text-primary mb-1">No tasks yet</h4>
          <p className="text-sm text-text-secondary max-w-sm">Create a task to get started with {project.name}.</p>
        </div>
      </div>
    </div>
  );
};

export default TasksTab;
