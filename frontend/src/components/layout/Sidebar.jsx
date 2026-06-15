import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../context/TaskContext';
import {
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentList,
  HiOutlineUserCircle,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiXMark,
  HiOutlineFolderOpen,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';

const getMenuItems = (stats) => [
  { label: 'Dashboard', path: '/dashboard', icon: HiOutlineSquares2X2, badge: null },
  { label: 'Tasks', path: '/tasks', icon: HiOutlineClipboardDocumentList, badge: stats?.pending > 0 ? stats.pending : null },
  { label: 'Analytics', path: '/analytics', icon: HiOutlineChartBar, badge: null },
  { label: 'Projects', path: '/projects', icon: HiOutlineFolderOpen, badge: null },
  { label: 'Team', path: '/team', icon: HiOutlineUsers, badge: 'New' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { stats } = useTask();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarWidth = isCollapsed ? 'w-[80px]' : 'w-[280px]';

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
        className={`fixed top-0 left-0 h-full ${sidebarWidth} bg-white/60 dark:bg-surface-dark/80 backdrop-blur-2xl border-r border-border/20 z-50
        flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_8px_32px_rgba(0,0,0,0.04)]
        lg:translate-x-0 lg:static lg:z-auto bg-gradient-to-b from-white/80 to-surface-secondary/30 dark:from-surface-dark/90 dark:to-background-dark/90
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-6 h-[88px] flex-shrink-0">
          <div className={`flex items-center gap-3.5 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="relative group cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
              <img src="/favicon.svg" alt="TaskoraX" className="w-10 h-10 rounded-xl shadow-sm group-hover:shadow-glow transition-all duration-300 relative z-10" />
              <div className="absolute inset-0 bg-primary-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity rounded-xl"></div>
            </div>
            {!isCollapsed && (
              <span className="text-2xl font-extrabold font-display tracking-tight text-text-primary animate-fade-in">
                Taskora<span className="text-primary-600">X</span>
              </span>
            )}
          </div>
          {!isCollapsed && (
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-surface-secondary text-text-secondary transition-colors"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          )}
        </div>



        {/* Nav links */}
        <nav className="flex-1 px-4 py-3 space-y-1.5 overflow-y-auto no-scrollbar custom-scrollbar">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-4 mt-2">Main Menu</p>
          )}
          
          {getMenuItems(stats).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className={({ isActive }) =>
                `relative flex items-center ${isCollapsed ? 'justify-center' : 'gap-3.5'} px-3.5 py-3 rounded-xl text-[14px] transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? 'text-primary-700 bg-gradient-to-r from-primary-50/90 to-transparent font-bold shadow-[0_2px_10px_rgba(239,68,68,0.05)]'
                    : 'text-text-secondary font-medium hover:text-text-primary hover:bg-surface-secondary/60 hover:-translate-y-[1px]'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full shadow-[0_0_12px_rgba(239,68,68,0.6)]"></div>
                  )}
                  <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 text-primary-600' : 'group-hover:scale-110 group-hover:text-text-primary'}`} />
                  {!isCollapsed && (
                    <span className="flex-1 truncate tracking-wide">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm flex items-center justify-center ${
                      item.badge === 'New' 
                        ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white border-none shadow-accent-500/20' 
                        : 'bg-white text-text-primary border border-border/40'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Workspace Summary Card */}
        {!isCollapsed && (
          <div className="px-5 py-4 animate-fade-in mt-auto">
            <div className="bg-white/40 dark:bg-surface-secondary/20 backdrop-blur-md border border-border/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 group/card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Workspace Summary</h4>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between group/row hover:bg-surface-secondary/50 p-2 -mx-2 rounded-lg transition-colors cursor-default">
                    <div className="flex items-center gap-2.5 text-text-secondary">
                      <div className="p-1.5 bg-success-50 rounded-lg group-hover/row:bg-white group-hover/row:shadow-sm transition-all">
                        <HiOutlineCheckCircle className="h-4 w-4 text-success-600" />
                      </div>
                      <span className="text-[13px] font-medium group-hover/row:text-text-primary transition-colors">Total Tasks</span>
                    </div>
                    <span className="text-[13px] font-bold text-text-primary">{stats?.total || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between group/row hover:bg-surface-secondary/50 p-2 -mx-2 rounded-lg transition-colors cursor-default">
                    <div className="flex items-center gap-2.5 text-text-secondary">
                      <div className="p-1.5 bg-primary-50 rounded-lg group-hover/row:bg-white group-hover/row:shadow-sm transition-all">
                        <HiOutlineBriefcase className="h-4 w-4 text-primary-600" />
                      </div>
                      <span className="text-[13px] font-medium group-hover/row:text-text-primary transition-colors">Active Projects</span>
                    </div>
                    <span className="text-[13px] font-bold text-text-primary">12</span>
                  </div>
                  
                  <div className="flex items-center justify-between group/row hover:bg-surface-secondary/50 p-2 -mx-2 rounded-lg transition-colors cursor-default">
                    <div className="flex items-center gap-2.5 text-text-secondary">
                      <div className="p-1.5 bg-accent-50 rounded-lg group-hover/row:bg-white group-hover/row:shadow-sm transition-all">
                        <HiOutlineUsers className="h-4 w-4 text-accent-600" />
                      </div>
                      <span className="text-[13px] font-medium group-hover/row:text-text-primary transition-colors">Team Members</span>
                    </div>
                    <span className="text-[13px] font-bold text-text-primary">8</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/30">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-semibold text-text-secondary">Productivity</span>
                    <span className="text-[11px] font-bold text-success-600">
                      {stats?.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-success-400 to-success-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                      style={{ width: `${stats?.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User section + logout */}
        <div className={`border-t border-border/30 p-4 ${isCollapsed ? 'space-y-2' : 'space-y-1.5'}`}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3.5'} px-3.5 py-2.5 rounded-xl text-[14px] transition-all duration-300 group hover:-translate-y-[1px] ${
                isActive
                  ? 'bg-surface-secondary/80 text-text-primary font-bold shadow-sm'
                  : 'text-text-secondary font-medium hover:text-text-primary hover:bg-surface-secondary/50'
              }`
            }
            title={isCollapsed ? 'Profile' : undefined}
          >
            {({ isActive }) => (
              <>
                <HiOutlineUserCircle className={`h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 group-hover:text-text-primary ${isActive ? 'text-primary-600' : ''}`} />
                {!isCollapsed && <span className="tracking-wide">Profile</span>}
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3.5'} px-3.5 py-2.5 rounded-xl text-[14px] transition-all duration-300 group hover:-translate-y-[1px] ${
                isActive
                  ? 'bg-surface-secondary/80 text-text-primary font-bold shadow-sm'
                  : 'text-text-secondary font-medium hover:text-text-primary hover:bg-surface-secondary/50'
              }`
            }
            title={isCollapsed ? 'Settings' : undefined}
          >
            {({ isActive }) => (
              <>
                <HiOutlineCog6Tooth className={`h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 group-hover:text-text-primary ${isActive ? 'text-primary-600' : ''}`} />
                {!isCollapsed && <span className="tracking-wide">Settings</span>}
              </>
            )}
          </NavLink>

          <div className="pt-2 mt-2 border-t border-border/20">
            <button
              onClick={handleLogout}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3.5'} px-3.5 py-2.5 rounded-xl text-[14px] font-medium text-text-secondary hover:bg-danger-50 hover:text-danger-600 hover:-translate-y-[1px] transition-all duration-300 w-full group`}
              title={isCollapsed ? 'Logout' : undefined}
            >
              <HiOutlineArrowRightOnRectangle className="h-5 w-5 flex-shrink-0 group-hover:-translate-x-1 group-hover:text-danger-500 transition-all" />
              {!isCollapsed && <span className="tracking-wide group-hover:font-semibold">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
