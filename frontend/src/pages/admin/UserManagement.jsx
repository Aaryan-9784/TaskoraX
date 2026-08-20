import { useState, useEffect } from 'react';
import api from '../../services/api';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users', {
        params: { page, limit: 10, search, role: roleFilter },
      });
      setUsers(res.data.data.users);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter]);

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const endpoint = currentStatus ? 'deactivate' : 'activate';
      await api.patch(`/admin/users/${id}/${endpoint}`);
      fetchUsers();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update user status.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">User Management</h1>
          <p className="text-text-secondary mt-1">Manage system access and roles</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          className="px-4 py-2 border border-border/50 rounded-xl bg-surface-secondary/50 flex-1 outline-none focus:ring-2 focus:ring-primary-500/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="px-4 py-2 border border-border/50 rounded-xl bg-surface-secondary/50 outline-none"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="bg-white/40 dark:bg-surface-secondary/20 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary/50 border-b border-border/30">
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">User</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Role</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Joined</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-text-secondary">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-text-secondary">No users found.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id} className="hover:bg-surface-secondary/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                          {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="" /> : user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">{user.name}</p>
                          <p className="text-sm text-text-secondary">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                        user.role?.toLowerCase() === 'admin' ? 'bg-danger-50 text-danger-600 border border-danger-200' :
                        user.role?.toLowerCase() === 'manager' ? 'bg-primary-50 text-primary-600 border border-primary-200' :
                        'bg-surface-secondary text-text-secondary border border-border/50'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 text-xs font-bold ${user.isActive ? 'text-success-600' : 'text-danger-600'}`}>
                        <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-success-500' : 'bg-danger-500'}`}></span>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-text-secondary">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleStatusToggle(user._id, user.isActive)}
                        className="p-2 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title={user.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {user.isActive ? <HiOutlineXCircle className="w-5 h-5 text-danger-500" /> : <HiOutlineCheckCircle className="w-5 h-5 text-success-500" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border/30 flex items-center justify-between">
          <span className="text-sm text-text-secondary">Page {page} of {totalPages || 1}</span>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-lg border border-border/50 disabled:opacity-50"
            >
              Prev
            </button>
            <button 
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-lg border border-border/50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
