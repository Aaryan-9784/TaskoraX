import { useTask } from '../context/TaskContext';
import StatCard from '../components/dashboard/StatCard';
import TaskChart from '../components/dashboard/TaskChart';
import RecentTasks from '../components/dashboard/RecentTasks';
import QuickActions from '../components/dashboard/QuickActions';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';

const DashboardPage = () => {
  const { stats } = useTask();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary font-display tracking-tight">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">
          Here's an overview of your tasks and activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={HiOutlineClipboardDocumentList}
          color="primary"
          trend={12}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={HiOutlineClock}
          color="warning"
          trend={-5}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={HiOutlineCheckCircle}
          color="success"
          trend={18}
        />
        <StatCard
          title="Overdue"
          value={stats.overdue}
          icon={HiOutlineExclamationTriangle}
          color="danger"
          trend={-8}
        />
      </div>

      {/* Charts */}
      <TaskChart />

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTasks />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
