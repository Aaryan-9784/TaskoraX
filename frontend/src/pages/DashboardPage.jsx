import { useTask } from '../context/TaskContext';
import StatCard from '../components/dashboard/StatCard';
import HeroSection from '../components/dashboard/HeroSection';
import TodayWorkspace from '../components/dashboard/TodayWorkspace';
import PomodoroWidget from '../components/dashboard/PomodoroWidget';
import GoalTracker from '../components/dashboard/GoalTracker';
import AnalyticsWidget from '../components/dashboard/AnalyticsWidget';
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
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">
            Overview of your daily workspace, active tasks, and performance metrics.
          </p>
        </div>
      </div>

      {/* Top Hero Section */}
      <div className="animate-in animate-in-delay-1">
        <HeroSection />
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-in animate-in-delay-2">
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in animate-in-delay-3 items-start">
        {/* Left Column - Tasks & Analytics */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="card-premium p-6">
            <TodayWorkspace />
          </div>
          <div className="h-[350px]">
            <AnalyticsWidget />
          </div>
        </div>

        {/* Right Column - Productivity Tools */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="h-[280px]">
            <PomodoroWidget />
          </div>
          <div className="h-[350px]">
            <GoalTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
