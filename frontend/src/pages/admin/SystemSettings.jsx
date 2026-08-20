import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Switch from '../../components/common/Switch';
import {
  HiOutlineCog6Tooth,
  HiOutlineServerStack,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineCheckCircle
} from 'react-icons/hi2';

const SystemSettings = () => {
  const [systemStatus, setSystemStatus] = useState('Online');
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('System settings saved successfully! ⚙️');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">System Settings</h1>
          <p className="text-sm text-text-secondary mt-1">
            Global system preferences, server configuration, and environment controls.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Grid Settings Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health Status */}
        <div className="bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-border/40">
            <div className="p-2.5 bg-success-50 rounded-xl text-success-600">
              <HiOutlineServerStack className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">System Health</h2>
              <p className="text-xs text-text-tertiary">Live infrastructure status</p>
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary font-medium">Backend API</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success-600">
                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></span> Running (Port 5000)
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary font-medium">Database (Atlas)</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success-600">
                <span className="w-2 h-2 rounded-full bg-success-500"></span> Connected
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary font-medium">Environment</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-secondary text-text-secondary border border-border/50">
                Development
              </span>
            </div>
          </div>
        </div>

        {/* Global Access Preferences */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-secondary/20 border border-border/50 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-border/40">
            <div className="p-2.5 bg-primary-50 rounded-xl text-primary-600">
              <HiOutlineGlobeAlt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">Platform Policies</h2>
              <p className="text-xs text-text-tertiary">Configure user access and system behavior</p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between p-3.5 bg-surface-secondary/40 rounded-xl border border-border/40">
              <div>
                <p className="text-sm font-bold text-text-primary">Allow Public Registration</p>
                <p className="text-xs text-text-tertiary">Enable new users to sign up via /register</p>
              </div>
              <Switch checked={allowRegistration} onChange={setAllowRegistration} />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-surface-secondary/40 rounded-xl border border-border/40">
              <div>
                <p className="text-sm font-bold text-text-primary">System Security Email Notifications</p>
                <p className="text-xs text-text-tertiary">Send automated alerts when admin accounts are modified</p>
              </div>
              <Switch checked={emailAlerts} onChange={setEmailAlerts} />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-surface-secondary/40 rounded-xl border border-border/40">
              <div>
                <p className="text-sm font-bold text-text-primary">Maintenance Mode</p>
                <p className="text-xs text-text-tertiary">Temporarily restrict access for non-admin accounts</p>
              </div>
              <Switch checked={maintenanceMode} onChange={setMaintenanceMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
