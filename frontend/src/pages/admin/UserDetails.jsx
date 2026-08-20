import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import {
  HiOutlineArrowLeft,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineShieldCheck,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineXCircle
} from 'react-icons/hi2';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/admin/users/${id}`);
        setUser(res.data?.data?.user);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        toast.error('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-16 text-center text-text-secondary">
        <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2"></div>
        Loading user profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto p-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-text-primary">User Not Found</h2>
        <p className="text-sm text-text-secondary">The requested user could not be found.</p>
        <Button onClick={() => navigate('/admin/users')}>Back to Users</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/users')}
            className="p-2 text-text-tertiary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
          >
            <HiOutlineArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">User Profile Details</h1>
            <p className="text-sm text-text-secondary mt-1">Detailed administrative view and account record.</p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/40">
          <div className="w-20 h-20 rounded-2xl bg-gradient-premium text-white flex items-center justify-center text-2xl font-extrabold shadow-soft">
            {user.avatar ? (
              <img src={user.avatar} className="w-full h-full rounded-2xl object-cover" alt="" />
            ) : (
              (user.name || 'U').charAt(0).toUpperCase()
            )}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <h2 className="text-xl font-bold text-text-primary">{user.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize bg-primary-50 text-primary-700 border border-primary-200">
                {user.role || 'user'}
              </span>
            </div>
            <p className="text-sm text-text-secondary">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-surface-secondary/40 rounded-xl border border-border/40">
            <p className="text-xs font-bold text-text-tertiary uppercase mb-1">Status</p>
            <p className={`text-sm font-bold flex items-center gap-1.5 ${user.isActive ? 'text-success-600' : 'text-danger-600'}`}>
              <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-success-500' : 'bg-danger-500'}`}></span>
              {user.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>

          <div className="p-4 bg-surface-secondary/40 rounded-xl border border-border/40">
            <p className="text-xs font-bold text-text-tertiary uppercase mb-1">Member Since</p>
            <p className="text-sm font-bold text-text-primary">
              {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div className="p-4 bg-surface-secondary/40 rounded-xl border border-border/40">
            <p className="text-xs font-bold text-text-tertiary uppercase mb-1">Department</p>
            <p className="text-sm font-bold text-text-primary">{user.department || 'General Workspace'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
