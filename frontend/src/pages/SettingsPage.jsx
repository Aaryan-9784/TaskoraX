import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import {
  HiOutlineLockClosed,
  HiOutlineKey,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const { changePassword } = useAuth();

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  };

  const strength = calculatePasswordStrength(passwordForm.newPassword);

  const getStrengthLabel = (score) => {
    if (!passwordForm.newPassword) return '';
    if (score <= 25) return { text: 'Weak', color: 'text-danger-600', bg: 'bg-danger-500' };
    if (score <= 50) return { text: 'Fair', color: 'text-warning-600', bg: 'bg-warning-500' };
    if (score <= 75) return { text: 'Good', color: 'text-primary-600', bg: 'bg-primary-500' };
    return { text: 'Strong', color: 'text-success-600', bg: 'bg-success-500' };
  };

  const strengthLabel = getStrengthLabel(strength);

  const handlePasswordSave = async (e) => {
    e.preventDefault();

    if (!passwordForm.current) {
      toast.error('Please enter your current password');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.current === passwordForm.newPassword) {
      toast.error('New password must be different from current password');
      return;
    }

    setIsSaving(true);
    try {
      await changePassword(passwordForm.current, passwordForm.newPassword);
      setPasswordForm({ current: '', newPassword: '', confirm: '' });
      toast.success('Password updated successfully! 🔒');
    } catch (error) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetForm = () => {
    setPasswordForm({ current: '', newPassword: '', confirm: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-border/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
            <HiOutlineKey className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Security Settings</h1>
            <p className="text-sm text-text-secondary">
              Update your account password to keep your profile secure.
            </p>
          </div>
        </div>
      </div>

      {/* Main Password Change Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Password Form Container (2 columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/40">
            <div className="w-9 h-9 rounded-lg bg-warning-50 flex items-center justify-center text-warning-600">
              <HiOutlineLockClosed className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">Change Password</h2>
              <p className="text-xs text-text-tertiary">Ensure your account is using a long, random password to stay secure.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSave} className="space-y-5">
            <div>
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                value={passwordForm.current}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, current: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password (min. 6 characters)"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                required
              />

              {/* Password Strength Meter */}
              {passwordForm.newPassword && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-text-tertiary font-medium">Password Strength:</span>
                    <span className={`font-bold ${strengthLabel.color}`}>{strengthLabel.text}</span>
                  </div>
                  <div className="w-full bg-surface-secondary rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthLabel.bg}`}
                      style={{ width: `${Math.max(10, strength)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Re-enter new password"
                value={passwordForm.confirm}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirm: e.target.value })
                }
                required
              />
              {passwordForm.confirm && passwordForm.newPassword && (
                <p className={`text-xs font-semibold mt-1.5 flex items-center gap-1 ${
                  passwordForm.newPassword === passwordForm.confirm ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {passwordForm.newPassword === passwordForm.confirm ? (
                    <>
                      <HiOutlineCheckCircle className="w-4 h-4" /> Passwords match
                    </>
                  ) : (
                    <>
                      <HiOutlineXCircle className="w-4 h-4" /> Passwords do not match
                    </>
                  )}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
              <Button
                type="button"
                variant="secondary"
                onClick={handleResetForm}
                disabled={isSaving || (!passwordForm.current && !passwordForm.newPassword && !passwordForm.confirm)}
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={isSaving || !passwordForm.current || !passwordForm.newPassword || !passwordForm.confirm}
              >
                {isSaving ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </div>

        {/* Security Recommendations & Requirements (1 column) */}
        <div className="space-y-6">
          <div className="bg-surface-secondary/40 border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineShieldCheck className="w-5 h-5 text-success-600" />
              <h3 className="text-sm font-bold text-text-primary">Password Checklist</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  passwordForm.newPassword.length >= 8 ? 'bg-success-100 text-success-700' : 'bg-surface-secondary text-text-tertiary'
                }`}>
                  {passwordForm.newPassword.length >= 8 ? '✓' : '•'}
                </span>
                <span>At least 8 characters long</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  /[A-Z]/.test(passwordForm.newPassword) ? 'bg-success-100 text-success-700' : 'bg-surface-secondary text-text-tertiary'
                }`}>
                  {/[A-Z]/.test(passwordForm.newPassword) ? '✓' : '•'}
                </span>
                <span>At least one uppercase letter (A-Z)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  /[0-9]/.test(passwordForm.newPassword) ? 'bg-success-100 text-success-700' : 'bg-surface-secondary text-text-tertiary'
                }`}>
                  {/[0-9]/.test(passwordForm.newPassword) ? '✓' : '•'}
                </span>
                <span>At least one number (0-9)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  /[^A-Za-z0-9]/.test(passwordForm.newPassword) ? 'bg-success-100 text-success-700' : 'bg-surface-secondary text-text-tertiary'
                }`}>
                  {/[^A-Za-z0-9]/.test(passwordForm.newPassword) ? '✓' : '•'}
                </span>
                <span>At least one special character (!@#$)</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary-50/50 border border-primary-100 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-primary-900 mb-1.5">💡 Security Tip</h4>
            <p className="text-xs text-primary-800 leading-relaxed">
              Never share your password with anyone. We recommend using a unique password that you do not use on any other website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
