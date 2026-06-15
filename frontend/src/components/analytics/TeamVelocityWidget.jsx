import { HiOutlineUserGroup, HiOutlineArrowTrendingUp } from 'react-icons/hi2';

const teamMembers = [
  { id: 1, name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=alex', role: 'Frontend', completed: 24, efficiency: 92 },
  { id: 2, name: 'Sam Chen', avatar: 'https://i.pravatar.cc/150?u=sam', role: 'Backend', completed: 18, efficiency: 88 },
  { id: 3, name: 'Taylor Swift', avatar: 'https://i.pravatar.cc/150?u=taylor', role: 'Design', completed: 15, efficiency: 95 },
];

const TeamVelocityWidget = () => {
  return (
    <div className="card-premium h-full flex flex-col group relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-all duration-700"></div>
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
            <HiOutlineUserGroup className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Team Velocity</h3>
            <p className="text-xs text-text-tertiary">Top performers this week</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 relative z-10">
        {teamMembers.map((member, idx) => (
          <div key={member.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-secondary/50 border border-transparent hover:border-border/40 transition-all group/item cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border-2 border-surface object-cover" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-surface rounded-full flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-success-500 rounded-full"></span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary group-hover/item:text-primary-600 transition-colors">{member.name}</p>
                <p className="text-xs text-text-secondary">{member.role}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-extrabold text-text-primary">{member.completed}</p>
              <div className="flex items-center gap-1 text-xs font-medium text-success-600">
                <HiOutlineArrowTrendingUp className="h-3 w-3" />
                <span>{member.efficiency}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm font-bold text-primary-600 hover:bg-primary-50 rounded-xl transition-colors border border-transparent hover:border-primary-100">
        View Full Leaderboard
      </button>
    </div>
  );
};

export default TeamVelocityWidget;
