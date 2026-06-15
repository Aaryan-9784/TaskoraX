import { HiOutlineDocumentText, HiOutlineArrowDownTray, HiOutlineExclamationTriangle, HiOutlineSparkles } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const BottomSummary = () => {
  const navigate = useNavigate();

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Project,Tasks,Progress\nWebsite Redesign,12,65%\nMobile App V2,8,45%\nMarketing Q4,5,30%";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "projects_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Projects */}
      <div className="card-premium relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl -z-10 group-hover:bg-primary-500/10 transition-colors duration-700"></div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-text-primary">Top Projects</h3>
          <button 
            onClick={() => navigate('/projects')}
            className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-5">
          
          <div className="group/item">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-text-primary flex items-center gap-2 group-hover/item:text-primary-600 transition-colors">
                <span className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(var(--color-primary-500),0.4)]"></span>
                Website Redesign
              </span>
              <span className="text-sm font-bold text-text-secondary">12 tasks</span>
            </div>
            <div className="w-full bg-surface-secondary rounded-full h-2 overflow-hidden border border-border/40 shadow-inner">
              <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full relative" style={{ width: '65%' }}>
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/30 blur-[1px]"></div>
              </div>
            </div>
          </div>

          <div className="group/item">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-text-primary flex items-center gap-2 group-hover/item:text-accent-600 transition-colors">
                <span className="w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(var(--color-accent-500),0.4)]"></span>
                Mobile App V2
              </span>
              <span className="text-sm font-bold text-text-secondary">8 tasks</span>
            </div>
            <div className="w-full bg-surface-secondary rounded-full h-2 overflow-hidden border border-border/40 shadow-inner">
              <div className="bg-gradient-to-r from-accent-400 to-accent-600 h-2 rounded-full relative" style={{ width: '45%' }}>
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/30 blur-[1px]"></div>
              </div>
            </div>
          </div>

          <div className="group/item">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-text-primary flex items-center gap-2 group-hover/item:text-success-600 transition-colors">
                <span className="w-2 h-2 rounded-full bg-success-500 shadow-[0_0_8px_rgba(var(--color-success-500),0.4)]"></span>
                Marketing Q4
              </span>
              <span className="text-sm font-bold text-text-secondary">5 tasks</span>
            </div>
            <div className="w-full bg-surface-secondary rounded-full h-2 overflow-hidden border border-border/40 shadow-inner">
              <div className="bg-gradient-to-r from-success-400 to-success-600 h-2 rounded-full relative" style={{ width: '30%' }}>
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
          <button 
            onClick={() => navigate('/tasks')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors border border-border/60"
          >
            <HiOutlineDocumentText className="h-4 w-4" />
            View Full Log
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-sm"
          >
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSummary;
