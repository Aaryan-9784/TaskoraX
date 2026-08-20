import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTask } from '../context/TaskContext';
import StatCard from '../components/dashboard/StatCard';
import TaskCompletionChart from '../components/analytics/TaskCompletionChart';
import ProductivityChart from '../components/analytics/ProductivityChart';
import StatusDistributionChart from '../components/analytics/StatusDistributionChart';
import BottomSummary from '../components/analytics/BottomSummary';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
  HiOutlineChartPie,
  HiOutlineCalendar,
  HiOutlineArrowDownTray,
  HiOutlineArrowPath
} from 'react-icons/hi2';

const AnalyticsPage = () => {
  const { allTasks = [], refreshTasks } = useTask();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getFilteredTasks = () => {
    if (!allTasks.length) return [];
    return allTasks.filter(task => {
      const taskDate = new Date(task.createdAt || new Date());
      const now = new Date();
      if (dateRange === 'Last 7 Days') {
        const limit = new Date(now.setDate(now.getDate() - 7));
        return taskDate >= limit;
      }
      if (dateRange === 'Last 30 Days') {
        const limit = new Date(now.setDate(now.getDate() - 30));
        return taskDate >= limit;
      }
      if (dateRange === 'This Month') {
        return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
      }
      if (dateRange === 'This Year') {
        return taskDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  };

  const filteredTasks = getFilteredTasks();
  
  const displayStats = {
    total: filteredTasks.length,
    completed: filteredTasks.filter(t => t.status === 'Done').length,
    pending: filteredTasks.filter(t => t.status === 'Todo').length,
    inProgress: filteredTasks.filter(t => t.status === 'In Progress').length,
    overdue: filteredTasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Done').length,
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (refreshTasks) await refreshTasks();
    } finally {
      setTimeout(() => setIsRefreshing(false), 500); // Artificial delay so the user sees it spinning
    }
  };

  const handleExport = () => {
    const productivity = displayStats.total ? Math.max(0, Math.min(100, Math.round(((displayStats.completed * 100) + (displayStats.inProgress * 50) - (displayStats.overdue * 20)) / displayStats.total))) : 0;
    const completionRate = displayStats.total ? Math.round((displayStats.completed / displayStats.total) * 100) : 0;

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Total Tasks,${displayStats.total}\n`
      + `Completed,${displayStats.completed}\n`
      + `Pending,${displayStats.pending}\n`
      + `Overdue,${displayStats.overdue}\n`
      + `Productivity,${productivity}\n`
      + `Completion Rate,${completionRate}%`;
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `task_analytics_${dateRange.replace(/ /g, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dateOptions = ['Last 7 Days', 'Last 30 Days', 'This Month', 'This Year'];

  // Dummy sparkline data
  const generateSparkline = (trend, base) => {
    return Array.from({ length: 7 }).map((_, i) => ({
      value: Math.max(10, Math.floor(Math.random() * base) + (trend > 0 ? i * 2 : (7 - i) * 2))
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50 animate-in animate-in-delay-1 relative z-50">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Track productivity, measure performance trends, and gather workspace insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-4 py-2 bg-surface-secondary border border-border/60 hover:bg-surface-secondary/80 rounded-xl text-sm font-bold text-text-primary transition-colors"
            >
              <HiOutlineCalendar className="h-4 w-4 text-text-tertiary" />
              {dateRange}
            </button>
            
            {showDatePicker && (
              <div className="absolute top-full mt-2 right-0 w-48 bg-surface-primary/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl shadow-black/5 z-50 p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-0.5">
                  {dateOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setDateRange(option);
                        setShowDatePicker(false);
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                        dateRange === option 
                          ? 'bg-primary-500/10 text-primary-600' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/80'
                      }`}
                    >
                      {option}
                      {dateRange === option && (
                        <HiOutlineCheckCircle className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleRefresh}
            className="p-2 bg-surface-secondary border border-border/60 hover:bg-surface-secondary/80 rounded-xl text-text-secondary hover:text-text-primary transition-all"
            title="Refresh Analytics"
          >
            <HiOutlineArrowPath className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          
          <button 
            onClick={handleExport}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-xl text-sm font-bold text-white shadow-sm transition-colors"
          >
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 animate-in animate-in-delay-2">
        <StatCard
          title="Total Tasks"
          value={displayStats.total}
          icon={HiOutlineClipboardDocumentList}
          color="primary"
          trend={12}
          sparklineData={generateSparkline(12, 40)}
        />
        <StatCard
          title="Completed"
          value={displayStats.completed}
          icon={HiOutlineCheckCircle}
          color="success"
          trend={18}
          sparklineData={generateSparkline(18, 50)}
        />
        <StatCard
          title="Pending"
          value={displayStats.pending}
          icon={HiOutlineClock}
          color="warning"
          trend={-5}
          sparklineData={generateSparkline(-5, 30)}
        />
        <StatCard
          title="Overdue"
          value={displayStats.overdue}
          icon={HiOutlineExclamationTriangle}
          color="danger"
          trend={-8}
          sparklineData={generateSparkline(-8, 20)}
        />
        <StatCard
          title="Productivity"
          value={displayStats.total ? Math.max(0, Math.min(100, Math.round(((displayStats.completed * 100) + (displayStats.inProgress * 50) - (displayStats.overdue * 20)) / displayStats.total))) : 0}
          icon={HiOutlineSparkles}
          color="accent"
          trend={15}
          sparklineData={generateSparkline(15, 80)}
        />
        <StatCard
          title="Completion Rate"
          value={`${displayStats.total ? Math.round((displayStats.completed / displayStats.total) * 100) : 0}%`}
          icon={HiOutlineChartPie}
          color="primary"
          trend={5}
          sparklineData={generateSparkline(5, 70)}
        />
      </div>

      {/* Main Analytics Layout */}
      <div className="flex flex-col gap-6 animate-in animate-in-delay-3">
        <div className="h-[400px]">
          <TaskCompletionChart />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px] md:h-[350px]">
          <ProductivityChart />
          <StatusDistributionChart />
        </div>
      </div>

      {/* Bottom Summary Section */}
      <div className="animate-in animate-in-delay-4">
        <BottomSummary />
      </div>
    </div>
  );
};

export default AnalyticsPage;
