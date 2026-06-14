import { useState } from 'react';
import { useTask } from '../context/TaskContext';
import StatCard from '../components/dashboard/StatCard';
import TaskCompletionChart from '../components/analytics/TaskCompletionChart';
import ProductivityChart from '../components/analytics/ProductivityChart';
import StatusDistributionChart from '../components/analytics/StatusDistributionChart';
import InsightsPanel from '../components/analytics/InsightsPanel';
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
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Dummy sparkline data
  const generateSparkline = (trend, base) => {
    return Array.from({ length: 7 }).map((_, i) => ({
      value: Math.max(10, Math.floor(Math.random() * base) + (trend > 0 ? i * 2 : (7 - i) * 2))
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 animate-in animate-in-delay-1">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-text-primary mb-1">
            Analytics
          </h1>
          <p className="text-sm text-text-secondary">
            Track productivity, measure progress, and gather insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-secondary border border-border/60 hover:bg-surface-secondary/80 rounded-xl text-sm font-bold text-text-primary transition-colors">
            <HiOutlineCalendar className="h-4 w-4 text-text-tertiary" />
            Last 30 Days
          </button>
          <button 
            onClick={handleRefresh}
            className="p-2 bg-surface-secondary border border-border/60 hover:bg-surface-secondary/80 rounded-xl text-text-secondary hover:text-text-primary transition-all"
            title="Refresh Analytics"
          >
            <HiOutlineArrowPath className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-xl text-sm font-bold text-white shadow-sm transition-colors">
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
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in animate-in-delay-3">
        {/* Left Col - Main Charts (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="h-[400px]">
            <TaskCompletionChart />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px] md:h-[350px]">
            <ProductivityChart />
            <StatusDistributionChart />
          </div>
        </div>

        {/* Right Col - Insights & Extras (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="h-[400px]">
            <InsightsPanel />
          </div>
          <div className="h-[350px]">
            {/* Can add another chart or list here, re-using productivity chart or just padding it */}
             <div className="card-premium h-full flex flex-col justify-center items-center text-center">
               <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mb-4">
                 <HiOutlineSparkles className="h-8 w-8 text-text-tertiary" />
               </div>
               <h3 className="text-lg font-bold text-text-primary mb-2">More Insights Coming Soon</h3>
               <p className="text-sm text-text-tertiary max-w-[200px]">
                 We are gathering more data to provide deep team performance metrics.
               </p>
             </div>
          </div>
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
