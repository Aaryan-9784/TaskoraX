import { HiOutlineDocumentText, HiOutlineArrowDownTray } from 'react-icons/hi2';

const BottomSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Recent Performance Summary */}
      <div className="card-premium">
        <h3 className="text-lg font-bold text-text-primary mb-4">Recent Performance</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary font-medium">Tasks Completed (7 days)</span>
            <span className="text-sm font-bold text-text-primary">32</span>
          </div>
          <div className="w-full bg-surface-secondary rounded-full h-2">
            <div className="bg-success-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-text-secondary font-medium">Hours Tracked (7 days)</span>
            <span className="text-sm font-bold text-text-primary">24.5h</span>
          </div>
          <div className="w-full bg-surface-secondary rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      {/* Monthly Progress Comparison */}
      <div className="card-premium flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary mb-2">Monthly Progress</h3>
          <p className="text-sm text-text-tertiary mb-4">How you compare to last month</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border/40">
              <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider mb-1">This Month</p>
              <p className="text-2xl font-extrabold text-text-primary">124</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border/40">
              <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider mb-1">Last Month</p>
              <p className="text-2xl font-extrabold text-text-primary">98</p>
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
