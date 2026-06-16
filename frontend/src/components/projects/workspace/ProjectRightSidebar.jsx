import { HiOutlineCalendar, HiOutlineDocumentText } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const ProjectRightSidebar = ({ project }) => {
  const getUpcomingDeadlines = () => {
    let deadlines = [];
    if (project.dueDate) {
      deadlines.push({
        id: 'main-due',
        title: 'Project Due Date',
        time: new Date(project.dueDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
      });
    }
    
    // Add tasks as deadlines if they exist
    if (project.tasksList) {
      const todoTasks = project.tasksList.filter(t => t.status !== 'Done').slice(0, 2);
      todoTasks.forEach(t => {
        deadlines.push({
          id: t.id,
          title: t.name,
          time: 'Pending Task'
        });
      });
    }
    
    if (deadlines.length === 0) {
      deadlines.push({
        id: 'default',
        title: 'No upcoming deadlines',
        time: 'All caught up!'
      });
    }
    return deadlines.slice(0, 3);
  };

  const getRecentFiles = () => {
    if (project.files && project.files.length > 0) {
      // Sort by latest and take top 3
      return [...project.files].reverse().slice(0, 3);
    }
    return [];
  };

  const handleOpenFile = (file) => {
    if (file.url) {
      try {
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<iframe src="${file.url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
        } else {
          window.location.href = file.url;
        }
      } catch (err) {
        const a = document.createElement('a');
        a.href = file.url;
        a.download = file.name;
        a.click();
      }
    } else {
      toast.success(`Opened ${file.name}`);
    }
  };

  const deadlines = getUpcomingDeadlines();
  const recentFiles = getRecentFiles();

  return (
    <div className="w-80 border-l border-border/40 bg-surface-primary flex flex-col h-full animate-fade-in custom-scrollbar overflow-y-auto">
      <div className="p-6 space-y-8">
        
        {/* Deadlines */}
        <div>
          <h4 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">Upcoming Deadlines</h4>
          <div className="space-y-3">
            {deadlines.map(deadline => (
              <div 
                key={deadline.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-surface-secondary border border-border/40 hover:border-border/80 transition-colors cursor-pointer group"
                onClick={() => toast('Opening deadline details...', { icon: '📅' })}
              >
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 transition-colors">
                  <HiOutlineCalendar className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-sm font-semibold text-text-primary truncate">{deadline.title}</p>
                  <p className="text-xs text-text-secondary mt-1">{deadline.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Notes */}
        <div>
          <h4 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">Quick Notes</h4>
          <div 
            className="p-4 rounded-xl bg-surface-secondary border border-border/40 text-sm text-text-secondary cursor-pointer hover:border-border/80 transition-colors leading-relaxed"
            onClick={() => toast('Opening notes editor...', { icon: '📝' })}
          >
            {project.quickNote || `Keep important reminders and brief notes about ${project.name} here.`}
          </div>
        </div>

        {/* Recent Files */}
        <div>
          <h4 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">Recent Files</h4>
          {recentFiles.length > 0 ? (
            <div className="space-y-3">
              {recentFiles.map((file, idx) => {
                const colorClass = idx % 2 === 0 ? 'bg-accent-500/10 text-accent-500 group-hover:bg-accent-500/20' : 'bg-success-500/10 text-success-500 group-hover:bg-success-500/20';
                return (
                  <div 
                    key={file.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-secondary border border-border/40 hover:border-border/80 transition-colors cursor-pointer group"
                    onClick={() => handleOpenFile(file)}
                  >
                    <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center shrink-0 transition-colors`}>
                      <HiOutlineDocumentText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-text-primary truncate">{file.name}</p>
                      <p className="text-xs text-text-secondary mt-1">Document</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center rounded-xl bg-surface-secondary border border-border/40 border-dashed">
              <p className="text-xs text-text-tertiary font-medium">No files attached yet</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectRightSidebar;
