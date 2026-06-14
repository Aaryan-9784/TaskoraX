const TeamWorkloadBoard = ({ members }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-border/50">
      <div className="p-5 border-b border-border/50 bg-surface-secondary/30">
        <h3 className="text-lg font-bold text-text-primary">Team Workload</h3>
        <p className="text-xs text-text-tertiary mt-1">Monitor capacity and distribute tasks fairly.</p>
      </div>
      <div className="p-5">
        <div className="space-y-6">
          {members.map((member) => {
            const workloadPct = member.workloadPercentage || 0;
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
              <div key={member.id} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`} alt={member.name} className="w-8 h-8 rounded-full border border-border" />
                    <div>
                      <p className="text-sm font-bold text-text-primary">{member.name}</p>
                      <p className="text-[10px] text-text-tertiary font-medium">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-0.5">
                      <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                      <span className="text-xs font-bold text-text-primary">{statusText}</span>
                    </div>
                    <p className="text-[10px] text-text-tertiary font-medium">{member.pendingTasks} pending tasks</p>
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
