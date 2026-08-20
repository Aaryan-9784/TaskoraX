import { 
  HiOutlineChatBubbleLeftEllipsis, 
  HiOutlineClipboardDocumentList,
  HiOutlineUser,
  HiOutlineTrash
} from 'react-icons/hi2';

const roleColors = {
  Admin: 'bg-danger-100/50 text-danger-700 border-danger-200',
  Manager: 'bg-primary-100/50 text-primary-700 border-primary-200',
  User: 'bg-surface-tertiary text-text-secondary border-border',
};

const statusColors = {
  Online: 'bg-success-500',
  Busy: 'bg-danger-500',
  Away: 'bg-warning-500',
  Offline: 'bg-text-tertiary',
};

const getRoleDisplay = (role) => {
  const r = (role || '').toLowerCase();
  if (r === 'admin' || r === 'superadmin') return 'Admin';
  if (r === 'manager') return 'Manager';
  return 'User';
};

const getRoleColor = (role) => {
  const displayRole = getRoleDisplay(role);
  if (displayRole === 'Admin') return 'bg-danger-100/50 text-danger-700 border-danger-200';
  if (displayRole === 'Manager') return 'bg-primary-100/50 text-primary-700 border-primary-200';
  return 'bg-surface-tertiary text-text-secondary border-border';
};

const TeamDirectory = ({ members, onMemberClick, onAssignClick, onMessageClick, onDeleteClick }) => {
  if (!members || members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl text-center border border-dashed border-border/60">
        <div className="w-20 h-20 mb-5 bg-surface-secondary rounded-full flex items-center justify-center">
          <HiOutlineUser className="w-8 h-8 text-text-tertiary" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">No members found</h3>
        <p className="text-text-secondary max-w-sm mx-auto mb-2">
          We couldn't find any team members matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <p className="text-sm font-medium text-text-secondary">
          Showing <span className="font-bold text-text-primary">{members.length}</span> members
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map((member) => (
              <div 
                key={member._id || member.id} 
                className="glass-panel p-5 rounded-2xl hover:shadow-card-hover transition-all duration-300 cursor-pointer group relative"
                onClick={() => onMemberClick(member)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div 
                      className="w-12 h-12 rounded-full border-2 border-surface-primary shadow-sm group-hover:scale-105 transition-transform bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xl" 
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-surface-primary rounded-full ${statusColors[member.status]}`}></div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${getRoleColor(member.role)}`}>
                      {getRoleDisplay(member.role)}
                    </span>
                    {onDeleteClick && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteClick(member._id || member.id); }}
                        className="text-text-tertiary hover:text-danger-500 hover:bg-danger-50 p-1.5 rounded-full transition-colors"
                        title="Remove Member"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-base font-bold text-text-primary group-hover:text-primary-600 transition-colors">{member.name}</h4>
                  <p className="text-xs font-medium text-text-tertiary">{member.department}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-surface-secondary/50 rounded-xl">
                  <div>
                    <p className="text-[10px] font-bold text-text-tertiary uppercase mb-0.5">Assigned</p>
                    <p className="text-sm font-extrabold text-text-primary">{member.assignedTasks}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-tertiary uppercase mb-0.5">Productivity</p>
                    <p className={`text-sm font-extrabold ${member.productivityScore >= 90 ? 'text-success-600' : member.productivityScore >= 70 ? 'text-warning-600' : 'text-danger-600'}`}>
                      {member.productivityScore}%
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-surface-secondary hover:bg-surface-tertiary text-text-secondary text-xs font-bold rounded-lg transition-colors"
                     onClick={(e) => { e.stopPropagation(); onAssignClick && onAssignClick(member); }}
                  >
                    <HiOutlineClipboardDocumentList className="w-4 h-4" />
                    Assign
                  </button>
                  <a 
                     href={`mailto:${member.email || ''}?subject=TaskoraX: Direct Message`}
                     className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-danger-50 hover:bg-danger-100 text-danger-600 text-xs font-bold rounded-lg transition-colors"
                     onClick={(e) => e.stopPropagation()}
                  >
                    <HiOutlineChatBubbleLeftEllipsis className="w-4 h-4" />
                    Message
                  </a>
                </div>
              </div>
          ))}
        </div>
    </div>
  );
};

export default TeamDirectory;
