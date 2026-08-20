import { useTask } from '../../context/TaskContext';

const getRoleDisplay = (role) => {
  const r = (role || '').toLowerCase();
  if (r === 'admin' || r === 'superadmin') return 'Admin';
  if (r === 'manager') return 'Manager';
  return 'User';
};

const TeamWorkloadBoard = ({ members }) => {
  const { allTasks } = useTask();
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-border/50 h-full flex flex-col">
      <div className="p-5 border-b border-border/50 bg-surface-secondary/30 shrink-0">
        <h3 className="text-lg font-bold text-text-primary">Team Workload</h3>
        <p className="text-xs text-text-tertiary mt-1">Monitor capacity and distribute tasks fairly.</p>
      </div>
      <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-6">
          {(members || []).map((member, index) => {
            const memberId = member?._id || member?.id || `member-${index}`;
            const memberName = member?.name || member?.email || 'Team Member';
            const memberTasks = (allTasks || []).filter(t => {
              const assigneeId = t.assignee?._id || t.assignee;
              return assigneeId === memberId;
            });
            const pendingCount = memberTasks.filter(t => t.status !== 'Done').length;
            const workloadPct = Math.min((pendingCount / 10) * 100, 100); // Base 100% on 10 tasks

            let statusColor = 'bg-success-500';
            let barColor = 'bg-success-500';
            let statusText = 'Balanced';
            
            if (workloadPct > 85) {
              statusColor = 'bg-danger-500';
              barColor = 'bg-danger-500';
              statusText = 'Overloaded';
            } else if (workloadPct > 65) {
              statusColor = 'bg-warning-500';
              barColor = 'bg-warning-500';
              statusText = 'Busy';
            }

            return (
              <div key={memberId} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-border bg-surface-secondary flex items-center justify-center text-text-primary font-bold text-sm">
                      {memberName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{memberName}</p>
                      <p className="text-[10px] text-text-tertiary font-medium">{getRoleDisplay(member?.role)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-0.5">
                      <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                      <span className="text-xs font-bold text-text-primary">{statusText}</span>
                    </div>
                    <p className="text-[10px] text-text-tertiary font-medium">{pendingCount} pending tasks</p>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-surface-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min(workloadPct, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamWorkloadBoard;
