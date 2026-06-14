import { HiOutlineCalendar, HiOutlineDocumentText } from 'react-icons/hi2';

const ProjectRightSidebar = ({ project }) => {
  return (
    <div className="w-80 border-l border-border/40 bg-surface-primary flex flex-col h-full animate-fade-in custom-scrollbar overflow-y-auto">
      <div className="p-6 space-y-8">
        
        {/* Deadlines */}
        <div>
          <h4 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">Upcoming Deadlines</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-secondary transition-colors cursor-pointer border border-transparent hover:border-border/40">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0">
                <HiOutlineCalendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Phase 1 Delivery</p>
                <p className="text-xs text-text-secondary mt-0.5">Tomorrow, 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Notes */}
        <div>
          <h4 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">Quick Notes</h4>
          <div className="p-4 rounded-xl bg-surface-secondary border border-border/40 text-sm text-text-secondary">
            Remember to ask client about the updated brand guidelines before finalizing the hero section.
          </div>
        </div>

        {/* Recent Files */}
        <div>
          <h4 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">Recent Files</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer">
              <HiOutlineDocumentText className="h-5 w-5 text-accent-500" />
              <span className="text-sm font-medium text-text-primary flex-1 truncate">Brand_Assets_V2.zip</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer">
              <HiOutlineDocumentText className="h-5 w-5 text-success-500" />
              <span className="text-sm font-medium text-text-primary flex-1 truncate">Meeting_Notes.pdf</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectRightSidebar;
