import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getGreeting, getInitials } from '../../utils/helpers';
import {
  HiOutlineBars3,
  HiOutlineMagnifyingGlass,
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineSparkles,
} from 'react-icons/hi2';

const DashboardNavbar = ({ onOpenSidebar }) => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // document.documentElement.classList.toggle('dark');
  };

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

      {/* Middle section: Global Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineMagnifyingGlass className="h-5 w-5 text-text-tertiary group-focus-within:text-primary-500 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-12 py-2.5 bg-surface-secondary/50 border border-border/60 rounded-xl text-sm
                     text-text-primary placeholder:text-text-tertiary shadow-inner-light
                     focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white
                     transition-all duration-300"
            placeholder="Search tasks, projects, or docs... (Ctrl+K)"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="flex items-center gap-1 bg-white border border-border px-1.5 py-0.5 rounded text-[10px] font-bold text-text-tertiary shadow-sm">
              <HiOutlineSparkles className="h-3 w-3 text-accent-500" /> AI
            </div>
          </div>
        </div>
      </div>

      {/* Right section: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="p-2.5 rounded-xl text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-all duration-200">
          <HiOutlineCalendar className="h-5 w-5" />
        </button>
        
        <div className="relative">
          <button className="p-2.5 rounded-xl text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 relative">
            <HiOutlineBell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white animate-pulse-soft"></span>
          </button>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
        >
          {isDarkMode ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
        </button>
        
        <div className="h-8 w-px bg-border/60 mx-1 hidden sm:block"></div>

        <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-surface-secondary border border-transparent hover:border-border/50 transition-all duration-200 group">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-text-primary group-hover:text-primary-600 transition-colors">
              {user?.name || 'User'}
            </p>
            <p className="text-[10px] font-medium text-success-600 flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success-500"></span> Online
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-premium text-white flex items-center justify-center text-sm font-bold shadow-soft group-hover:shadow-glow-accent transition-all duration-300 ring-2 ring-white">
            {getInitials(user?.name)}
          </div>
        </button>
      </div>
      
    </header>
  );
};

export default DashboardNavbar;
