import { HiXMark, HiOutlineEnvelope, HiOutlinePhone, HiOutlineBuildingOffice, HiOutlineCalendar, HiOutlineClipboardDocumentCheck, HiOutlineChartBar } from 'react-icons/hi2';

const MemberProfileDrawer = ({ member, isOpen, onClose }) => {
  if (!isOpen || !member) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface-primary shadow-2xl z-[70] border-l border-border/50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header Section */}
        <div className="relative h-32 bg-gradient-to-r from-primary-500 to-accent-600 shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 relative flex-1 overflow-y-auto pb-8 custom-scrollbar">
          {/* Profile Picture */}
          <div className="relative -mt-12 mb-4">
            <div 
              className="w-24 h-24 rounded-2xl border-4 border-surface-primary shadow-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-4xl"
            >
              {member.name.charAt(0).toUpperCase()}
            </div>
            <div className={`absolute bottom-1 right-1 w-5 h-5 border-2 border-surface-primary rounded-full ${member.status === 'Online' ? 'bg-success-500' : 'bg-warning-500'}`}></div>
          </div>

          {/* Info Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-extrabold text-text-primary">{member.name}</h2>
              <span className="px-2.5 py-0.5 bg-primary-100 text-primary-700 text-[10px] font-bold rounded-full border border-primary-200">
                {member.role}
              </span>
            </div>
            <p className="text-sm font-medium text-text-tertiary flex items-center gap-1.5">
              <HiOutlineBuildingOffice className="w-4 h-4" /> {member.department}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button className="flex-1 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold rounded-xl shadow-soft transition-colors">
              Assign Task
            </button>
            <button className="flex-1 py-2.5 bg-surface-secondary hover:bg-surface-tertiary text-text-primary text-sm font-bold rounded-xl transition-colors border border-border">
              Message
            </button>
          </div>

          {/* Stats Grid */}
          <h3 className="text-sm font-bold text-text-primary mb-3">Performance Metrics</h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="p-4 rounded-xl border border-border bg-surface-secondary/50">
              <div className="flex items-center gap-2 mb-2 text-text-tertiary">
                <HiOutlineClipboardDocumentCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Tasks Completed</span>
              </div>
              <p className="text-2xl font-extrabold text-text-primary">{member.completedTasks || 0}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-surface-secondary/50">
              <div className="flex items-center gap-2 mb-2 text-text-tertiary">
                <HiOutlineChartBar className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Productivity</span>
              </div>
              <p className="text-2xl font-extrabold text-success-600">{member.productivityScore || 0}%</p>
            </div>
          </div>

          {/* Contact Details */}
          <h3 className="text-sm font-bold text-text-primary mb-3">Contact Information</h3>
          <div className="space-y-3 mb-8 bg-surface-secondary/30 p-4 rounded-xl border border-border/50">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-surface-primary rounded-lg shadow-sm border border-border/50 text-text-tertiary">
                <HiOutlineEnvelope className="w-4 h-4" />
              </div>
              <span className="font-medium text-text-secondary">{member.email || `${member.name.toLowerCase().replace(' ', '.')}@taskorax.com`}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-surface-primary rounded-lg shadow-sm border border-border/50 text-text-tertiary">
                <HiOutlinePhone className="w-4 h-4" />
              </div>
              <span className="font-medium text-text-secondary">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-surface-primary rounded-lg shadow-sm border border-border/50 text-text-tertiary">
                <HiOutlineCalendar className="w-4 h-4" />
              </div>
              <span className="font-medium text-text-secondary">Joined {member.joinDate || 'Jan 2024'}</span>
            </div>
          </div>
          
          {/* Current Projects */}
          <h3 className="text-sm font-bold text-text-primary mb-3">Active Projects</h3>
          <div className="space-y-2">
            {[1, 2].map((i) => (
               <div key={i} className="p-3 rounded-xl border border-border hover:border-primary-200 bg-surface-primary transition-colors cursor-pointer group">
                 <p className="text-sm font-bold text-text-primary group-hover:text-primary-600 transition-colors">Website Redesign Phase {i}</p>
                 <p className="text-xs text-text-tertiary mt-1">Due in 5 days</p>
               </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default MemberProfileDrawer;
