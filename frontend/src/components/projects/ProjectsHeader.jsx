import { HiOutlinePlusCircle, HiOutlineArrowDownTray, HiOutlineArchiveBox, HiOutlineMagnifyingGlass, HiOutlineFunnel, HiOutlineArrowsUpDown } from 'react-icons/hi2';
import Button from '../common/Button';
import Input from '../common/Input';

const ProjectsHeader = ({ projectCount, searchQuery, onSearchChange }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-secondary text-text-secondary text-xs font-bold border border-border/40">
              {projectCount} Total
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            Manage your workspaces, track progress, and collaborate seamlessly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={HiOutlineArrowDownTray} className="hidden sm:flex">
            Import
          </Button>
          <Button variant="secondary" icon={HiOutlineArchiveBox} className="hidden sm:flex">
            Archive
          </Button>
          <Button icon={HiOutlinePlusCircle}>
            New Project
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border/40">
        <div className="relative w-full sm:max-w-md">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-secondary/50 border border-border/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-text-primary placeholder:text-text-tertiary"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="secondary" icon={HiOutlineFunnel} className="w-full sm:w-auto">
            Filters
          </Button>
          <Button variant="secondary" icon={HiOutlineArrowsUpDown} className="w-full sm:w-auto">
            Sort
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHeader;
