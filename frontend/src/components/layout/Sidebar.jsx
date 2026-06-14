import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentList,
  HiOutlineUserCircle,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiXMark,
  HiOutlineChevronUpDown,
  HiOutlinePlus,
  HiOutlineFolderOpen,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { getInitials } from '../../utils/helpers';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: HiOutlineSquares2X2, badge: null },
  { label: 'Tasks', path: '/tasks', icon: HiOutlineClipboardDocumentList, badge: 3 },
  { label: 'Analytics', path: '/analytics', icon: HiOutlineChartBar, badge: null },
  { label: 'Projects', path: '/projects', icon: HiOutlineFolderOpen, badge: null },
  { label: 'Team', path: '/team', icon: HiOutlineUsers, badge: 'New' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarWidth = isCollapsed ? 'w-[80px]' : 'w-[260px]';

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
        className={`fixed top-0 left-0 h-full ${sidebarWidth} glass-panel border-r border-border/60 z-50
        flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-5 h-[72px] border-b border-border/40 flex-shrink-0">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="relative group cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
              <img src="/favicon.svg" alt="TaskoraX" className="w-8 h-8 rounded-lg shadow-soft group-hover:shadow-glow transition-all duration-300 relative z-10" />
              <div className="absolute inset-0 bg-primary-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-lg"></div>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-extrabold font-display tracking-tight text-text-primary animate-fade-in">
                Taskora<span className="text-gradient-primary">X</span>
              </span>
            )}
          </div>
          {!isCollapsed && (
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-surface-secondary text-text-secondary transition-colors"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Workspace Switcher */}
        {!isCollapsed && (
          <div className="px-3 pt-4 pb-2 animate-fade-in">
            <button className="w-full flex items-center justify-between px-3 py-2 bg-surface-secondary/50 hover:bg-surface-secondary border border-border/60 rounded-xl transition-colors group">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-gradient-premium text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  T
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-text-primary">Taskora Workspace</p>
                  <p className="text-[10px] text-text-tertiary">Free Plan</p>
                </div>
              </div>
              <HiOutlineChevronUpDown className="h-4 w-4 text-text-tertiary group-hover:text-text-primary" />
            </button>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto no-scrollbar custom-scrollbar">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-2 mt-2">Menu</p>
          )}
          
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className={({ isActive }) =>
                `relative flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? 'text-primary-600 bg-primary-50/50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                  )}
                  <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  {!isCollapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.badge === 'New' 
                        ? 'bg-accent-100 text-accent-700' 
                        : 'bg-primary-100 text-primary-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}

          {!isCollapsed && (
            <>
              <div className="my-4 border-t border-border/40"></div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-2">Favorites</p>
              
              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors group">
                  <span className="w-2 h-2 rounded-full bg-accent-500 group-hover:scale-125 transition-transform"></span>
                  <span className="truncate">Q3 Marketing</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors group">
                  <span className="w-2 h-2 rounded-full bg-warning-500 group-hover:scale-125 transition-transform"></span>
                  <span className="truncate">Website Redesign</span>
                </button>
              </div>
            </>
          )}
        </nav>

        {/* AI Assistant Promo */}
        {!isCollapsed && (
          <div className="px-4 py-4 animate-fade-in">
            <div className="bg-gradient-to-br from-accent-500/10 to-primary-500/10 border border-accent-200/50 rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:shadow-elevated transition-all duration-300">
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                <HiOutlineSparkles className="h-12 w-12 text-accent-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-accent-600 font-bold text-xs mb-1">
                  <HiOutlineSparkles className="h-4 w-4" /> Ask AI
                </div>
                <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                  Generate plans, analyze tasks, and boost productivity.
                </p>
                <button className="w-full py-1.5 bg-white text-xs font-bold text-accent-600 rounded-lg shadow-sm border border-accent-100 hover:border-accent-300 transition-colors">
                  Try Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User section + logout */}
        <div className="border-t border-border/40 p-3 space-y-1">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                isActive
                  ? 'bg-surface-secondary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              }`
            }
            title={isCollapsed ? 'Profile' : undefined}
          >
            <HiOutlineUserCircle className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Profile</span>}
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                isActive
                  ? 'bg-surface-secondary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              }`
            }
            title={isCollapsed ? 'Settings' : undefined}
          >
            <HiOutlineCog6Tooth className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Settings</span>}
          </NavLink>

          <button
            onClick={handleLogout}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-xl text-sm font-semibold text-danger-500 hover:bg-danger-50 hover:text-danger-600 transition-colors w-full group`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <HiOutlineArrowRightOnRectangle className="h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
