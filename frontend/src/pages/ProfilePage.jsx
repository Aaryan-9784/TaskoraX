import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import { getInitials, formatDate } from '../utils/helpers';
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { stats } = useTask();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    bio: user?.bio || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await updateProfile(form);
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Profile</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white border border-border/50 rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 relative">
          <div className="absolute inset-0">
            <div className="absolute top-4 right-8 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute bottom-4 left-12 w-16 h-16 bg-white/10 rounded-full" />
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-primary-100 border-4 border-white shadow-medium flex items-center justify-center text-primary-600 text-2xl font-bold flex-shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-text-primary">
                {user?.name || 'User'}
              </h2>
              <p className="text-sm text-text-secondary">{user?.role || 'Team Member'}</p>
            </div>
            <Button
              variant={editing ? 'secondary' : 'primary'}
              size="sm"
              icon={HiOutlinePencilSquare}
              onClick={() => setEditing(!editing)}
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Tasks', value: stats.total, color: 'text-primary-500' },
              { label: 'Completed', value: stats.completed, color: 'text-success-500' },
              { label: 'In Progress', value: stats.inProgress, color: 'text-warning-500' },
              { label: 'Overdue', value: stats.overdue, color: 'text-danger-500' },
            ].map((s) => (
              <div key={s.label} className="bg-surface-secondary rounded-xl p-4 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-text-secondary mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Info / Edit form */}
          {editing ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  icon={HiOutlineUser}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  icon={HiOutlineEnvelope}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <Input
                label="Role"
                icon={HiOutlineBriefcase}
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-primary">
                  Bio
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about yourself..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="input-field resize-none"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { icon: HiOutlineUser, label: 'Name', value: user?.name },
                { icon: HiOutlineEnvelope, label: 'Email', value: user?.email },
                { icon: HiOutlineBriefcase, label: 'Role', value: user?.role || 'Team Member' },
                {
                  icon: HiOutlineCalendarDays,
                  label: 'Joined',
                  value: formatDate(user?.joinedDate),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-border/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">{item.label}</p>
                    <p className="text-sm font-medium text-text-primary">
                      {item.value || 'Not set'}
                    </p>
                  </div>
                </div>
              ))}

              {user?.bio && (
                <div className="p-3 rounded-xl bg-surface-secondary">
                  <p className="text-xs text-text-tertiary mb-1">Bio</p>
                  <p className="text-sm text-text-primary leading-relaxed">{user.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
