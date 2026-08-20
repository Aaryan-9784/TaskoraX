import { useState, useEffect } from 'react';
import api from '../../services/api';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import toast from 'react-hot-toast';
import {
  HiOutlineUsers,
  HiOutlineUserPlus,
  HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineTrash,
  HiOutlineShieldCheck
} from 'react-icons/hi2';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Add User Modal State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [isCreating, setIsCreating] = useState(false);

  // Delete Confirm Modal State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users', {
        params: { page, limit: 10, search, role: roleFilter },
      });
      setUsers(res.data.data.users || []);
      setTotalPages(res.data.pages || 1);
      setTotalUsers(res.data.total || 0);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
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
      toast.success(`User ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user status');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast.error('Name and email are required');
      return;
    }

    setIsCreating(true);
    try {
      await api.post('/admin/users', {
        name: newUserName.trim(),
        email: newUserEmail.trim(),
        password: 'Password123!',
        role: newUserRole.toLowerCase(),
      });
      toast.success(`User ${newUserName} created successfully! (Default Password: Password123!)`);
      setIsAddUserOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserRole('user');
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await api.delete(`/admin/users/${userToDelete._id || userToDelete.id}`);
      toast.success('User account removed successfully');
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">User Management</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage system access, roles, and user account status across your organization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button icon={HiOutlineUserPlus} onClick={() => setIsAddUserOpen(true)}>
            Add New User
          </Button>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email address..."
            className="input-field pl-10 w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            className="input-field py-2 px-3 text-sm cursor-pointer w-full sm:w-auto bg-surface-primary"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary/50 border-b border-border/30">
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">User Details</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Role</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Account Status</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Joined Date</th>
                <th className="p-4 text-xs font-bold text-text-tertiary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-text-secondary">
                    <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2"></div>
                    Loading user records...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-text-secondary">
                    <HiOutlineUsers className="w-10 h-10 text-text-tertiary mx-auto mb-2 opacity-50" />
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const roleLower = (user.role || '').toLowerCase();
                  return (
                    <tr key={user._id} className="hover:bg-surface-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-premium text-white flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
                            {user.avatar ? (
                              <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="" />
                            ) : (
                              (user.name || 'U').charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-text-primary text-sm truncate">{user.name}</p>
                            <p className="text-xs text-text-secondary truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize border ${
                          roleLower === 'admin'
                            ? 'bg-danger-50 text-danger-700 border-danger-200'
                            : roleLower === 'manager'
                            ? 'bg-primary-50 text-primary-700 border-primary-200'
                            : 'bg-surface-secondary text-text-secondary border-border/60'
                        }`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                          user.isActive ? 'text-success-600' : 'text-danger-600'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-success-500' : 'bg-danger-500'}`}></span>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4 text-xs font-medium text-text-secondary">
                        {new Date(user.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStatusToggle(user._id, user.isActive)}
                            className={`p-2 rounded-lg transition-colors ${
                              user.isActive
                                ? 'text-danger-500 hover:bg-danger-50'
                                : 'text-success-500 hover:bg-success-50'
                            }`}
                            title={user.isActive ? 'Deactivate Account' : 'Activate Account'}
                          >
                            {user.isActive ? <HiOutlineXCircle className="w-5 h-5" /> : <HiOutlineCheckCircle className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => {
                              setUserToDelete(user);
                              setDeleteConfirmOpen(true);
                            }}
                            className="p-2 text-text-tertiary hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-border/30 flex items-center justify-between bg-surface-secondary/20">
          <span className="text-xs text-text-secondary font-medium">
            Showing Page <span className="font-bold text-text-primary">{page}</span> of <span className="font-bold text-text-primary">{totalPages || 1}</span> ({totalUsers} total users)
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-border/50 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-secondary disabled:opacity-40 transition-colors"
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-border/50 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-secondary disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} title="Add New User" overflowVisible={true}>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. John Doe"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. john@example.com"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            required
          />
          <Select
            label="Account Role"
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            options={[
              { value: 'user', label: 'User (Standard Member)' },
              { value: 'manager', label: 'Manager (Team & Projects)' },
              { value: 'admin', label: 'Admin (Full System Control)' }
            ]}
          />
          <div className="p-3 bg-surface-secondary/60 rounded-xl text-xs text-text-secondary border border-border/40">
            💡 The user will be created with default temporary password: <span className="font-mono font-bold text-text-primary">Password123!</span>
          </div>
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-4">
            <Button variant="secondary" type="button" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} title="Confirm Deletion">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Are you sure you want to deactivate and remove user <strong className="text-text-primary">{userToDelete?.name}</strong> ({userToDelete?.email})?
          </p>
          <div className="flex justify-end gap-3 mt-6 border-t border-border/40 pt-4">
            <Button variant="secondary" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} className="bg-danger-500 hover:bg-danger-600 text-white border-transparent">
              Delete User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
