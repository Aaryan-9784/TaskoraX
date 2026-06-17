import { useState } from 'react';
import { HiOutlineCalendarDays, HiOutlinePlus, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useTask } from '../../context/TaskContext';

const CalendarPopup = ({ isOpen, onClose, domNode, onCreateTask }) => {
  if (!isOpen) return null;

  const { allTasks = [] } = useTask();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(null);
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isToday = (day) => {
    if (!day) return false;
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const getTaskColor = (task) => {
    if (task.status === 'Done') return 'bg-success-500';
    if (task.status === 'In Progress') return 'bg-primary-500';
    if (task.status === 'Todo') {
      const isOverdue = task.dueDate && new Date(task.dueDate) < new Date(today.setHours(0,0,0,0));
      return isOverdue ? 'bg-danger-500' : 'bg-warning-500';
    }
    return 'bg-secondary-500';
  };

  const getTasksForDay = (day) => {
    if (!day) return [];
    return allTasks.filter(t => {
      if (!t.dueDate) return false;
      const tDate = new Date(t.dueDate);
      return tDate.getDate() === day && tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div 
      ref={domNode}
      className="absolute top-16 right-0 mt-2 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-elevated border border-border/60 p-4 z-50 animate-scale-in origin-top-right"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] font-bold text-primary-600 tracking-[0.1em] uppercase mb-0.5">Calendar</p>
          <p className="text-[15px] font-bold text-text-primary leading-none">{today.toLocaleDateString('en-US', options)}</p>
        </div>
        <button 
          className="w-8 h-8 flex items-center justify-center bg-primary-50 text-primary-600 rounded-[10px] hover:bg-primary-100 transition-colors" 
          aria-label="Create Event"
          onClick={onCreateTask}
        >
          <HiOutlinePlus className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      <div className="bg-surface-secondary/30 rounded-xl p-3 border border-border/40">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-surface-tertiary text-text-secondary transition-colors"
          >
            <HiChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-bold text-text-primary">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button 
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-surface-tertiary text-text-secondary transition-colors"
          >
            <HiChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-[10px] font-bold text-text-tertiary uppercase py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayTasks = getTasksForDay(day);
            const isSelected = selectedDay === day;
            const dayClass = isToday(day) 
              ? 'bg-primary-500 text-white font-bold shadow-glow-sm' 
              : isSelected
                ? 'bg-primary-50 text-primary-700 font-bold ring-1 ring-primary-200'
                : 'text-text-primary hover:bg-surface-tertiary font-medium';
            const emptyClass = !day ? 'invisible' : '';
            
            return (
              <div 
                key={index} 
                onClick={() => day && setSelectedDay(isSelected ? null : day)}
                className={`relative flex flex-col items-center justify-center h-9 w-full rounded-lg text-xs cursor-pointer transition-all ${emptyClass} ${!day ? '' : dayClass}`}
              >
                {day && <span>{day}</span>}
                {dayTasks.length > 0 && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {dayTasks.slice(0, 3).map((task, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${getTaskColor(task)} ${isToday(day) ? 'ring-1 ring-white/50' : 'ring-1 ring-white'}`} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedDay && getTasksForDay(selectedDay).length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/40 animate-fade-in">
            <p className="text-xs font-bold text-text-primary mb-2">
              Tasks for {monthNames[currentMonth]} {selectedDay}
            </p>
            <div className="space-y-2 max-h-[140px] overflow-y-auto no-scrollbar custom-scrollbar">
              {getTasksForDay(selectedDay).map((task) => (
                <div key={task._id || task.id} className="flex items-start gap-2 p-2 bg-white rounded-lg border border-border/40 shadow-sm hover:border-primary-200 transition-colors cursor-default">
                  <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${getTaskColor(task)}`} />
                  <div>
                    <p className="text-xs font-semibold text-text-primary line-clamp-1">{task.title}</p>
                    <p className="text-[10px] text-text-secondary mt-0.5 font-medium">{task.status} • {task.priority}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPopup;
