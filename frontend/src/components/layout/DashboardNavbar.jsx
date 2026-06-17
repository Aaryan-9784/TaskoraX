import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../context/TaskContext';
import { getGreeting, getInitials } from '../../utils/helpers';
import {
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlineCalendar,
} from 'react-icons/hi2';
import { useClickOutside } from '../../hooks/useClickOutside';
import CalendarPopup from './CalendarPopup';
import NotificationsPopup from './NotificationsPopup';
import UserProfilePopup from './UserProfilePopup';
import CreateTaskModal from '../tasks/CreateTaskModal';

const DashboardNavbar = ({ onOpenSidebar }) => {
  const { user, logout } = useAuth();
  const { allTasks = [] } = useTask();
  const [activePopup, setActivePopup] = useState(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [lastReadTime, setLastReadTime] = useState(0);
  const [readItems, setReadItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);

  useEffect(() => {
    const fetchReadData = () => {
      const savedTime = localStorage.getItem('taskora_last_read');
      if (savedTime) {
        try { setLastReadTime(parseInt(savedTime, 10)); } catch (e) {}
      }
      
      const savedReadItems = localStorage.getItem('taskora_read_notifications');
      if (savedReadItems) {
        try { setReadItems(JSON.parse(savedReadItems)); } catch (e) {}
      }

      const savedDeletedItems = localStorage.getItem('taskora_deleted_notifications');
      if (savedDeletedItems) {
        try { setDeletedItems(JSON.parse(savedDeletedItems)); } catch (e) {}
      }
    };
    fetchReadData();
    window.addEventListener('taskora_read_update', fetchReadData);
    return () => window.removeEventListener('taskora_read_update', fetchReadData);
  }, []);

  const getRecentTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      
      if (timeA !== timeB) {
        return timeB - timeA;
      }
      
      const idA = (a._id || a.id || '').toString();
      const idB = (b._id || b.id || '').toString();
      return idB.localeCompare(idA);
    });
  };

  const hasUnread = getRecentTasks(allTasks)
    .filter(task => !deletedItems.includes(task._id || task.id))
    .slice(0, 6)
    .some(task => {
      const taskId = task._id || task.id;
      const taskTime = new Date(task.updatedAt || task.createdAt || 0).getTime();
      return taskTime > lastReadTime && !readItems.includes(taskId);
    });
  
  const todayStr = new Date().toDateString();
  const hasTasksToday = allTasks.some(t => t.dueDate && new Date(t.dueDate).toDateString() === todayStr);
  
  const closePopups = () => setActivePopup(null);
  const rightSectionRef = useClickOutside(closePopups);

  const togglePopup = (popupName) => {
    setActivePopup(prev => prev === popupName ? null : popupName);
  };
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="h-[72px] glass-effect z-40 sticky top-0 flex items-center justify-between px-4 lg:px-8 flex-shrink-0 transition-all duration-300">
      
      {/* Left section: Mobile menu & Greeting */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-surface-secondary text-text-secondary hover:text-text-primary transition-colors"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <HiOutlineBars3 className="h-6 w-6" />
        </button>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-text-tertiary flex items-center gap-1.5">
            {currentDate}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-text-primary leading-tight">
              {getGreeting()}, <span className="text-primary-600">{user?.name?.split(' ')[0] || 'User'}</span>
            </p>
            <span className="text-xl animate-bounce" role="img" aria-label="wave">👋</span>
          </div>
        </div>
      </div>



      {/* Right section: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3" ref={rightSectionRef}>
        <div className="relative">
          <button 
            onClick={() => togglePopup('calendar')}
            className={`p-2.5 rounded-xl transition-all duration-200 relative ${activePopup === 'calendar' ? 'text-primary-600 bg-primary-50 shadow-sm' : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50'}`}
          >
            <HiOutlineCalendar className="h-5 w-5" />
            {hasTasksToday && (
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white"></span>
            )}
          </button>
          <CalendarPopup 
            isOpen={activePopup === 'calendar'} 
            onClose={closePopups} 
            onCreateTask={() => {
              closePopups();
              setIsCreateTaskOpen(true);
            }} 
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => togglePopup('notifications')}
            className={`p-2.5 rounded-xl transition-all duration-200 relative ${activePopup === 'notifications' ? 'text-primary-600 bg-primary-50 shadow-sm' : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50'}`}
          >
            <HiOutlineBell className="h-5 w-5" />
            {hasUnread && (
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white animate-pulse-soft"></span>
            )}
          </button>
          <NotificationsPopup isOpen={activePopup === 'notifications'} onClose={closePopups} />
        </div>
        
        <div className="h-8 w-px bg-border/60 mx-1 hidden sm:block"></div>

        <div className="relative">
          <button 
            onClick={() => togglePopup('profile')}
            className={`flex items-center gap-2 pl-2 pr-1 py-1 rounded-full transition-all duration-200 group ${activePopup === 'profile' ? 'bg-surface-secondary border-border/50 shadow-sm' : 'hover:bg-surface-secondary border-transparent hover:border-border/50'} border`}
          >
            <div className="hidden sm:block text-right">
              <p className={`text-xs font-bold transition-colors ${activePopup === 'profile' ? 'text-primary-600' : 'text-text-primary group-hover:text-primary-600'}`}>
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] font-medium text-success-600 flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success-500"></span> Online
              </p>
            </div>
            <div className={`w-9 h-9 rounded-full bg-gradient-premium text-white flex items-center justify-center text-sm font-bold transition-all duration-300 ring-2 ring-white overflow-hidden ${activePopup === 'profile' ? 'shadow-glow-accent scale-105' : 'shadow-soft group-hover:shadow-glow-accent'}`}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user?.name || 'Profile'} className="w-full h-full object-cover" />
              ) : (
                getInitials(user?.name)
              )}
            </div>
          </button>
          <UserProfilePopup isOpen={activePopup === 'profile'} onClose={closePopups} user={user} onLogout={logout} />
        </div>
      </div>
      
      <CreateTaskModal isOpen={isCreateTaskOpen} onClose={() => setIsCreateTaskOpen(false)} />
    </header>
  );
};

export default DashboardNavbar;
