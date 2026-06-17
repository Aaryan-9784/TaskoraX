import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleGuard = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-8 bg-surface-secondary/30">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-text-secondary font-medium animate-pulse">Verifying access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleGuard;
