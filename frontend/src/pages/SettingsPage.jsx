import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';
import {
  HiOutlineUser,
  HiOutlineBellAlert,
  HiOutlinePaintBrush,
  HiOutlineShieldExclamation,
  HiOutlineLockClosed,
} from 'react-icons/hi2';

const SettingsPage = () => {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const navigate = useNavigate();

  // Account settings
  const [accountForm, setAccountForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Password
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  });

  const [theme, setTheme] = useState(user?.preferences?.theme || 'Light');

  // Notification toggles
  const [notifications, setNotifications] = useState(
    user?.preferences?.notifications || {
      email: true,
      push: false,
      taskReminders: true,
      weeklyDigest: true,
      marketing: false,
    }
  );

  const handleAccountSave = async () => {
    try {
      await updateProfile(accountForm);
      toast.success('Account information updated');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePasswordSave = async () => {
    if (passwordForm.newPassword !== passwordForm.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      await changePassword(passwordForm.current, passwordForm.newPassword);
      setPasswordForm({ current: '', newPassword: '', confirm: '' });
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      logout();
      navigate('/');
    }
  };

  const toggleNotification = async (key) => {
    const newNotifications = { ...notifications, [key]: !notifications[key] };
    setNotifications(newNotifications);
    try {
      await updateProfile({ preferences: { theme, notifications: newNotifications } });
      toast.success('Notification preferences updated');
    } catch (error) {
      toast.error('Failed to update preferences');
      setNotifications(notifications); // revert
    }
  };

  const handleThemeChange = async (newTheme) => {
    const oldTheme = theme;
    setTheme(newTheme);
    try {
      await updateProfile({ preferences: { theme: newTheme, notifications } });
      toast.success('Appearance preferences updated');
    } catch (error) {
      toast.error('Failed to update appearance');
      setTheme(oldTheme);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Account Settings */}
      <div className="bg-white border border-border/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
            <HiOutlineUser className="h-5 w-5 text-primary-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Account Information
            </h2>
            <p className="text-xs text-text-secondary">
              Update your personal details
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={accountForm.name}
              onChange={(e) =>
                setAccountForm({ ...accountForm, name: e.target.value })
              }
            />
            <Input
              label="Email Address"
              type="email"
              value={accountForm.email}
              onChange={(e) =>
                setAccountForm({ ...accountForm, email: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end">
            <Button size="sm" onClick={handleAccountSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="bg-white border border-border/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-warning-50 flex items-center justify-center">
            <HiOutlineLockClosed className="h-5 w-5 text-warning-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Change Password
            </h2>
            <p className="text-xs text-text-secondary">
              Ensure your account stays secure
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={passwordForm.current}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, current: e.target.value })
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, newPassword: e.target.value })
              }
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              value={passwordForm.confirm}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirm: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end">
            <Button size="sm" onClick={handlePasswordSave}>
              Update Password
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-border/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center">
            <HiOutlineBellAlert className="h-5 w-5 text-success-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Notifications
            </h2>
            <p className="text-xs text-text-secondary">
              Choose what you want to be notified about
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              key: 'email',
              label: 'Email Notifications',
              description: 'Receive notifications via email',
            },
            {
              key: 'push',
              label: 'Push Notifications',
              description: 'Receive push notifications in browser',
            },
            {
              key: 'taskReminders',
              label: 'Task Reminders',
              description: 'Get reminded about upcoming due dates',
            },
            {
              key: 'weeklyDigest',
              label: 'Weekly Digest',
              description: 'Receive a weekly summary of your activity',
            },
            {
              key: 'marketing',
              label: 'Marketing Emails',
              description: 'Receive product updates and offers',
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between py-2"
            >
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {item.label}
                </p>
                <p className="text-xs text-text-secondary">
                  {item.description}
                </p>
              </div>
              <button
                onClick={() => toggleNotification(item.key)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  notifications[item.key] ? 'bg-primary-500' : 'bg-gray-200'
                }`}
                aria-label={`Toggle ${item.label}`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    notifications[item.key]
                      ? 'translate-x-[22px]'
                      : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white border border-border/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <HiOutlinePaintBrush className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Appearance
            </h2>
            <p className="text-xs text-text-secondary">
              Customize the look and feel
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          {[
            { label: 'Light', bg: 'bg-white border-primary-500' },
            { label: 'Dark', bg: 'bg-gray-900' },
            { label: 'System', bg: 'bg-gradient-to-r from-white to-gray-900' },
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => handleThemeChange(t.label)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                theme === t.label
                  ? 'border-primary-500 bg-primary-50/50'
                  : 'border-border hover:border-gray-300'
              }`}
            >
              <div
                className={`w-16 h-10 rounded-lg border border-border/50 ${t.bg}`}
              />
              <span
                className={`text-xs font-medium ${
                  theme === t.label ? 'text-primary-600' : 'text-text-secondary'
                }`}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border border-danger-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center">
            <HiOutlineShieldExclamation className="h-5 w-5 text-danger-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Danger Zone
            </h2>
            <p className="text-xs text-text-secondary">
              Irreversible and destructive actions
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-danger-50/50 rounded-xl">
          <div>
            <p className="text-sm font-medium text-text-primary">
              Delete Account
            </p>
            <p className="text-xs text-text-secondary">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <Button variant="danger" size="sm" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
