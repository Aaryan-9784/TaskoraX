import { useState } from 'react';
import { HiOutlineUserPlus, HiOutlineShieldCheck, HiOutlineTrash, HiOutlinePencilSquare, HiOutlineCheckCircle } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import Select from '../../../common/Select';
import Modal from '../../../common/Modal';
import api from '../../../../services/api';
import { useAuth } from '../../../../context/AuthContext';

const TeamTab = ({ project, onUpdateProject }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');

  const handleInvite = () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    const newMember = {
      id: `u${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role: role,
      status: 'Pending Approval',
      avatar: `https://i.pravatar.cc/150?u=${email}`
    };

    onUpdateProject({
      ...project,
      pendingTeam: [...(project.pendingTeam || []), newMember]
    });

    // Trigger backend to send email
    api.post('/team/invite', {
      email: email.trim(),
      name: name.trim(),
      role: role,
      projectName: project?.name || 'TaskoraX',
      projectId: project._id || project.id,
      memberId: newMember.id
    }).then(() => {
      toast.success(`Invitation email sent to ${email}. Waiting for approval.`);
    }).catch((err) => {
      toast.error('Failed to send invitation email');
      console.error(err);
    });
    closeModal();
  };


  const handleSaveEdit = () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }

    const updatedTeam = (project.team || []).map(m => {
      if ((m._id || m.id) === editingMemberId) {
        return { ...m, name: name.trim(), role: role };
      }
      return m;
    });

    const updatedPending = (project.pendingTeam || []).map(m => {
      if ((m._id || m.id) === editingMemberId) {
        return { ...m, name: name.trim(), role: role };
      }
      return m;
    });

    onUpdateProject({
      ...project,
      team: updatedTeam,
      pendingTeam: updatedPending
    });

    toast.success('Team member updated');
    closeModal();
  };

  const handleEditClick = (member) => {
    setEditingMemberId(member._id || member.id);
    setName(member.name || '');
    setRole(member.role || (member.id === 'u1' ? 'Admin' : 'Member'));
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleRemoveMember = (memberId) => {
    onUpdateProject({
      ...project,
      team: (project.team || []).filter(m => (m._id || m.id) !== memberId),
      pendingTeam: (project.pendingTeam || []).filter(m => (m._id || m.id) !== memberId)
    });
    toast.success('Team member removed');
  };

  const closeModal = () => {
    setName('');
    setEmail('');
    setRole('Member');
    setIsEditMode(false);
    setEditingMemberId(null);
    setIsModalOpen(false);
  };

  const allMembers = [...(project.team || []), ...(project.pendingTeam || [])];

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary">Project Team</h3>
        <Button icon={HiOutlineUserPlus} onClick={() => { setIsEditMode(false); setIsModalOpen(true); }}>Invite Member</Button>
      </div>

      <div className="glass-panel border border-border/40 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-secondary/50 border-b border-border/40 text-xs uppercase tracking-wider text-text-tertiary">
              <th className="px-6 py-4 font-bold">Member</th>
              <th className="px-6 py-4 font-bold">Role</th>
              <th className="px-6 py-4 font-bold">Tasks</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {allMembers && allMembers.length > 0 ? (
              allMembers.map((member) => (
                <tr key={member._id || member.id} className="hover:bg-surface-secondary/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        (() => {
                          const colors = [
                            'bg-primary-500/10 text-primary-600',
                            'bg-success-500/10 text-success-600',
                            'bg-warning-500/10 text-warning-600',
                            'bg-accent-500/10 text-accent-600',
                            'bg-info-500/10 text-info-600'
                          ];
                          if (!member.name) return colors[0];
                          return colors[member.name.charCodeAt(0) % colors.length];
                        })()
                      }`}>
                        {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <span className="text-sm font-semibold text-text-primary">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                      {(member.role === 'Admin' || member.role === 'superadmin' || member.role === 'Super Admin' || member.id === 'u1') && <HiOutlineShieldCheck className="h-4 w-4 text-primary-500" />}
                      {member.role === 'superadmin' ? 'Super Admin' : (member.role || (member.id === 'u1' ? 'Admin' : 'Member'))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">
                      {project.tasksList ? project.tasksList.filter(t => t.assigneeId === (member._id || member.id)).length : 0} Assigned
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {(() => {
                      const isCurrentUser = user && (member._id || member.id) === user._id;
                      const status = isCurrentUser ? 'Online' : (member.status || 'Offline');
                      const isOnline = status === 'Online';
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${isOnline ? 'bg-success-500/10 text-success-500' : 'bg-surface-secondary text-text-secondary'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-success-500' : 'bg-border'}`}></span> {status}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditClick(member)}
                        className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Edit Member"
                      >
                        <HiOutlinePencilSquare className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleRemoveMember(member._id || member.id)}
                        className="p-2 text-text-tertiary hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                        title="Remove Member"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-text-secondary text-sm">
                  No team members found. Invite someone to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={isEditMode ? "Edit Team Member" : "Invite Team Member"} overflowVisible={true}>
        <div className="space-y-4">
          <Input 
            label="Name" 
            placeholder="John Doe" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {!isEditMode && (
            <Input 
              label="Email Address" 
              placeholder="colleague@example.com" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
            />
          )}
          <Select 
            label="Access Rights / Role"
            options={[
              { value: 'User', label: 'User (Standard Member)' },
              { value: 'Manager', label: 'Manager (Team & Projects)' },
              { value: 'Admin', label: 'Admin (Full System Control)' }
            ]}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-6">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button onClick={isEditMode ? handleSaveEdit : handleInvite}>
              {isEditMode ? "Save Changes" : "Send Invitation"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamTab;
