import { useState, useEffect } from 'react';
import { HiOutlinePlay, HiOutlinePause, HiOutlineArrowPath } from 'react-icons/hi2';

const PomodoroWidget = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound or notification here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="card-premium h-full flex flex-col justify-between relative overflow-hidden group">
      {/* Dynamic Background Progress */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-primary-500/5 transition-all duration-1000 -z-10"
        style={{ height: `${progress}%` }}
      ></div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold font-display text-text-primary">Focus Timer</h3>
          <span className="badge bg-primary-100 text-primary-700">Pomodoro</span>
        </div>
        <p className="text-xs text-text-tertiary">Stay focused and track your deep work.</p>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative">
          {/* Animated glow when active */}
          {isActive && (
            <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl animate-pulse-soft"></div>
          )}
          <h2 className="text-5xl font-extrabold font-display text-text-primary tracking-tighter relative z-10 tabular-nums">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={toggleTimer}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
            ${isActive 
              ? 'bg-white text-danger-500 border border-danger-200 hover:border-danger-400 hover:shadow-md hover:bg-danger-50' 
              : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-glow hover:-translate-y-1'}`}
        >
          {isActive ? <HiOutlinePause className="h-6 w-6" /> : <HiOutlinePlay className="h-6 w-6 ml-1" />}
        </button>
        <button 
          onClick={resetTimer}
          className="w-10 h-10 rounded-full bg-surface-secondary text-text-secondary flex items-center justify-center hover:bg-white hover:text-text-primary border border-transparent hover:border-border/60 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          <HiOutlineArrowPath className={`h-5 w-5 ${isActive ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroWidget;
