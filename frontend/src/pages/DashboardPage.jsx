import { useTask } from '../context/TaskContext';
import StatCard from '../components/dashboard/StatCard';
import HeroSection from '../components/dashboard/HeroSection';
import AnalyticsWidget from '../components/dashboard/AnalyticsWidget';
import TodayWorkspace from '../components/dashboard/TodayWorkspace';
import AIPanel from '../components/dashboard/AIPanel';
import PomodoroWidget from '../components/dashboard/PomodoroWidget';
import GoalTracker from '../components/dashboard/GoalTracker';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import QuickActions from '../components/dashboard/QuickActions';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';

const DashboardPage = () => {
  const { stats } = useTask();

  // Generate some realistic dummy data for sparklines
  const generateSparkline = (trend, base) => {
    return Array.from({ length: 7 }).map((_, i) => ({
      value: Math.max(10, Math.floor(Math.random() * base) + (trend > 0 ? i * 2 : (7 - i) * 2))
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Hero Section */}
      <div className="animate-in animate-in-delay-1">
        <HeroSection />
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in animate-in-delay-2">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={HiOutlineClipboardDocumentList}
          color="primary"
          trend={12}
          sparklineData={generateSparkline(12, 40)}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={HiOutlineClock}
          color="warning"
          trend={-5}
          sparklineData={generateSparkline(-5, 30)}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={HiOutlineCheckCircle}
          color="success"
          trend={18}
          sparklineData={generateSparkline(18, 50)}
        />
        <StatCard
          title="Overdue"
          value={stats.overdue}
          icon={HiOutlineExclamationTriangle}
          color="danger"
          trend={-8}
          sparklineData={generateSparkline(-8, 20)}
        />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in animate-in-delay-3">
        {/* Left Column - Main Content (8 cols on XL) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
            <AnalyticsWidget />
            <TodayWorkspace />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[300px]">
            <QuickActions />
            <ActivityFeed />
          </div>
        </div>

        {/* Right Column - Side Widgets (4 cols on XL) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="h-[360px]">
            <AIPanel />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
            <div className="h-[280px]">
              <PomodoroWidget />
            </div>
            <div className="h-[280px]">
              <GoalTracker />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
