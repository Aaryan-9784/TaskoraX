import RoleGuard from './RoleGuard';
import { Outlet } from 'react-router-dom';

const AdminRoute = () => {
  return (
    <RoleGuard allowedRoles={['admin', 'Admin']}>
      <Outlet />
    </RoleGuard>
  );
};

export default AdminRoute;
