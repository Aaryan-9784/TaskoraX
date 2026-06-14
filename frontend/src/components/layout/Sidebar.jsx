import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentList,
  HiOutlineUserCircle,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiXMark,
} from 'react-icons/hi2';
import { getInitials } from '../../utils/helpers';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: HiOutlineSquares2X2 },
  { label: 'Tasks', path: '/tasks', icon: HiOutlineClipboardDocumentList },
  { label: 'Profile', path: '/profile', icon: HiOutlineUserCircle },
  { label: 'Settings', path: '/settings', icon: HiOutlineCog6Tooth },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-white border-r border-border z-50
        flex flex-col transition-transform duration-300 ease-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="TaskoraX Logo" className="w-8 h-8 rounded-lg shadow-soft" />
            <span className="text-xl font-extrabold font-display text-text-primary tracking-tight">
              Taskora<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">X</span>
            </span>
          </div>
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-surface-secondary transition-colors"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <HiXMark className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100/30 text-primary-700 shadow-[inset_4px_0_0_0_rgba(217,59,59,1)]'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary hover:translate-x-1'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User section + logout */}
        <div className="border-t border-border p-3 space-y-2">
          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-text-primary truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-text-tertiary truncate">
                {user?.email || 'user@email.com'}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger-500 hover:bg-danger-50 transition-colors w-full"
          >
            <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
