import { HiOutlineDocumentText, HiOutlineArrowDownTray } from 'react-icons/hi2';

const BottomSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Recent Performance Summary */}
      <div className="card-premium relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-success-500/5 rounded-full blur-2xl -z-10 group-hover:bg-success-500/10 transition-colors duration-700"></div>
        <h3 className="text-lg font-bold text-text-primary mb-5">Recent Performance</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary font-medium">Tasks Completed (7 days)</span>
              <span className="text-sm font-bold text-text-primary">32</span>
            </div>
            <div className="w-full bg-surface-secondary rounded-full h-2.5 overflow-hidden border border-border/40 shadow-inner">
              <div className="bg-gradient-to-r from-success-400 to-success-600 h-2.5 rounded-full relative" style={{ width: '75%' }}>
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/30 blur-[1px]"></div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary font-medium">Hours Tracked (7 days)</span>
              <span className="text-sm font-bold text-text-primary">24.5h</span>
            </div>
            <div className="w-full bg-surface-secondary rounded-full h-2.5 overflow-hidden border border-border/40 shadow-inner">
              <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-2.5 rounded-full relative" style={{ width: '60%' }}>
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/30 blur-[1px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Progress Comparison */}
      <div className="card-premium flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-500/5 rounded-full blur-2xl -z-10 group-hover:bg-accent-500/10 transition-colors duration-700"></div>
        <div>
          <h3 className="text-lg font-bold text-text-primary mb-1">Monthly Progress</h3>
          <p className="text-sm text-text-tertiary mb-5">How you compare to last month</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border/40 hover:bg-white hover:border-accent-200 transition-colors hover:shadow-sm cursor-default">
              <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-500"></span>
                This Month
              </p>
              <p className="text-3xl font-extrabold text-text-primary group-hover:text-accent-600 transition-colors">124</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border/40 hover:bg-white transition-colors hover:shadow-sm cursor-default">
              <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-border"></span>
                Last Month
              </p>
              <p className="text-3xl font-extrabold text-text-primary">98</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors border border-border/60">
            <HiOutlineDocumentText className="h-4 w-4" />
            View Full Log
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-sm">
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSummary;
