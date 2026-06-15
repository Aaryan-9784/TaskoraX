import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Switch from '../common/Switch';
import {
  HiOutlineLockClosed,
  HiOutlineDevicePhoneMobile,
  HiOutlineComputerDesktop,
  HiOutlineKey,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const SecurityCenter = ({ changePassword }) => {
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const strength = calculatePasswordStrength(passwordForm.newPassword);

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    setIsSaving(true);
    try {
      await changePassword(passwordForm.current, passwordForm.newPassword);
      setPasswordForm({ current: '', newPassword: '', confirm: '' });
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
        <div className="w-10 h-10 rounded-xl bg-warning-50 flex items-center justify-center">
          <HiOutlineLockClosed className="h-5 w-5 text-warning-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Security Center
          </h2>
          <p className="text-sm text-text-secondary">
            Manage your password, 2FA, and active sessions
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-text-primary mb-4">
            Change Password
          </h3>
          <form onSubmit={handlePasswordSave} className="space-y-5">
            <div className="max-w-md">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
                value={passwordForm.current}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, current: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  required
                />
                {passwordForm.newPassword && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        strength < 50
                          ? 'bg-danger-500 w-1/4'
                          : strength < 75
                          ? 'bg-warning-500 w-2/4'
                          : strength < 100
                          ? 'bg-success-400 w-3/4'
                          : 'bg-success-500 w-full'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                value={passwordForm.confirm}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirm: e.target.value })
                }
                required
              />
            </div>
            <div className="flex justify-start">
              <Button type="submit" disabled={isSaving || !passwordForm.newPassword}>
                {isSaving ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </div>

        <div className="pt-6 border-t border-border/50">
          <h3 className="text-base font-medium text-text-primary mb-4">
            Two-Factor Authentication (2FA)
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-border/50">
            <div className="flex items-start gap-3 mb-4 sm:mb-0">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <HiOutlineKey className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Authenticator App
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  Use an app like Google Authenticator or 1Password to generate verification codes.
                </p>
              </div>
            </div>
            <Switch
              checked={is2FAEnabled}
              onChange={setIs2FAEnabled}
              aria-label="Toggle 2FA"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <h3 className="text-base font-medium text-text-primary mb-4">
            Active Sessions
          </h3>
          <div className="space-y-3">
            {[
              {
                device: 'MacBook Pro',
                os: 'macOS 14.1',
                browser: 'Chrome',
                location: 'San Francisco, CA',
                time: 'Active now',
                icon: HiOutlineComputerDesktop,
                current: true,
              },
              {
                device: 'iPhone 13',
                os: 'iOS 17.0',
                browser: 'Safari',
                location: 'San Francisco, CA',
                time: 'Last active 2 hours ago',
                icon: HiOutlineDevicePhoneMobile,
                current: false,
              },
            ].map((session, idx) => {
              const Icon = session.icon;
              return (
                <div key={idx} className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary flex items-center gap-2">
                        {session.device}
                        {session.current && (
                          <span className="px-2 py-0.5 bg-success-50 text-success-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                            Current
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {session.os} · {session.browser} · {session.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-xs text-text-secondary">{session.time}</p>
                    {!session.current && (
                      <button className="text-xs font-medium text-danger-600 hover:text-danger-700 transition-colors">
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
