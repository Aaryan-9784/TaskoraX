import { HiOutlineCalendarDays } from 'react-icons/hi2';

const TimelineTab = () => {
  return (
    <div className="p-6 h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary">Timeline Roadmap</h3>
      </div>
      <div className="flex-1 glass-panel border border-border/40 rounded-xl flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-border/60">
            <HiOutlineCalendarDays className="h-8 w-8 text-text-tertiary" />
          </div>
          <h4 className="text-base font-bold text-text-primary mb-1">Timeline View</h4>
          <p className="text-sm text-text-secondary max-w-sm">A visual roadmap of your project will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineTab;
