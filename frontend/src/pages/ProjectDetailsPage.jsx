import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineCog6Tooth } from 'react-icons/hi2';
import Button from '../components/common/Button';
import ProjectWorkspaceTabs from '../components/projects/workspace/ProjectWorkspaceTabs';
import OverviewTab from '../components/projects/workspace/tabs/OverviewTab';
import TasksTab from '../components/projects/workspace/tabs/TasksTab';
import TeamTab from '../components/projects/workspace/tabs/TeamTab';
import TimelineTab from '../components/projects/workspace/tabs/TimelineTab';
import FilesTab from '../components/projects/workspace/tabs/FilesTab';
import ActivityTab from '../components/projects/workspace/tabs/ActivityTab';
import ProjectRightSidebar from '../components/projects/workspace/ProjectRightSidebar';
import { mockProjects } from '../utils/mockProjects';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Simulate fetching project
    const found = mockProjects.find((p) => p.id === id);
    setProject(found);
  }, [id]);

  if (!project) return null; // Or a loading spinner

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] -m-6 animate-fade-in">
      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface-primary">
        {/* Workspace Header */}
        <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/projects')}
              className="p-2 text-text-tertiary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
            >
              <HiOutlineArrowLeft className="h-5 w-5" />
            </button>
            <div className={`w-3 h-3 rounded-full ${project.coverColor}`} />
            <div>
              <h1 className="text-xl font-bold text-text-primary leading-tight">{project.name}</h1>
              <span className="text-xs text-text-secondary font-medium">{project.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" icon={HiOutlineCog6Tooth}>Settings</Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <ProjectWorkspaceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-surface-secondary/20">
          {activeTab === 'overview' && <OverviewTab project={project} />}
          {activeTab === 'tasks' && <TasksTab project={project} />}
          {activeTab === 'team' && <TeamTab project={project} />}
          {activeTab === 'timeline' && <TimelineTab project={project} />}
          {activeTab === 'files' && <FilesTab project={project} />}
          {activeTab === 'activity' && <ActivityTab project={project} />}
        </div>
      </div>

      {/* Right Sidebar */}
      <ProjectRightSidebar project={project} />
    </div>
  );
};

export default ProjectDetailsPage;
