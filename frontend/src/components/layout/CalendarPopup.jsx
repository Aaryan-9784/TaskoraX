import { HiOutlineCalendarDays, HiOutlineClock, HiOutlinePlus, HiOutlineArrowRight } from 'react-icons/hi2';

const CalendarPopup = ({ isOpen, onClose, domNode }) => {
  if (!isOpen) return null;

  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Dummy events
  const events = [
    { id: 1, title: 'Product Sync', time: '10:00 AM - 11:30 AM', type: 'meeting', color: 'bg-primary-500' },
    { id: 2, title: 'Q3 Roadmapping', time: '1:00 PM - 3:00 PM', type: 'deadline', color: 'bg-warning-500' },
    { id: 3, title: 'Design Review', time: '4:00 PM - 5:00 PM', type: 'task', color: 'bg-success-500' },
  ];

  return (
    <div 
      ref={domNode}
      className="absolute top-16 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 md:translate-x-0 md:left-auto mt-2 w-[340px] glass-panel rounded-2xl shadow-card-hover border border-border/60 p-4 z-50 animate-scale-in origin-top"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold text-primary-600 tracking-wider uppercase">Today</p>
          <p className="text-sm font-semibold text-text-primary">{today.toLocaleDateString('en-US', options)}</p>
        </div>
        <button className="p-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors" aria-label="Create Event">
          <HiOutlinePlus className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-surface-secondary/50 rounded-xl p-3 mb-4 border border-border/40">
        <div className="flex justify-between items-center text-xs font-medium text-text-secondary mb-2">
          <span>Upcoming Events</span>
          <span className="bg-surface-tertiary px-2 py-0.5 rounded-full text-[10px] font-bold text-text-primary">
            {events.length} pending
          </span>
        </div>
        
        {events.length > 0 ? (
          <div className="flex flex-col gap-2">
            {events.map(event => (
              <div key={event.id} className="flex items-start gap-3 p-2 hover:bg-white rounded-lg transition-colors group cursor-pointer border border-transparent hover:border-border/40">
                <div className={`mt-1 w-2 h-2 rounded-full ${event.color} flex-shrink-0 shadow-sm group-hover:scale-125 transition-transform`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{event.title}</p>
                  <p className="text-xs text-text-tertiary flex items-center gap-1 mt-0.5">
                    <HiOutlineClock className="w-3 h-3" />
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <HiOutlineCalendarDays className="w-8 h-8 text-text-tertiary mb-2 opacity-50" />
            <p className="text-sm font-medium text-text-secondary">No upcoming events</p>
            <p className="text-xs text-text-tertiary mt-1">You have a clear schedule today.</p>
          </div>
        )}
      </div>

      <button className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-text-primary bg-surface-secondary hover:bg-surface-tertiary border border-border/50 rounded-xl transition-all duration-200 group">
        View Full Calendar
        <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default CalendarPopup;
