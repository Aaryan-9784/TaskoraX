import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Import core profile components
import ProfileHeader from '../components/profile/ProfileHeader';
import PersonalInfo from '../components/profile/PersonalInfo';
import { 
  HiOutlineUser
} from 'react-icons/hi2';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [editSignal, setEditSignal] = useState(null);

  const handleEditProfile = () => {
    setEditSignal(Date.now());
    setTimeout(() => {
      document.getElementById('profile-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

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
      />

      {/* Main Content Layout */}
      <div id="profile-content" className="w-full mt-8 scroll-mt-24">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <PersonalInfo user={user} updateProfile={updateProfile} editSignal={editSignal} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
