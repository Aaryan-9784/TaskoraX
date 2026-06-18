import { HiOutlineFolderPlus } from 'react-icons/hi2';
import Button from '../common/Button';
const EmptyProjectsState = ({ onNew }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <div className="w-24 h-24 mb-6 relative">
        <div className="absolute inset-0 bg-primary-500/10 rounded-3xl rotate-6"></div>
        <div className="absolute inset-0 bg-surface-secondary border border-border/40 rounded-3xl -rotate-3 flex items-center justify-center">
          <HiOutlineFolderPlus className="h-10 w-10 text-text-tertiary" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-2">No projects yet</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-8">
        Create your first project and start organizing your work professionally.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Button icon={HiOutlineFolderPlus} onClick={onNew}>
          Create Project
        </Button>
      </div>
    </div>
  );
};

export default EmptyProjectsState;
