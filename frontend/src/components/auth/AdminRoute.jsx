import RoleGuard from './RoleGuard';
import { Outlet } from 'react-router-dom';

const AdminRoute = () => {
  return (
    <RoleGuard allowedRoles={['admin', 'superadmin']}>
      <Outlet />
    </RoleGuard>
  );
};

export default AdminRoute;
