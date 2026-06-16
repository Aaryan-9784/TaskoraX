import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Select from '../common/Select';
import { HiOutlineUser, HiOutlineCamera, HiOutlineGlobeAlt, HiOutlineIdentification } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const AccountSettings = ({ user, updateProfile }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    timezone: user?.preferences?.timezone || 'UTC',
    language: user?.preferences?.language || 'en',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(form);
      toast.success('Account information updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update account information');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between pb-6 border-b border-border/40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/10 flex items-center justify-center border border-primary-100 shadow-sm">
            <HiOutlineUser className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              Account Information
            </h2>
            <p className="text-sm text-text-secondary mt-0.5">
              Update your personal details and public profile.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture Section */}
        <div className="bg-surface-secondary/50 rounded-3xl p-6 border border-border/40 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-100 to-primary-50 flex items-center justify-center text-primary-600 text-3xl font-bold overflow-hidden border-4 border-white shadow-lg ring-4 ring-primary-50/50">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                form.name.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <button type="button" className="absolute bottom-0 right-0 p-2 bg-white border border-border rounded-full text-text-secondary hover:text-primary-600 hover:border-primary-200 transition-all shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <HiOutlineCamera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-base font-semibold text-text-primary mb-1">Profile Picture</h3>
            <p className="text-sm text-text-secondary mb-3 max-w-md">
              A picture helps people recognize you and lets you know when you’re signed in to your account.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Button type="button" variant="secondary" size="sm">Change Picture</Button>
              <button type="button" className="text-sm text-danger-500 hover:text-danger-600 font-medium transition-colors">Remove</button>
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineIdentification className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-semibold text-text-primary">Personal Details</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
            <Input
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. johndoe"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <hr className="border-border/40" />

        {/* Preferences Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineGlobeAlt className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-semibold text-text-primary">Regional Preferences</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <Select
              label="Time Zone"
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              options={[
                { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
                { value: 'America/New_York', label: 'Eastern Time (ET)' },
                { value: 'America/Chicago', label: 'Central Time (CT)' },
                { value: 'America/Denver', label: 'Mountain Time (MT)' },
                { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
                { value: 'Europe/London', label: 'London (GMT)' },
                { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
              ]}
            />
            <Select
              label="Language"
              name="language"
              value={form.language}
              onChange={handleChange}
              options={[
                { value: 'en', label: 'English (US)' },
                { value: 'es', label: 'Español' },
                { value: 'fr', label: 'Français' },
                { value: 'de', label: 'Deutsch' },
                { value: 'ja', label: '日本語' },
              ]}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-border/40 mt-8">
          <Button type="button" variant="secondary">Cancel</Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
