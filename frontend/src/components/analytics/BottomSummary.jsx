import { HiOutlineDocumentText, HiOutlineArrowDownTray, HiOutlineExclamationTriangle, HiOutlineSparkles } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTask } from '../../context/TaskContext';
import { useProjects } from '../../context/ProjectContext';
import { useMemo } from 'react';

const BottomSummary = () => {
  const navigate = useNavigate();
  const { allTasks = [] } = useTask();
  const { projects = [] } = useProjects();

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Project,Tasks,Progress\n";
    if (projects.length === 0) {
      csvContent += "No projects available,0,0%\n";
    } else {
      projects.forEach(p => {
        const total = p.tasks?.total || 0;
        const completed = p.tasks?.completed || 0;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
        // Escape commas in project names
        const name = p.name.includes(',') ? `"${p.name}"` : p.name;
        csvContent += `${name},${total},${progress}%\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "projects_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported successfully');
  };

  const topProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => (b.tasks?.total || 0) - (a.tasks?.total || 0))
      .slice(0, 3);
  }, [projects]);

  const { thisMonthCompleted, lastMonthCompleted } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    let thisMonth = 0;
    let lastMonthCount = 0;

    allTasks.forEach(t => {
      if (t.status === 'Done') {
        const d = new Date(t.updatedAt || t.createdAt || 0);
        if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
          thisMonth++;
        } else if (d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear) {
          lastMonthCount++;
        }
      }
    });

    return { thisMonthCompleted: thisMonth, lastMonthCompleted: lastMonthCount };
  }, [allTasks]);

  const getProjectColors = (index) => {
    const colors = [
      { text: 'group-hover/item:text-primary-600', bg: 'bg-primary-500', shadow: 'shadow-[0_0_8px_rgba(var(--color-primary-500),0.4)]', from: 'from-primary-400', to: 'to-primary-600' },
      { text: 'group-hover/item:text-accent-600', bg: 'bg-accent-500', shadow: 'shadow-[0_0_8px_rgba(var(--color-accent-500),0.4)]', from: 'from-accent-400', to: 'to-accent-600' },
      { text: 'group-hover/item:text-success-600', bg: 'bg-success-500', shadow: 'shadow-[0_0_8px_rgba(var(--color-success-500),0.4)]', from: 'from-success-400', to: 'to-success-600' },
    ];
    return colors[index % colors.length];
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
          {topProjects.length > 0 ? topProjects.map((project, index) => {
            const colors = getProjectColors(index);
            const total = project.tasks?.total || 0;
            const completed = project.tasks?.completed || 0;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <div key={project.id || index} className="group/item">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-bold text-text-primary flex items-center gap-2 ${colors.text} transition-colors`}>
                    <span className={`w-2 h-2 rounded-full ${colors.bg} ${colors.shadow}`}></span>
                    {project.name}
                  </span>
                  <span className="text-sm font-bold text-text-secondary">{total} tasks</span>
                </div>
                <div className="w-full bg-surface-secondary rounded-full h-2 overflow-hidden border border-border/40 shadow-inner">
                  <div className={`bg-gradient-to-r ${colors.from} ${colors.to} h-2 rounded-full relative`} style={{ width: `${progress}%` }}>
                    <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/30 blur-[1px]"></div>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="text-sm text-text-tertiary">No projects available.</div>
          )}
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
              <p className="text-3xl font-extrabold text-text-primary group-hover:text-accent-600 transition-colors">{thisMonthCompleted}</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border/40 hover:bg-white transition-colors hover:shadow-sm cursor-default">
              <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-border"></span>
                Last Month
              </p>
              <p className="text-3xl font-extrabold text-text-primary">{lastMonthCompleted}</p>
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

