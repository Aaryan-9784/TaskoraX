import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';

// Import new profile components
import ProfileHeader from '../components/profile/ProfileHeader';
import OverviewCards from '../components/profile/OverviewCards';
import PersonalInfo from '../components/profile/PersonalInfo';
import WorkSummary from '../components/profile/WorkSummary';
import ActivityTimeline from '../components/profile/ActivityTimeline';
import SkillsExpertise from '../components/profile/SkillsExpertise';
import CurrentProjects from '../components/profile/CurrentProjects';
import AccountSecurity from '../components/profile/AccountSecurity';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { stats } = useTask();
  
  // Refs for scrolling
  const securityRef = useRef(null);
  const personalInfoRef = useRef(null);

  const handleEditProfile = () => {
    personalInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChangePassword = () => {
    securityRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-10">
      
      {/* Page Title (Optional since we have a hero header, but good for structure) */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Profile & Account</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your personal information, work settings, and security preferences.
        </p>
      </div>

      {/* Hero Header Section */}
      <ProfileHeader 
        user={user} 
        onEditProfile={handleEditProfile}
        onChangePassword={handleChangePassword}
      />

      {/* Top Overview Cards */}
      <OverviewCards stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        
        {/* Left Column (Main Information) */}
        <div className="xl:col-span-2 space-y-6">
          <div ref={personalInfoRef}>
            <PersonalInfo user={user} updateProfile={updateProfile} />
          </div>
          
          <CurrentProjects />
          
          <div ref={securityRef}>
            <AccountSecurity />
          </div>
        </div>

        {/* Right Column (Summaries & Activity) */}
        <div className="xl:col-span-1 space-y-6 flex flex-col">
          <div className="flex-1 min-h-[300px]">
             <WorkSummary stats={stats} />
          </div>
          <div className="flex-1 min-h-[300px]">
             <SkillsExpertise />
          </div>
          <div className="flex-1 min-h-[400px]">
             <ActivityTimeline />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
