import { HiOutlineChatBubbleLeftEllipsis, HiOutlineClipboardDocumentList, HiOutlinePencilSquare } from 'react-icons/hi2';

const roleColors = {
  Owner: 'bg-accent-100 text-accent-700 border-accent-200',
  Admin: 'bg-primary-100 text-primary-700 border-primary-200',
  Manager: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  Member: 'bg-surface-tertiary text-text-secondary border-border',
};

const statusColors = {
  Online: 'bg-success-500',
  Busy: 'bg-danger-500',
  Away: 'bg-warning-500',
  Offline: 'bg-text-tertiary',
};

const TeamDirectory = ({ members, onMemberClick }) => {
  if (!members || members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl text-center">
        <div className="w-32 h-32 mb-6">
          <svg className="w-full h-full text-text-tertiary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">No members found</h3>
        <p className="text-text-secondary max-w-md mx-auto mb-6">Build your team and collaborate more effectively. Invite members to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {members.map((member) => (
        <div 
          key={member.id} 
          className="glass-panel p-5 rounded-2xl hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
          onClick={() => onMemberClick(member)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              <img 
                src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`} 
                alt={member.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-surface-primary shadow-sm group-hover:scale-105 transition-transform" 
              />
              <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-surface-primary rounded-full ${statusColors[member.status]}`}></div>
            </div>
            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${roleColors[member.role]}`}>
              {member.role}
            </span>
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
              <p className="text-sm font-extrabold text-success-600">{member.productivityScore}%</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-surface-secondary hover:bg-surface-tertiary text-text-secondary text-xs font-bold rounded-lg transition-colors"
               onClick={(e) => { e.stopPropagation(); /* handle task assign */ }}
            >
              <HiOutlineClipboardDocumentList className="w-4 h-4" />
              Assign
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-primary-50 hover:bg-primary-100 text-primary-600 text-xs font-bold rounded-lg transition-colors"
               onClick={(e) => { e.stopPropagation(); /* handle message */ }}
            >
              <HiOutlineChatBubbleLeftEllipsis className="w-4 h-4" />
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamDirectory;
