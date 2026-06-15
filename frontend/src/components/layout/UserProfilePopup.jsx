import { 
  HiOutlineUser, 
  HiOutlineSquares2X2, 
  HiOutlineCheckCircle, 
  HiOutlineFolder, 
  HiOutlineUsers, 
  HiOutlineCog8Tooth, 
  HiOutlineMoon, 
  HiOutlineQuestionMarkCircle,
  HiOutlineCommandLine,
  HiOutlineArrowRightOnRectangle,
  HiOutlineCreditCard,
  HiOutlineClock
} from 'react-icons/hi2';
import { getInitials } from '../../utils/helpers';
import { Link } from 'react-router-dom';

const UserProfilePopup = ({ isOpen, onClose, user, domNode, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div 
      ref={domNode}
      className="absolute top-16 right-0 mt-2 w-[300px] bg-white rounded-2xl shadow-elevated border border-border/60 z-50 animate-scale-in origin-top-right overflow-hidden flex flex-col"
    >
      {/* Header Profile Section */}
      <div className="p-4 bg-surface-primary/50 border-b border-border/40 relative">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-premium text-white flex items-center justify-center text-lg font-bold shadow-soft">
              {getInitials(user?.name || 'User')}
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-text-primary truncate">{user?.name || 'Jane Doe'}</p>
            <p className="text-xs text-text-tertiary truncate">{user?.email || 'jane@example.com'}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-primary-50 text-primary-600 text-[10px] font-bold uppercase tracking-wide">
            {user?.role || 'Pro Member'}
          </span>
          <span className="text-[10px] text-text-tertiary">Workspace: TaskoraX HQ</span>
        </div>
      </div>

      {/* Stats/Usage Mini Section */}
      <div className="px-4 py-3 bg-surface-secondary/30 border-b border-border/40">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-text-secondary font-medium">Storage</span>
          <span className="text-text-primary font-bold">4.2 GB / 10 GB</span>
        </div>
        <div className="w-full bg-border/50 rounded-full h-1.5 overflow-hidden">
          <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
        </div>
      </div>

      {/* Menu Links */}
      <div className="p-2 flex flex-col gap-0.5 max-h-[300px] overflow-y-auto custom-scrollbar">
        <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineUser className="w-4 h-4 text-text-tertiary" /> My Profile
        </Link>
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineSquares2X2 className="w-4 h-4 text-text-tertiary" /> Dashboard
        </Link>
        <Link to="/tasks" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineCheckCircle className="w-4 h-4 text-text-tertiary" /> My Tasks
        </Link>
        <Link to="/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineFolder className="w-4 h-4 text-text-tertiary" /> Projects
        </Link>
        <Link to="/team" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineUsers className="w-4 h-4 text-text-tertiary" /> Team
        </Link>
        
        <div className="h-px bg-border/50 my-1 mx-2"></div>
        
        <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineCog8Tooth className="w-4 h-4 text-text-tertiary" /> Settings
        </Link>
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <div className="flex items-center gap-3">
            <HiOutlineMoon className="w-4 h-4 text-text-tertiary" /> Appearance
          </div>
          <span className="text-[10px] text-text-tertiary font-semibold uppercase">System</span>
        </button>
        <Link to="/billing" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineCreditCard className="w-4 h-4 text-text-tertiary" /> Billing & Sub
        </Link>

        <div className="h-px bg-border/50 my-1 mx-2"></div>

        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <div className="flex items-center gap-3">
            <HiOutlineCommandLine className="w-4 h-4 text-text-tertiary" /> Shortcuts
          </div>
          <span className="px-1.5 py-0.5 rounded bg-surface-tertiary text-[10px] text-text-tertiary font-bold tracking-widest border border-border/50">⌘K</span>
        </button>
        <Link to="/help" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineQuestionMarkCircle className="w-4 h-4 text-text-tertiary" /> Help Center
        </Link>
        <Link to="/activity" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineClock className="w-4 h-4 text-text-tertiary" /> Activity Log
        </Link>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-border/40 bg-surface-secondary/50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-danger-50 text-sm font-medium text-danger-600 transition-colors group"
        >
          <HiOutlineArrowRightOnRectangle className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;
