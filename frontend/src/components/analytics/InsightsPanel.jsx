import { HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineClock, HiArrowTrendingUp, HiOutlineCalendarDays } from 'react-icons/hi2';

const InsightsPanel = () => {
  return (
    <div className="card-premium h-full flex flex-col bg-gradient-to-br from-surface to-surface-secondary border-accent-200/40 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/10 rounded-full blur-[80px] -z-10 animate-pulse-soft"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[60px] -z-10 group-hover:bg-primary-500/10 transition-colors duration-700"></div>
      
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center shadow-inner">
          <HiOutlineSparkles className="h-4 w-4 text-accent-600 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-text-primary">AI Insights</h3>
      </div>

      <div className="space-y-4 flex-1 relative z-10">
        {/* Insight 1 */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface/50 border border-border/40 hover:bg-white hover:border-accent-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all cursor-default">
          <div className="mt-0.5 w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineCalendarDays className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Most Productive Day</p>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">Tuesdays show a 24% higher completion rate. Try scheduling complex tasks here.</p>
          </div>
        </div>

        {/* Insight 2 */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface/50 border border-border/40 hover:bg-white hover:border-success-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all cursor-default">
          <div className="mt-0.5 w-7 h-7 rounded-lg bg-success-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineCheckCircle className="h-4 w-4 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Stellar Completion Rate</p>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">You're hitting 85% of your weekly goals. Keep up the momentum!</p>
          </div>
        </div>

        {/* Insight 3 */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface/50 border border-border/40 hover:bg-white hover:border-warning-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all cursor-default">
          <div className="mt-0.5 w-7 h-7 rounded-lg bg-warning-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineClock className="h-4 w-4 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Pending Tasks</p>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">You have 4 high-priority tasks pending for this week. Focus on the 'Website Redesign' first.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-accent-600 font-medium text-sm">
            <HiArrowTrendingUp className="h-4 w-4" />
            <span>Productivity Score: 92/100</span>
          </div>
          <button className="text-xs font-bold text-text-primary hover:text-accent-600 transition-colors">
            View Details &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
