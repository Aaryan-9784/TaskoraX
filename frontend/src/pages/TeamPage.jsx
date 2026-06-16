import { useState, useEffect } from 'react';
import { 
  HiOutlineUserPlus, 
  HiOutlineMagnifyingGlass, 
  HiOutlineFunnel, 
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowDownTray,
  HiOutlineCheckCircle
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';

// Team Components
import TeamOverviewCards from '../components/team/TeamOverviewCards';
import TeamDirectory from '../components/team/TeamDirectory';
import TeamWorkloadBoard from '../components/team/TeamWorkloadBoard';
import TeamPerformance from '../components/team/TeamPerformance';
import MemberProfileDrawer from '../components/team/MemberProfileDrawer';
import TaskAssignmentPanel from '../components/team/TaskAssignmentPanel';
import ProjectCollaboration from '../components/team/ProjectCollaboration';

// Mock Data
const MOCK_MEMBERS = [
  { id: '1', name: 'Sarah Jenkins', role: 'Owner', department: 'Executive', status: 'Online', assignedTasks: 12, completedTasks: 142, pendingTasks: 4, productivityScore: 98, workloadPercentage: 45, email: 'sarah@taskorax.com' },
  { id: '2', name: 'David Chen', role: 'Admin', department: 'Engineering', status: 'Busy', assignedTasks: 28, completedTasks: 89, pendingTasks: 15, productivityScore: 92, workloadPercentage: 90, email: 'david@taskorax.com' },
  { id: '3', name: 'Emily Davis', role: 'Manager', department: 'Design', status: 'Online', assignedTasks: 18, completedTasks: 112, pendingTasks: 6, productivityScore: 95, workloadPercentage: 60, email: 'emily@taskorax.com' },
  { id: '4', name: 'Michael Brown', role: 'Member', department: 'Engineering', status: 'Away', assignedTasks: 22, completedTasks: 76, pendingTasks: 8, productivityScore: 88, workloadPercentage: 75, email: 'michael@taskorax.com' },
  { id: '5', name: 'Jessica Wilson', role: 'Member', department: 'Marketing', status: 'Offline', assignedTasks: 15, completedTasks: 95, pendingTasks: 5, productivityScore: 91, workloadPercentage: 50, email: 'jessica@taskorax.com' },
];

const MOCK_ACTIVITIES = [
  { user: 'David Chen', avatar: '', action: 'completed task', target: 'API Integration', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { user: 'Emily Davis', avatar: '', action: 'commented on', target: 'Homepage Redesign', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
  { user: 'Sarah Jenkins', avatar: '', action: 'assigned a task to', target: 'Michael Brown', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { user: 'Jessica Wilson', avatar: '', action: 'uploaded file', target: 'Q3_Marketing_Plan.pdf', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
];

const MOCK_PROJECTS = [
  { name: 'Website Redesign', status: 'On Track', progress: 75, dueDate: 'Oct 24', members: ['Sarah Jenkins', 'Emily Davis', 'David Chen'] },
  { name: 'Q3 Marketing', status: 'At Risk', progress: 40, dueDate: 'Nov 12', members: ['Jessica Wilson', 'Sarah Jenkins'] },
];

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('taskorax_team_members');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MOCK_MEMBERS;
      }
    }
    return MOCK_MEMBERS;
  });
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [assigningMember, setAssigningMember] = useState(null);
  
  // New States for Buttons
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');
  
  const [showFilterDrop, setShowFilterDrop] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const filterOptions = ['All', 'Engineering', 'Design', 'Marketing', 'Executive'];

  const [showSortDrop, setShowSortDrop] = useState(false);
  const [activeSort, setActiveSort] = useState('Name');
  const sortOptions = ['Name', 'Productivity', 'Workload', 'Tasks'];

  useEffect(() => {
    localStorage.setItem('taskorax_team_members', JSON.stringify(members));
  }, [members]);

  // Button Handlers
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Name,Role,Department,Status,Assigned Tasks,Productivity\n" + 
      members.map(m => `${m.name},${m.role},${m.department},${m.status},${m.assignedTasks},${m.productivityScore}%`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "team_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Report exported successfully');
  };

  const handleSendInvite = () => {
    if (!inviteEmail || !inviteEmail.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    const newMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      role: inviteRole,
      department: 'General',
      status: 'Pending',
      assignedTasks: 0, completedTasks: 0, pendingTasks: 0, productivityScore: 0, workloadPercentage: 0,
      email: inviteEmail
    };
    setMembers([...members, newMember]);
    toast.success(`Invitation sent to ${inviteEmail}`);
    setIsInviteOpen(false);
    setInviteEmail('');
  };

  const handleAssignClick = (member) => {
    setAssigningMember(member);
    setIsAssignmentOpen(true);
  };

  const handleMessageClick = (member) => {
    window.location.href = `mailto:${member.email || ''}?subject=TaskoraX: Direct Message`;
  };

  const handleDeleteMember = (memberId) => {
    setMembers(members.filter(m => m.id !== memberId));
    toast.success('Member removed successfully');
  };

  // Filter & Sort Logic
  let processedMembers = members.filter(m => 
    (m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeFilter === 'All' || m.department === activeFilter)
  );

  if (activeSort === 'Productivity') processedMembers.sort((a, b) => b.productivityScore - a.productivityScore);
  else if (activeSort === 'Workload') processedMembers.sort((a, b) => b.workloadPercentage - a.workloadPercentage);
  else if (activeSort === 'Tasks') processedMembers.sort((a, b) => b.assignedTasks - a.assignedTasks);
  else processedMembers.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Team Workspace</h1>
          <p className="text-sm text-text-secondary mt-1">Manage members, monitor workloads, and collaborate efficiently.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={HiOutlineArrowDownTray} className="hidden sm:flex" onClick={handleExport}>
            Export Report
          </Button>
          <Button icon={HiOutlineUserPlus} onClick={() => setIsInviteOpen(true)}>
            Invite Member
          </Button>
        </div>
      </div>

      {/* Controls (Full Width) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border/40">
        <div className="relative w-full sm:max-w-md">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name, role, or department..." 
            className="input-field pl-10 w-full sm:max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Button variant="secondary" icon={HiOutlineFunnel} className="w-full sm:w-auto" onClick={() => { setShowFilterDrop(!showFilterDrop); setShowSortDrop(false); }}>
              Filter: {activeFilter}
            </Button>
            {showFilterDrop && (
              <div className="absolute top-full mt-2 left-0 w-48 bg-surface-primary/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl shadow-black/5 z-50 p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-0.5">
                  {filterOptions.map(opt => (
                    <button key={opt} onClick={() => { setActiveFilter(opt); setShowFilterDrop(false); }} className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all ${activeFilter === opt ? 'bg-primary-500/10 text-primary-600' : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/80'}`}>
                      {opt} {activeFilter === opt && <HiOutlineCheckCircle className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative w-full sm:w-auto">
            <Button variant="secondary" icon={HiOutlineAdjustmentsHorizontal} className="w-full sm:w-auto" onClick={() => { setShowSortDrop(!showSortDrop); setShowFilterDrop(false); }}>
              Sort: {activeSort}
            </Button>
            {showSortDrop && (
              <div className="absolute top-full mt-2 right-0 w-48 bg-surface-primary/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl shadow-black/5 z-50 p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-0.5">
                  {sortOptions.map(opt => (
                    <button key={opt} onClick={() => { setActiveSort(opt); setShowSortDrop(false); }} className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all ${activeSort === opt ? 'bg-primary-500/10 text-primary-600' : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/80'}`}>
                      {opt} {activeSort === opt && <HiOutlineCheckCircle className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="animate-in animate-in-delay-1">
        <TeamOverviewCards />
      </div>

      {/* Main Directory Area (Full Width) */}
      <div className="animate-in animate-in-delay-2 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary">Team Directory</h2>
        </div>
        <TeamDirectory 
          members={processedMembers} 
          onMemberClick={(member) => setSelectedMember(member)} 
          onAssignClick={handleAssignClick}
          onMessageClick={handleMessageClick}
          onDeleteClick={handleDeleteMember}
        />
      </div>

      {/* Analytics & Workload (Balanced 50/50 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 animate-in animate-in-delay-3">
        <div>
          <TeamWorkloadBoard members={members} />
        </div>
        <div className="h-[400px]">
          <TeamPerformance />
        </div>
      </div>

      {/* Projects */}
      <div className="pt-4 animate-in animate-in-delay-4">
        <ProjectCollaboration projects={MOCK_PROJECTS} />
      </div>

      {/* Drawers and Modals */}
      <MemberProfileDrawer 
        member={selectedMember} 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />

      <TaskAssignmentPanel 
        members={members}
        isOpen={isAssignmentOpen}
        onClose={() => { setIsAssignmentOpen(false); setAssigningMember(null); }}
        initialAssignee={assigningMember?.id || ''}
      />

      <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Invite Team Member">
        <div className="space-y-4">
          <Input 
            label="Email Address" 
            placeholder="colleague@taskorax.com" 
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5">Role</label>
            <select 
              className="w-full bg-surface-primary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 text-text-primary"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
            >
              <option value="Member">Member</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-6">
            <Button variant="secondary" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
            <Button onClick={handleSendInvite}>Send Invitation</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default TeamPage;
