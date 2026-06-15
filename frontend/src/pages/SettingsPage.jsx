import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { HiOutlineArrowDownTray, HiOutlineShieldCheck, HiOutlineArrowPath } from 'react-icons/hi2';

// Import all settings components
import SettingsSidebar from '../components/settings/SettingsSidebar';
import AccountSettings from '../components/settings/AccountSettings';
import SecurityCenter from '../components/settings/SecurityCenter';
import NotificationPreferences from '../components/settings/NotificationPreferences';
import AppearancePersonalization from '../components/settings/AppearancePersonalization';
import WorkspacePreferences from '../components/settings/WorkspacePreferences';
import Integrations from '../components/settings/Integrations';
import PrivacyDataControls from '../components/settings/PrivacyDataControls';
import DangerZone from '../components/settings/DangerZone';

const SettingsPage = () => {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');

  // Map tabs to their components
  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings user={user} updateProfile={updateProfile} />;
      case 'security':
        return <SecurityCenter changePassword={changePassword} />;
      case 'notifications':
        return <NotificationPreferences user={user} updateProfile={updateProfile} />;
      case 'appearance':
        return <AppearancePersonalization user={user} updateProfile={updateProfile} />;
      case 'workspace':
        return <WorkspacePreferences user={user} updateProfile={updateProfile} />;
      case 'integrations':
        return <Integrations />;
      case 'privacy':
        return <PrivacyDataControls />;
      case 'danger':
        return <DangerZone logout={logout} />;
      default:
        return <AccountSettings user={user} updateProfile={updateProfile} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-success-50 text-success-700 text-xs font-medium border border-success-200">
              Pro Plan
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            Manage your account preferences, security, and workspace integrations.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <HiOutlineArrowDownTray className="w-4 h-4 mr-1.5" />
            Export Data
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <HiOutlineShieldCheck className="w-4 h-4 mr-1.5" />
            Security Check
          </Button>
          <Button variant="outline" size="sm">
            <HiOutlineArrowPath className="w-4 h-4 mr-1.5" />
            Reset Preferences
          </Button>
        </div>
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 bg-white border border-border/50 rounded-2xl p-6 lg:p-8 shadow-sm">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
