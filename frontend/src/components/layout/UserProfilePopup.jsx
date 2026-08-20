import { 
  HiOutlineUser, 
  HiOutlineCog8Tooth, 
  HiOutlineArrowRightOnRectangle
} from 'react-icons/hi2';
import { getInitials } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserProfilePopup = ({ isOpen, onClose, user, domNode, onLogout }) => {
  const [avatarError, setAvatarError] = useState(false);

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
            <div className="w-12 h-12 rounded-full bg-gradient-premium text-white flex items-center justify-center text-lg font-bold shadow-soft overflow-hidden">
              {user?.avatar && !avatarError ? (
                <img 
                  src={user.avatar} 
                  alt={getInitials(user?.name || 'User')} 
                  className="w-full h-full object-cover" 
                  onError={() => setAvatarError(true)}
                />
              ) : (
                getInitials(user?.name || 'User')
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-text-primary truncate">{user?.name || 'User'}</p>
              <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded capitalize ${
                user?.role?.toLowerCase() === 'admin' 
                  ? 'bg-danger-100 text-danger-700' 
                  : user?.role?.toLowerCase() === 'manager' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-surface-secondary text-text-secondary border border-border/50'
              }`}>
                {user?.role || 'User'}
              </span>
            </div>
            <p className="text-xs text-text-tertiary truncate mt-0.5">{user?.email || 'user@example.com'}</p>
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
