import React, { useState } from 'react';
import Switch from '../common/Switch';
import Select from '../common/Select';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const NotificationPreferences = ({ user, updateProfile }) => {
  const [notifications, setNotifications] = useState(
    user?.preferences?.notifications || {
      email: true,
      push: false,
      taskReminders: true,
      projectUpdates: true,
      teamMentions: true,
      weeklyDigest: true,
      marketing: false,
    }
  );
  const [schedule, setSchedule] = useState('always');

  const toggleNotification = async (key, value) => {
    const newNotifications = { ...notifications, [key]: value };
    setNotifications(newNotifications);
    try {
      await updateProfile({ preferences: { notifications: newNotifications } });
      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update preferences');
      setNotifications(notifications);
    }
  };

  const notificationSections = [
    {
      title: 'Communication Channels',
      items: [
        { key: 'email', label: 'Email Notifications', description: 'Receive daily updates and activity reports via email.' },
        { key: 'push', label: 'Push Notifications', description: 'Get real-time alerts on your desktop or mobile device.' },
      ]
    },
    {
      title: 'Activity Alerts',
      items: [
        { key: 'taskReminders', label: 'Task Reminders', description: 'Get reminded about upcoming deadlines and overdue tasks.' },
        { key: 'projectUpdates', label: 'Project Updates', description: 'Notifications when a project status changes or reaches a milestone.' },
        { key: 'teamMentions', label: 'Team Mentions', description: 'Receive an alert when someone @mentions you in a comment.' },
      ]
    },
    {
      title: 'Reports & Updates',
      items: [
        { key: 'weeklyDigest', label: 'Weekly Digest', description: 'A weekly summary of your team\'s productivity and completed tasks.' },
        { key: 'marketing', label: 'Marketing Emails', description: 'Tips, feature updates, and special offers from TaskoraX.' },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
        <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center">
          <HiOutlineBellAlert className="h-5 w-5 text-success-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Notification Preferences
          </h2>
          <p className="text-sm text-text-secondary">
            Control when and how you receive alerts
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-50 p-5 rounded-xl border border-border/50">
          <div className="max-w-md">
            <Select
              label="Notification Schedule"
              value={schedule}
              onChange={(e) => {
                setSchedule(e.target.value);
                toast.success('Schedule updated');
              }}
              options={[
                { value: 'always', label: 'Always send notifications immediately' },
                { value: 'batched', label: 'Batch notifications (Every hour)' },
                { value: 'quiet', label: 'Quiet Hours (Pause 10 PM - 8 AM)' },
              ]}
            />
          </div>
          {schedule === 'quiet' && (
            <p className="mt-3 text-xs text-text-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warning-500"></span>
              Notifications are currently paused until 8:00 AM.
            </p>
          )}
        </div>

        {notificationSections.map((section, idx) => (
          <div key={idx} className="pt-2">
            <h3 className="text-base font-medium text-text-primary mb-4">
              {section.title}
            </h3>
            <div className="space-y-1 bg-white border border-border/50 rounded-xl divide-y divide-border/50">
              {section.items.map((item) => (
                <div key={item.key} className="px-5">
                  <Switch
                    checked={notifications[item.key]}
                    onChange={(val) => toggleNotification(item.key, val)}
                    label={item.label}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreferences;
