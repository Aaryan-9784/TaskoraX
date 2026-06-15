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
  const { stats } = useTask();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fallback stats if TaskContext is empty
  const defaultStats = {
    total: 42,
    completed: 18,
    pending: 20,
    overdue: 4
  };

  const displayStats = stats?.total !== undefined ? stats : defaultStats;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    // In a real app, this would trigger a download
    // Removing toast to reduce notification noise
  };

  const dateOptions = ['Last 7 Days', 'Last 30 Days', 'This Month', 'This Year'];

  // Dummy sparkline data
  const generateSparkline = (trend, base) => {
    return Array.from({ length: 7 }).map((_, i) => ({
      value: Math.max(10, Math.floor(Math.random() * base) + (trend > 0 ? i * 2 : (7 - i) * 2))
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-in animate-in-delay-1 relative z-50">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Analytics
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Track productivity, measure progress, and gather insights.
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
          value="92"
          icon={HiOutlineSparkles}
          color="accent"
          trend={15}
          sparklineData={generateSparkline(15, 80)}
        />
        <StatCard
          title="Completion Rate"
          value="85%"
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
