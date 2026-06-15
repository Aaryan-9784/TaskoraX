import { useState, useEffect } from 'react';
import { 
  HiOutlineCheck, 
  HiOutlineDocumentText, 
  HiOutlineBellSlash,
  HiOutlinePencilSquare
} from 'react-icons/hi2';
import { useTask } from '../../context/TaskContext';
import { getRelativeTime } from '../../utils/helpers';

const NotificationsPopup = ({ isOpen, onClose, domNode }) => {
  const { allTasks = [] } = useTask();
  const [lastReadTime, setLastReadTime] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('taskora_last_read');
    if (saved) {
      try {
        setLastReadTime(parseInt(saved, 10));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  if (!isOpen) return null;

  // Generate dynamic notifications from tasks
  const sortedTasks = [...allTasks].sort((a, b) => {
    const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
    
    if (timeA !== timeB) {
      return timeB - timeA;
    }
    
    const idA = (a._id || a.id || '').toString();
    const idB = (b._id || b.id || '').toString();
    return idB.localeCompare(idA);
  });

  const recentTasks = sortedTasks.slice(0, 6);

  const notifications = recentTasks.map((task) => {
    const isDone = task.status === 'Done';
    const isNew = task.createdAt === task.updatedAt || !task.updatedAt;
    
    let title = 'Task Updated';
    let desc = `"${task.title}" was updated recently.`;
    let icon = HiOutlinePencilSquare;
    let color = 'text-warning-500';
    let bg = 'bg-warning-50';

    if (isDone) {
      title = 'Task Completed';
      desc = `"${task.title}" has been marked as done.`;
      icon = HiOutlineCheck;
      color = 'text-success-500';
      bg = 'bg-success-50';
    } else if (isNew) {
      title = 'New Task Created';
      desc = `"${task.title}" has been added to the project.`;
      icon = HiOutlineDocumentText;
      color = 'text-primary-500';
      bg = 'bg-primary-50';
    }

    const taskId = task._id || task.id;
    const taskTime = new Date(task.updatedAt || task.createdAt || 0).getTime();

    return {
      id: taskId,
      title,
      desc,
      time: getRelativeTime(task.updatedAt || task.createdAt || new Date()),
      icon,
      color,
      bg,
      unread: taskTime > lastReadTime
    };
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    let maxTime = lastReadTime;
    recentTasks.forEach(task => {
      const taskTime = new Date(task.updatedAt || task.createdAt || 0).getTime();
      if (taskTime > maxTime) maxTime = taskTime;
    });
    setLastReadTime(maxTime);
    localStorage.setItem('taskora_last_read', maxTime.toString());
    window.dispatchEvent(new Event('taskora_read_update'));
  };

  return (
    <div 
      ref={domNode}
      className="absolute top-16 right-0 mt-2 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-elevated border border-border/60 z-50 animate-scale-in origin-top-right flex flex-col overflow-hidden"
    >
      <div className="p-4 border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-text-primary">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded text-primary-600 bg-primary-50 text-[10px] font-bold">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            className="text-xs font-medium text-text-tertiary hover:text-text-primary transition-colors flex items-center gap-1"
          >
            <HiOutlineCheck className="w-3.5 h-3.5" />
            Mark read
          </button>
        )}
      </div>

      <div className="max-h-[360px] overflow-y-auto overscroll-contain custom-scrollbar bg-white">
        {notifications.length > 0 ? (
          <div className="flex flex-col">
            {notifications.map(notif => {
              const Icon = notif.icon;
              return (
                <div 
                  key={notif.id} 
                  className={`p-3.5 flex gap-3 hover:bg-surface-secondary transition-colors cursor-pointer border-b border-border/30 last:border-0
                    ${notif.unread ? 'bg-primary-50/10' : ''}`}
                >
                  <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.bg} ${notif.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <p className="text-sm font-semibold text-text-primary truncate pr-2">{notif.title}</p>
                      <span className="text-[10px] font-medium text-text-tertiary whitespace-nowrap">{notif.time}</span>
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{notif.desc}</p>
                  </div>
                  {notif.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 bg-surface-secondary rounded-full flex items-center justify-center mb-3">
              <HiOutlineBellSlash className="w-6 h-6 text-text-tertiary" />
            </div>
            <p className="text-sm font-semibold text-text-primary mb-1">No notifications</p>
            <p className="text-xs text-text-secondary max-w-[200px]">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPopup;
