import { useAuth } from '../../context/AuthContext';
import { HiOutlineSparkles, HiOutlineArrowRight } from 'react-icons/hi2';
import { getGreeting } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="card-premium overflow-hidden border-0 bg-white relative animate-in mb-6">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/5 to-accent-500/10 z-0"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/80 to-transparent z-0"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl z-0 animate-blob"></div>
      <div className="absolute -bottom-24 -left-12 w-48 h-48 bg-primary-400/20 rounded-full blur-3xl z-0 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-sm text-xs font-bold text-accent-600">
            <HiOutlineSparkles className="h-4 w-4" />
            <span>Daily Briefing</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-text-primary">
            {getGreeting()}, <span className="text-gradient-primary">{user?.name?.split(' ')[0] || 'User'}</span>!
          </h1>
          
          <p className="text-text-secondary text-sm md:text-base max-w-xl leading-relaxed">
            "The secret of getting ahead is getting started." You've completed <span className="font-bold text-success-600">12 tasks</span> this week. Keep up the great work!
          </p>
          
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={() => navigate('/tasks?new=true')}
              className="btn-primary shadow-glow"
            >
              Create New Task
            </button>
            <button 
              onClick={() => navigate('/analytics')}
              className="btn-secondary group"
            >
              View Analytics 
              <HiOutlineArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6 self-stretch md:self-auto">
          {/* Streak Counter */}
          <div className="flex flex-col items-center justify-center p-4 bg-white/60 backdrop-blur-md border border-white rounded-2xl shadow-sm min-w-[100px]">
            <span className="text-3xl mb-1" role="img" aria-label="fire">🔥</span>
            <span className="text-2xl font-extrabold font-display text-text-primary leading-none">5</span>
            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mt-1">Day Streak</span>
          </div>
          
          {/* Weekly Progress */}
          <div className="flex flex-col items-center justify-center p-4 bg-white/60 backdrop-blur-md border border-white rounded-2xl shadow-sm min-w-[100px]">
            <div className="relative w-12 h-12 flex items-center justify-center mb-1">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-border/50"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-success-500 transition-all duration-1000 ease-out"
                  strokeWidth="4"
                  strokeDasharray="75, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-bold text-text-primary">75%</span>
            </div>
            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mt-1">Weekly Goal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
