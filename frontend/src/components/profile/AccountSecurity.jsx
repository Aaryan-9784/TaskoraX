import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { 
  HiOutlineShieldCheck, 
  HiOutlineKey, 
  HiOutlineDevicePhoneMobile, 
  HiOutlineComputerDesktop,
  HiOutlineExclamationTriangle
} from 'react-icons/hi2';

const AccountSecurity = () => {
  const { changePassword } = useAuth();
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [loading, setLoading] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      await changePassword(passwords.current, passwords.new);
      toast.success('Password updated successfully');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-border/50 bg-surface-secondary/30">
        <h3 className="text-lg font-semibold text-text-primary">Account Security</h3>
      </div>
      
      <div className="p-6 space-y-8">
        {/* Change Password Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">
              <HiOutlineKey className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-text-primary">Change Password</h4>
              <p className="text-sm text-text-secondary">Ensure your account is using a long, random password to stay secure.</p>
            </div>
          </div>
          
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md ml-13 pl-4 border-l border-border/60">
            <Input
              type="password"
              label="Current Password"
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              required
            />
            <Input
              type="password"
              label="New Password"
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              required
            />
            <Input
              type="password"
              label="Confirm New Password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              required
            />
            <Button type="submit" isLoading={loading} className="w-full sm:w-auto mt-2">
              Update Password
            </Button>
          </form>
        </div>

        <hr className="border-border/50" />

        {/* Two-Factor Authentication */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${is2FAEnabled ? 'bg-success-50 text-success-600 border-success-100' : 'bg-warning-50 text-warning-600 border-warning-100'}`}>
              <HiOutlineShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-text-primary">Two-Factor Authentication</h4>
              <p className="text-sm text-text-secondary">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <Button 
            variant={is2FAEnabled ? 'outline' : 'primary'} 
            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
          >
            {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </Button>
        </div>

        <hr className="border-border/50" />

        {/* Active Sessions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <HiOutlineComputerDesktop className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-text-primary">Active Sessions</h4>
                <p className="text-sm text-text-secondary">Manage and log out your active sessions on other browsers and devices.</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-danger-600 hover:bg-danger-50 hover:text-danger-700 hover:border-danger-200">
              Log out all devices
            </Button>
          </div>

          <div className="ml-13 pl-4 border-l border-border/60 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary/50 border border-border/50">
              <div className="flex items-center gap-3">
                <HiOutlineComputerDesktop className="w-6 h-6 text-primary-500" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Windows 11 • Chrome <span className="ml-2 text-[10px] font-bold text-success-600 bg-success-50 px-2 py-0.5 rounded-full uppercase">Current</span></p>
                  <p className="text-xs text-text-tertiary">New York, USA • Active now</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-secondary/50 border border-transparent transition-colors group">
              <div className="flex items-center gap-3">
                <HiOutlineDevicePhoneMobile className="w-6 h-6 text-text-secondary group-hover:text-primary-500 transition-colors" />
                <div>
                  <p className="text-sm font-medium text-text-primary">iPhone 14 Pro • Safari</p>
                  <p className="text-xs text-text-tertiary">New York, USA • Last active 2 hours ago</p>
                </div>
              </div>
              <button className="text-xs font-medium text-danger-600 hover:text-danger-700 opacity-0 group-hover:opacity-100 transition-opacity">Revoke</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountSecurity;
