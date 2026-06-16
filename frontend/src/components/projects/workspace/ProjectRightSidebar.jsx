import { useState, useEffect } from 'react';
import { HiOutlineCalendar, HiOutlineDocumentText, HiOutlineCheckCircle } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const ProjectRightSidebar = ({ project, onUpdateProject }) => {
  const [noteText, setNoteText] = useState(project.quickNote || '');
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if project note changes externally
  useEffect(() => {
    setNoteText(project.quickNote || '');
  }, [project.quickNote]);

  const handleSaveNote = () => {
    if (noteText !== (project.quickNote || '')) {
      setIsSaving(true);
      if (onUpdateProject) {
        onUpdateProject({
          ...project,
          quickNote: noteText
        });
        toast.success('Notes saved successfully', { id: 'quick-note-save' });
      }
      setTimeout(() => setIsSaving(false), 500);
    }
  };

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
          time: 'Pending Task',
          isTask: true
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
        if (file.url.startsWith('data:')) {
          const arr = file.url.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          const blobUrl = URL.createObjectURL(blob);
          const newWindow = window.open(blobUrl, '_blank', 'noopener,noreferrer');
          if (!newWindow) {
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = file.name;
            a.click();
            toast.error('Popup blocked. Downloading file instead.');
          }
          setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        } else {
          const newWindow = window.open(file.url, '_blank', 'noopener,noreferrer');
          if (!newWindow) {
            const a = document.createElement('a');
            a.href = file.url;
            a.download = file.name;
            a.click();
            toast.error('Popup blocked. Downloading file instead.');
          }
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
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  deadline.isTask 
                    ? 'bg-warning-500/10 text-warning-500 group-hover:bg-warning-500/20' 
                    : 'bg-primary-500/10 text-primary-500 group-hover:bg-primary-500/20'
                }`}>
                  {deadline.isTask ? <HiOutlineCheckCircle className="h-5 w-5" /> : <HiOutlineCalendar className="h-5 w-5" />}
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
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xs font-bold text-text-tertiary uppercase tracking-wider">Quick Notes</h4>
            {isSaving && <span className="text-xs font-medium text-success-500 animate-pulse">Saving...</span>}
          </div>
          <div className="relative group">
            <textarea
              className="w-full p-4 rounded-xl bg-surface-secondary border border-border/40 text-sm text-text-primary focus:outline-none focus:border-primary-500 focus:bg-surface-primary focus:ring-4 focus:ring-primary-500/10 transition-all leading-relaxed resize-none min-h-[140px] custom-scrollbar placeholder:text-text-tertiary"
              placeholder={`Keep important reminders and brief notes about ${project.name} here...`}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onBlur={handleSaveNote}
            />
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
