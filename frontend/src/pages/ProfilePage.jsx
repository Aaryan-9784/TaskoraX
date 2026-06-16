import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Import core profile components
import ProfileHeader from '../components/profile/ProfileHeader';
import PersonalInfo from '../components/profile/PersonalInfo';
import AccountSecurity from '../components/profile/AccountSecurity';
import NotificationPreferences from '../components/profile/NotificationPreferences';
import { 
  HiOutlineUser, 
  HiOutlineShieldCheck, 
  HiOutlineBell
} from 'react-icons/hi2';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [editSignal, setEditSignal] = useState(null);

  const handleEditProfile = () => {
    setActiveTab('general');
    setEditSignal(Date.now());
    setTimeout(() => {
      document.getElementById('profile-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleChangePassword = () => {
    setActiveTab('security');
    setTimeout(() => {
      document.getElementById('profile-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const tabs = [
    { id: 'general', label: 'General Info', icon: HiOutlineUser },
    { id: 'security', label: 'Security', icon: HiOutlineShieldCheck },
    { id: 'notifications', label: 'Notifications', icon: HiOutlineBell },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Profile & Account</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage your personal information, work settings, and security preferences.
          </p>
        </div>
      </div>

      {/* Hero Header Section */}
      <ProfileHeader 
        user={user} 
        onEditProfile={handleEditProfile}
        onChangePassword={handleChangePassword}
      />

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 items-start">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0 sticky top-6 z-10">
          <div className="bg-white border border-border/50 rounded-2xl p-2 shadow-sm">
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-text-secondary hover:bg-surface-secondary/80 hover:text-text-primary'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-primary-600' : 'text-text-tertiary'}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div id="profile-content" className="flex-1 w-full max-w-4xl scroll-mt-24">
          {activeTab === 'general' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <PersonalInfo user={user} updateProfile={updateProfile} editSignal={editSignal} />
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AccountSecurity />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <NotificationPreferences />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
