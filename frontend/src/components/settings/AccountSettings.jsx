import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Select from '../common/Select';
import { HiOutlineUser, HiOutlineCamera } from 'react-icons/hi2';
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
          <HiOutlineUser className="h-5 w-5 text-primary-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Account Information
          </h2>
          <p className="text-sm text-text-secondary">
            Update your personal details and public profile
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 pb-6 border-b border-border/50">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold overflow-hidden border-4 border-white shadow-sm">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              form.name.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-border rounded-full text-text-secondary hover:text-primary-600 hover:border-primary-200 transition-colors shadow-sm">
            <HiOutlineCamera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary">Profile Picture</h3>
          <p className="text-xs text-text-secondary mt-1 max-w-sm">
            JPG, GIF or PNG. Max size of 5MB.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="johndoe"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
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
        <div className="flex justify-end pt-4 border-t border-border/50">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
