import { HiOutlineUserPlus, HiOutlineShieldCheck } from 'react-icons/hi2';
import Button from '../../../common/Button';

const TeamTab = ({ project }) => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary">Project Team</h3>
        <Button icon={HiOutlineUserPlus}>Invite Member</Button>
      </div>

      <div className="glass-panel border border-border/40 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-secondary/50 border-b border-border/40 text-xs uppercase tracking-wider text-text-tertiary">
              <th className="px-6 py-4 font-bold">Member</th>
              <th className="px-6 py-4 font-bold">Role</th>
              <th className="px-6 py-4 font-bold">Tasks</th>
              <th className="px-6 py-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {project.team.map((member) => (
              <tr key={member.id} className="hover:bg-surface-secondary/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-semibold text-text-primary">{member.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                    {member.id === 'u1' && <HiOutlineShieldCheck className="h-4 w-4 text-primary-500" />}
                    {member.id === 'u1' ? 'Admin' : 'Member'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{Math.floor(Math.random() * 10)} Assigned</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-success-500/10 text-success-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-500"></span> Online
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTab;
