import { HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineClock, HiArrowTrendingUp, HiOutlineCalendarDays } from 'react-icons/hi2';

const InsightsPanel = () => {
  return (
    <div className="card-premium h-full flex flex-col bg-gradient-to-br from-surface to-surface-secondary border-accent-200/40 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -z-10 group-hover:bg-accent-500/20 transition-colors duration-700"></div>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
          <HiOutlineSparkles className="h-4 w-4 text-accent-600" />
        </div>
        <h3 className="text-lg font-bold text-text-primary">AI Insights</h3>
      </div>

      <div className="space-y-4 flex-1">
        {/* Insight 1 */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-border/40 hover:bg-surface hover:border-accent-200/50 transition-colors">
          <div className="mt-0.5 w-6 h-6 rounded bg-primary-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineCalendarDays className="h-3.5 w-3.5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Most Productive Day</p>
            <p className="text-xs text-text-secondary mt-0.5">Tuesdays show a 24% higher completion rate. Try scheduling complex tasks here.</p>
          </div>
        </div>

        {/* Insight 2 */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-border/40 hover:bg-surface hover:border-accent-200/50 transition-colors">
          <div className="mt-0.5 w-6 h-6 rounded bg-success-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineCheckCircle className="h-3.5 w-3.5 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Stellar Completion Rate</p>
            <p className="text-xs text-text-secondary mt-0.5">You're hitting 85% of your weekly goals. Keep up the momentum!</p>
          </div>
        </div>

        {/* Insight 3 */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-border/40 hover:bg-surface hover:border-accent-200/50 transition-colors">
          <div className="mt-0.5 w-6 h-6 rounded bg-warning-50 flex items-center justify-center flex-shrink-0">
            <HiOutlineClock className="h-3.5 w-3.5 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Pending Tasks</p>
            <p className="text-xs text-text-secondary mt-0.5">You have 4 high-priority tasks pending for this week. Focus on the 'Website Redesign' first.</p>
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
