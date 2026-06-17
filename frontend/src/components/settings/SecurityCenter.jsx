import React, { useState, useEffect } from 'react';
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

const SecurityCenter = ({ user, updateProfile, changePassword, getSessions, revokeSession }) => {
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const [activeSessions, setActiveSessions] = useState([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getSessions();
        setActiveSessions(sessions);
      } catch (error) {
        toast.error('Failed to load active sessions');
      } finally {
        setIsLoadingSessions(false);
      }
    };
    fetchSessions();
  }, [getSessions]);

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

  const handleRevokeSession = async (sessionId) => {
    try {
      await revokeSession(sessionId);
      setActiveSessions((prev) => prev.filter((session) => session._id !== sessionId));
      toast.success('Session revoked successfully');
    } catch (error) {
      toast.error('Failed to revoke session');
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
            Manage your password and active sessions
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
            Active Sessions
          </h3>
          <div className="space-y-3">
            {isLoadingSessions ? (
              <p className="text-sm text-text-secondary">Loading sessions...</p>
            ) : activeSessions.length === 0 ? (
              <div className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? (
                      <HiOutlineDevicePhoneMobile className="w-5 h-5 text-gray-600" />
                    ) : (
                      <HiOutlineComputerDesktop className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary flex items-center gap-2">
                      Current Device
                      <span className="px-2 py-0.5 bg-success-50 text-success-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Current
                      </span>
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Legacy Session · Please log out and log back in to fully enable tracking
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="text-xs text-text-secondary">Active now</p>
                </div>
              </div>
            ) : (
              activeSessions.map((session, index) => {
                const isMobile = session.device.toLowerCase().includes('phone') || session.os.toLowerCase().includes('ios') || session.os.toLowerCase().includes('android');
                const Icon = isMobile ? HiOutlineDevicePhoneMobile : HiOutlineComputerDesktop;
                // Assuming the most recent session is the current one for simplicity, or last element if it's ordered
                const isCurrent = index === activeSessions.length - 1;

                return (
                  <div key={session._id} className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary flex items-center gap-2">
                          {session.device}
                          {isCurrent && (
                            <span className="px-2 py-0.5 bg-success-50 text-success-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                              Current
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          {session.os} · {session.browser} · {session.ip}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="text-xs text-text-secondary">
                        {new Date(session.lastActive).toLocaleDateString()} {new Date(session.lastActive).toLocaleTimeString()}
                      </p>
                      {!isCurrent && (
                        <button 
                          onClick={() => handleRevokeSession(session._id)}
                          className="text-xs font-medium text-danger-600 hover:text-danger-700 transition-colors"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
