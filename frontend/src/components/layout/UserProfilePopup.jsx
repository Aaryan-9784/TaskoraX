import { 
  HiOutlineUser, 
  HiOutlineCog8Tooth, 
  HiOutlineArrowRightOnRectangle
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
      </div>

      {/* Menu Links */}
      <div className="p-2 flex flex-col gap-0.5">
        <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineUser className="w-4 h-4 text-text-tertiary" /> My Profile
        </Link>
        <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HiOutlineCog8Tooth className="w-4 h-4 text-text-tertiary" /> Settings
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
