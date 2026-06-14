import { useState } from 'react';
import { 
  HiOutlineUserPlus, 
  HiOutlineMagnifyingGlass, 
  HiOutlineFunnel, 
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowDownTray
} from 'react-icons/hi2';

// Team Components
import TeamOverviewCards from '../components/team/TeamOverviewCards';
import TeamDirectory from '../components/team/TeamDirectory';
import TeamWorkloadBoard from '../components/team/TeamWorkloadBoard';
import TeamPerformance from '../components/team/TeamPerformance';
import TeamActivityFeed from '../components/team/TeamActivityFeed';
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
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);

  // Filter members based on search
  const filteredMembers = MOCK_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 lg:p-8 overflow-y-auto custom-scrollbar bg-surface-secondary/20 relative min-h-screen">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight font-display mb-1">Team Workspace</h1>
          <p className="text-sm text-text-secondary">Manage members, monitor workloads, and collaborate efficiently.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface-primary border border-border text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-xl text-sm font-bold shadow-soft transition-all">
            <HiOutlineArrowDownTray className="w-4 h-4" /> Export Report
          </button>
          <button 
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-bold shadow-soft hover:shadow-glow transition-all"
            onClick={() => setIsAssignmentOpen(true)}
          >
            <HiOutlineUserPlus className="w-4 h-4" /> Invite Member
          </button>
        </div>
      </div>

      {/* Top Cards */}
      <TeamOverviewCards />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Left Column: Directory & Projects (Takes 2/3 space on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Controls */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by name, role, or department..." 
                className="w-full pl-10 pr-4 py-2.5 bg-surface-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-text-primary placeholder:text-text-tertiary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-primary border border-border hover:bg-surface-secondary text-text-secondary hover:text-text-primary rounded-xl text-sm font-bold transition-all">
                <HiOutlineFunnel className="w-4 h-4" /> Filter
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-primary border border-border hover:bg-surface-secondary text-text-secondary hover:text-text-primary rounded-xl text-sm font-bold transition-all">
                <HiOutlineAdjustmentsHorizontal className="w-4 h-4" /> Sort
              </button>
            </div>
          </div>

          <TeamDirectory 
            members={filteredMembers} 
            onMemberClick={(member) => setSelectedMember(member)} 
          />

          <ProjectCollaboration projects={MOCK_PROJECTS} />
        </div>

        {/* Right Column: Workload, Performance, Activity (Takes 1/3 space) */}
        <div className="space-y-6">
          <TeamWorkloadBoard members={MOCK_MEMBERS} />
          <div className="h-[320px]">
            <TeamPerformance />
          </div>
          <div className="h-[400px]">
            <TeamActivityFeed activities={MOCK_ACTIVITIES} />
          </div>
        </div>

      </div>

      {/* Drawers and Modals */}
      <MemberProfileDrawer 
        member={selectedMember} 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />

      <TaskAssignmentPanel 
        members={MOCK_MEMBERS}
        isOpen={isAssignmentOpen}
        onClose={() => setIsAssignmentOpen(false)}
      />

    </div>
  );
};

export default TeamPage;
