import { Routes, Route } from 'react-router-dom';

// Layouts & Route Guards
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from '../components/auth/AdminRoute';

// Public Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import PasswordResetSuccess from '../pages/PasswordResetSuccess';
import ResetLinkExpired from '../pages/ResetLinkExpired';
import OAuthCallback from '../pages/OAuthCallback';
import NotFoundPage from '../pages/NotFoundPage';

// Protected Pages
import DashboardPage from '../pages/DashboardPage';
import TasksPage from '../pages/TasksPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetailsPage from '../pages/ProjectDetailsPage';
import TeamPage from '../pages/TeamPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import TaskManagement from '../pages/admin/TaskManagement';
import AdminAnalytics from '../pages/admin/Analytics';
import ActivityLogs from '../pages/admin/ActivityLogs';
import UserDetails from '../pages/admin/UserDetails';
import SystemSettings from '../pages/admin/SystemSettings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/reset-success" element={<PasswordResetSuccess />} />
      <Route path="/reset-expired" element={<ResetLinkExpired />} />
      <Route path="/oauth-callback" element={<OAuthCallback />} />

      {/* Protected App Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/users/:id" element={<UserDetails />} />
            <Route path="/admin/tasks" element={<TaskManagement />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/activity-logs" element={<ActivityLogs />} />
            <Route path="/admin/settings" element={<SystemSettings />} />
          </Route>
        </Route>
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
