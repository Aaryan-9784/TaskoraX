import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Import all settings components
import SettingsSidebar from '../components/settings/SettingsSidebar';
import AccountSettings from '../components/settings/AccountSettings';
import SecurityCenter from '../components/settings/SecurityCenter';
import NotificationPreferences from '../components/settings/NotificationPreferences';
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
      case 'danger':
        return <DangerZone logout={logout} />;
      default:
        return <AccountSettings user={user} updateProfile={updateProfile} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          </div>
          <p className="text-sm text-text-secondary">
            Manage your account preferences, security, and workspace integrations.
          </p>
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
