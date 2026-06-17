import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import {
  LuUser, LuMail, LuAtSign, LuPhone, LuMapPin, LuGlobe,
  LuClock, LuBriefcase, LuCamera, LuTrash2, LuEye, LuLock,
  LuSmartphone, LuMonitorSmartphone, LuCircleCheck, LuFolder,
  LuUsers, LuActivity, LuShieldCheck, LuShieldAlert, LuShield,
  LuCloudUpload
} from 'react-icons/lu';
import toast from 'react-hot-toast';
import { getInitials } from '../../utils/helpers';

const PremiumInput = ({ label, icon: Icon, error, className = '', ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`relative flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label className={`text-sm font-medium transition-colors duration-200 ${isFocused ? 'text-primary-500' : 'text-text-secondary'}`}>
          {label}
        </label>
      )}
      <div className={`relative flex items-center bg-surface-secondary/30 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 h-[56px] ${isFocused ? 'border-primary-500 shadow-[0_0_15px_rgba(var(--color-primary-500),0.15)] bg-surface-secondary/60' : 'border-border/40 hover:border-border/80'} ${error ? 'border-danger-500' : ''}`}>
        {Icon && (
          <div className="pl-4 pr-3 flex items-center justify-center text-text-tertiary">
            <Icon className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-primary-500' : ''}`} />
          </div>
        )}
        <input
          className="flex-1 bg-transparent text-text-primary placeholder:text-text-tertiary/50 outline-none px-2 h-full w-full"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-danger-500 mt-1">{error}</p>}
    </div>
  );
};

const PremiumSelect = ({ label, icon: Icon, error, className = '', options = [], value, onChange, name, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value) || null;

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    if (onChange) {
      onChange({ target: { name, value: optionValue } });
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative flex flex-col space-y-1.5 ${className}`} ref={dropdownRef}>
      {label && (
        <label className={`text-sm font-medium transition-colors duration-200 ${isOpen ? 'text-primary-500' : 'text-text-secondary'}`}>
          {label}
        </label>
      )}
      <div 
        className={`relative flex items-center bg-surface-secondary/30 backdrop-blur-md border rounded-2xl cursor-pointer transition-all duration-300 h-[56px] select-none ${isOpen ? 'border-primary-500 shadow-[0_0_15px_rgba(var(--color-primary-500),0.15)] bg-surface-secondary/60' : 'border-border/40 hover:border-border/80'} ${error ? 'border-danger-500' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {Icon && (
          <div className="pl-4 pr-3 flex items-center justify-center text-text-tertiary">
            <Icon className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-primary-500' : ''}`} />
          </div>
        )}
        <div className={`flex-1 px-2 h-full flex items-center ${selectedOption ? 'text-text-primary' : 'text-text-tertiary/50'}`}>
          {selectedOption ? selectedOption.label : 'Select timezone'}
        </div>
        <div className={`absolute right-4 pointer-events-none text-text-tertiary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full top-[80px] bg-surface-primary border border-border/50 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl"
          >
            <div className="max-h-60 overflow-y-auto py-2">
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between ${
                    value === opt.value 
                      ? 'bg-primary-500/10 text-primary-600 font-medium' 
                      : 'text-text-primary hover:bg-surface-secondary/60'
                  }`}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label}
                  {value === opt.value && <LuCircleCheck className="w-4 h-4 text-primary-500" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-xs text-danger-500 mt-1">{error}</p>}
    </div>
  );
};

const AccountSettings = ({ user, updateProfile }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    timezone: user?.preferences?.timezone || 'UTC',
    language: user?.preferences?.language || 'en',
    avatar: user?.avatar || '',
    location: user?.location || '',
    occupation: user?.occupation || '',
    website: user?.website || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, avatar: reader.result }));
        setAvatarError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    setForm(prev => ({ ...prev, avatar: '' }));
    setAvatarError(false);
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      timezone: user?.preferences?.timezone || 'UTC',
      language: user?.preferences?.language || 'en',
      avatar: user?.avatar || '',
      location: user?.location || '',
      occupation: user?.occupation || '',
      website: user?.website || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        preferences: {
          ...user?.preferences,
          timezone: form.timezone,
          language: form.language,
        }
      };
      // Remove root level timezone/language to keep payload clean
      delete payload.timezone;
      delete payload.language;

      await updateProfile(payload);
      toast.success('Account information updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update account information');
    } finally {
      setIsSaving(false);
    }
  };

  const fieldsForCompletion = ['name', 'username', 'email', 'phone', 'location', 'timezone', 'occupation', 'website'];
  const completedFieldsCount = fieldsForCompletion.filter(f => form[f] && form[f].trim() !== '').length;
  // 8 fields = 80%, avatar = 20%
  const completionPercentage = Math.min(100, Math.round((completedFieldsCount / 8) * 80) + (form.avatar ? 20 : 0));

  const role = user?.role || 'USER';
  const getRoleBadge = () => {
    switch(role.toUpperCase()) {
      case 'SUPER ADMIN':
        return { text: 'SUPER ADMIN', color: 'from-danger-500 to-danger-600', icon: LuShieldAlert };
      case 'ADMIN':
        return { text: 'ADMIN', color: 'from-primary-500 to-purple-600', icon: LuShieldCheck };
      default:
        return { text: 'USER', color: 'from-blue-500 to-primary-500', icon: LuShield };
    }
  };
  const badge = getRoleBadge();
  const BadgeIcon = badge.icon;

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2026';

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Premium Profile Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-surface-secondary/40 backdrop-blur-xl border border-border/50 shadow-sm p-8 lg:p-10"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-[120px] h-[120px] rounded-full p-1 bg-gradient-to-tr from-primary-500 via-purple-500 to-primary-300 shadow-xl group-hover:shadow-[0_0_30px_rgba(var(--color-primary-500),0.3)] transition-all duration-500">
              <div className="w-full h-full rounded-full bg-surface-primary border-4 border-surface-primary flex items-center justify-center overflow-hidden relative">
                {form.avatar && !avatarError ? (
                  <img 
                    src={form.avatar} 
                    alt={getInitials(form.name || user?.name || 'User')} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-600 text-4xl font-bold">
                    {getInitials(form.name || user?.name || 'User')}
                  </div>
                )}
                {/* Online Status Indicator */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-success-500 border-4 border-surface-primary rounded-full" />
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={handlePictureClick} 
              className="absolute bottom-2 -right-2 p-3 bg-surface-primary text-text-secondary hover:text-primary-500 rounded-full shadow-lg border border-border/50 hover:scale-110 transition-all duration-300 z-20 group-hover:border-primary-200"
            >
              <LuCamera className="w-5 h-5" />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>

          {/* User Details & Actions */}
          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start pt-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                {form.name || 'Your Name'}
              </h1>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-semibold shadow-sm`}>
                <BadgeIcon className="w-3.5 h-3.5" />
                {badge.text}
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-2 text-text-secondary mb-6">
              <LuMail className="w-4 h-4" />
              <span>{form.email || 'email@example.com'}</span>
              <span className="mx-2 opacity-30">•</span>
              <span>Joined {joinDate}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Button type="button" variant="primary" onClick={handlePictureClick} className="rounded-full px-6 shadow-md hover:shadow-lg shadow-primary-500/20 group">
                <LuCloudUpload className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                Upload Photo
              </Button>
              {form.avatar && (
                <Button type="button" variant="danger" onClick={handleRemovePicture} className="rounded-full px-6 bg-danger-500/10 text-danger-600 hover:bg-danger-500 hover:text-white border-none">
                  <LuTrash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
              <Button type="button" variant="secondary" onClick={() => navigate('/profile')} className="rounded-full px-6 border-border/60 hover:bg-surface-secondary">
                <LuEye className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          <form onSubmit={handleSubmit}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface-primary rounded-[2rem] p-8 border border-border/40 shadow-sm"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-600">
                  <LuUser className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Personal Information</h2>
                  <p className="text-sm text-text-secondary mt-1">Manage your personal details and account information.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PremiumInput
                  label="Full Name"
                  name="name"
                  icon={LuUser}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Aryan Patel"
                  required
                />
                <PremiumInput
                  label="Username"
                  name="username"
                  icon={LuAtSign}
                  value={form.username}
                  onChange={handleChange}
                  placeholder="e.g. aryanpatel"
                />
                <PremiumInput
                  label="Email Address"
                  name="email"
                  type="email"
                  icon={LuMail}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. aryan@example.com"
                  className="md:col-span-2"
                  required
                />
                <PremiumInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  icon={LuPhone}
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
                <PremiumInput
                  label="Occupation"
                  name="occupation"
                  icon={LuBriefcase}
                  value={form.occupation}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer"
                />
                <PremiumInput
                  label="Location"
                  name="location"
                  icon={LuMapPin}
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                  className="md:col-span-2"
                />
                <PremiumSelect
                  label="Timezone"
                  name="timezone"
                  icon={LuClock}
                  value={form.timezone}
                  onChange={handleChange}
                  className="md:col-span-2"
                  options={[
                    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
                    { value: 'EST', label: 'EST (Eastern Standard Time)' },
                    { value: 'CST', label: 'CST (Central Standard Time)' },
                    { value: 'MST', label: 'MST (Mountain Standard Time)' },
                    { value: 'PST', label: 'PST (Pacific Standard Time)' },
                    { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
                    { value: 'CET', label: 'CET (Central European Time)' },
                    { value: 'IST', label: 'IST (Indian Standard Time)' },
                    { value: 'JST', label: 'JST (Japan Standard Time)' },
                    { value: 'AEST', label: 'AEST (Australian Eastern Standard Time)' }
                  ]}
                />
                <PremiumInput
                  label="Website"
                  name="website"
                  type="url"
                  icon={LuGlobe}
                  value={form.website}
                  onChange={handleChange}
                  placeholder="e.g. https://yourwebsite.com"
                  className="md:col-span-2"
                />
              </div>

              <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-border/40">
                <Button type="button" variant="secondary" onClick={handleCancel} className="rounded-xl px-6">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="rounded-xl px-8 shadow-md shadow-primary-500/20">
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
            </motion.div>
          </form>

          {/* Security Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-surface-primary rounded-[2rem] p-8 border border-border/40 shadow-sm"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600">
                <LuLock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Security Information</h2>
                <p className="text-sm text-text-secondary mt-1">Manage your password and sessions.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-surface-secondary/20 hover:bg-surface-secondary/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-text-tertiary/10 flex items-center justify-center">
                    <LuLock className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Password</h4>
                    <p className="text-xs text-text-secondary mt-0.5">Last changed 3 months ago</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="rounded-lg">Change Password</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-surface-secondary/20 hover:bg-surface-secondary/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center">
                    <LuMonitorSmartphone className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Active Sessions</h4>
                    <p className="text-xs text-text-secondary mt-0.5">2 devices logged in</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="rounded-lg">Manage Devices</Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* Account Completion Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-primary-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-8 -mb-8 blur-xl" />
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Profile Completion</h3>
              <p className="text-white/80 text-sm mb-6">Complete your profile to unlock all features.</p>
              
              <div className="flex items-end justify-between mb-2">
                <span className="text-4xl font-extrabold tracking-tight">{completionPercentage}%</span>
              </div>
              
              <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden mb-6 backdrop-blur-sm">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-white rounded-full"
                />
              </div>

              {completionPercentage < 100 ? (
                <Button variant="primary" className="w-full bg-white text-primary-700 hover:bg-gray-50 rounded-xl border-none shadow-md">
                  Complete Profile
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 py-2 px-4 bg-white/20 rounded-xl backdrop-blur-md">
                  <LuCircleCheck className="w-5 h-5" />
                  <span className="font-medium">All Set!</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Account Statistics Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-surface-primary rounded-[2rem] p-8 border border-border/40 shadow-sm"
          >
            <h3 className="text-lg font-bold text-text-primary mb-6">Account Statistics</h3>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                    <LuCircleCheck className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">Tasks Created</span>
                </div>
                <span className="text-lg font-bold text-text-primary">124</span>
              </div>

              <div className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                    <LuFolder className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">Projects Joined</span>
                </div>
                <span className="text-lg font-bold text-text-primary">12</span>
              </div>

              <div className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
                    <LuUsers className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">Team Members</span>
                </div>
                <span className="text-lg font-bold text-text-primary">8</span>
              </div>

              <div className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success-500/10 text-success-500 group-hover:scale-110 transition-transform">
                    <LuActivity className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">Productivity</span>
                </div>
                <span className="text-lg font-bold text-success-600">91%</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
