import { HiOutlineSparkles, HiOutlineLightBulb, HiOutlineArrowTrendingUp, HiOutlineClock } from 'react-icons/hi2';

const AIPanel = () => {
  return (
    <div className="card-premium h-full flex flex-col relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl -z-10 group-hover:bg-accent-500/20 transition-colors duration-500"></div>
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold font-display text-text-primary flex items-center gap-2">
          <HiOutlineSparkles className="h-5 w-5 text-accent-500" />
          AI Assistant
        </h3>
        <span className="badge bg-accent-100 text-accent-700 border border-accent-200">Beta</span>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {/* Suggestion 1 */}
        <div className="p-4 rounded-xl bg-surface-secondary border border-border/60 hover:border-accent-300 hover:shadow-sm transition-all cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-warning-500 mt-0.5">
              <HiOutlineLightBulb className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1">Smart Prioritization</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Based on your past velocity, you should tackle "API Documentation" first today. It usually takes you 2 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Suggestion 2 */}
        <div className="p-4 rounded-xl bg-surface-secondary border border-border/60 hover:border-accent-300 hover:shadow-sm transition-all cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-danger-500 mt-0.5">
              <HiOutlineClock className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1">Deadline Risk</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                "Database Migration" is due tomorrow but hasn't been started. Consider delegating or breaking it down.
              </p>
            </div>
          </div>
        </div>
        
        {/* Suggestion 3 */}
        <div className="p-4 rounded-xl bg-surface-secondary border border-border/60 hover:border-accent-300 hover:shadow-sm transition-all cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-success-500 mt-0.5">
              <HiOutlineArrowTrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1">Productivity Insight</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                You're most productive between 10 AM and 12 PM. Block this time for deep work tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/60 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none pt-4">
          <HiOutlineSparkles className="h-4 w-4 text-accent-400" />
        </div>
        <input 
          type="text" 
          placeholder="Ask AI to plan your day..."
          className="w-full pl-9 pr-4 py-2.5 bg-surface-secondary/50 border border-border/60 rounded-xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 focus:bg-white transition-all"
        />
      </div>
    </div>
  );
};

export default AIPanel;
