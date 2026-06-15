import { useState } from 'react';
import { 
  HiOutlineCheck, 
  HiOutlineChatBubbleLeftEllipsis, 
  HiOutlineDocumentText, 
  HiOutlineUserPlus,
  HiOutlineExclamationCircle,
  HiOutlineBellSlash
} from 'react-icons/hi2';

const NotificationsPopup = ({ isOpen, onClose, domNode }) => {
  const [activeTab, setActiveTab] = useState('All');
  
  if (!isOpen) return null;

  const tabs = ['All', 'Tasks', 'Team', 'System'];

  const notifications = [
    { id: 1, type: 'task', title: 'New Task Assigned', desc: 'Sarah assigned you "Design Landing Page"', time: '5m ago', icon: HiOutlineDocumentText, color: 'text-primary-500', bg: 'bg-primary-50', unread: true },
    { id: 2, type: 'team', title: 'Team Invitation', desc: 'Alex invited you to "Marketing Team"', time: '1h ago', icon: HiOutlineUserPlus, color: 'text-accent-500', bg: 'bg-accent-50', unread: true },
    { id: 3, type: 'mention', title: 'Mentioned in comment', desc: 'David mentioned you in "API Integration"', time: '2h ago', icon: HiOutlineChatBubbleLeftEllipsis, color: 'text-warning-500', bg: 'bg-warning-50', unread: false },
    { id: 4, type: 'system', title: 'System Update', desc: 'TaskoraX v2.4 has been successfully deployed.', time: '1d ago', icon: HiOutlineExclamationCircle, color: 'text-success-500', bg: 'bg-success-50', unread: false },
  ];

  const filteredNotifs = activeTab === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab.toLowerCase() || (activeTab === 'System' && n.type === 'system') || (activeTab === 'Team' && n.type === 'mention'));

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div 
      ref={domNode}
      className="absolute top-16 right-0 mt-2 w-[380px] max-w-[calc(100vw-2rem)] glass-panel rounded-2xl shadow-card-hover border border-border/60 z-50 animate-scale-in origin-top-right flex flex-col overflow-hidden"
    >
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-danger-100 text-danger-600 text-[10px] font-bold">
                {unreadCount} new
              </span>
            )}
          </div>
          <button className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
            <HiOutlineCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap
                ${activeTab === tab 
                  ? 'bg-surface-secondary text-text-primary shadow-sm border border-border/60' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50 border border-transparent'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-[360px] overflow-y-auto overscroll-contain custom-scrollbar bg-surface-primary/50">
        {filteredNotifs.length > 0 ? (
          <div className="flex flex-col">
            {filteredNotifs.map(notif => {
              const Icon = notif.icon;
              return (
                <div 
                  key={notif.id} 
                  className={`p-4 flex gap-3 hover:bg-surface-secondary transition-colors cursor-pointer border-b border-border/30 last:border-0 relative
                    ${notif.unread ? 'bg-primary-50/20' : ''}`}
                >
                  {notif.unread && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-500"></div>
                  )}
                  <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.bg} ${notif.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary mb-0.5">{notif.title}</p>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{notif.desc}</p>
                    <p className="text-[10px] font-medium text-text-tertiary mt-1.5">{notif.time}</p>
                  </div>
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
            <p className="text-xs text-text-secondary max-w-[200px]">You're all caught up! Check back later for new updates.</p>
          </div>
        )}
      </div>
      
      {filteredNotifs.length > 0 && (
        <div className="p-3 border-t border-border/40 bg-surface-primary/80 backdrop-blur-sm">
          <button className="w-full py-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors text-center">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPopup;
