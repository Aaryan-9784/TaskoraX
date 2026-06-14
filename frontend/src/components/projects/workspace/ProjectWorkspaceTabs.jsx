import { 
  HiOutlineViewColumns, 
  HiOutlineClipboardDocumentList, 
  HiOutlineUsers, 
  HiOutlineCalendar, 
  HiOutlineDocumentText, 
  HiOutlineChartBarSquare 
} from 'react-icons/hi2';

const tabs = [
  { id: 'overview', label: 'Overview', icon: HiOutlineViewColumns },
  { id: 'tasks', label: 'Tasks', icon: HiOutlineClipboardDocumentList },
  { id: 'team', label: 'Team', icon: HiOutlineUsers },
  { id: 'timeline', label: 'Timeline', icon: HiOutlineCalendar },
  { id: 'files', label: 'Files', icon: HiOutlineDocumentText },
  { id: 'activity', label: 'Activity', icon: HiOutlineChartBarSquare },
];

const ProjectWorkspaceTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-border/60">
      <nav className="flex space-x-6 px-6 overflow-x-auto no-scrollbar" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group relative flex items-center gap-2 py-4 px-1 text-sm font-medium transition-colors whitespace-nowrap
                ${isActive ? 'text-primary-500' : 'text-text-secondary hover:text-text-primary'}
              `}
            >
              <tab.icon className={`h-5 w-5 transition-colors ${isActive ? 'text-primary-500' : 'text-text-tertiary group-hover:text-text-secondary'}`} />
              {tab.label}
              
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-t-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProjectWorkspaceTabs;
