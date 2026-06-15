import React from 'react';
import {
  HiOutlineUser,
  HiOutlineShieldExclamation,
  HiOutlineBellAlert,
  HiOutlinePaintBrush,
  HiOutlineBriefcase,
  HiOutlinePuzzlePiece,
  HiOutlineLockClosed,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';

const tabs = [
  { id: 'account', label: 'Account Settings', icon: HiOutlineUser },
  { id: 'security', label: 'Security Center', icon: HiOutlineLockClosed },
  { id: 'notifications', label: 'Notification Preferences', icon: HiOutlineBellAlert },
  { id: 'appearance', label: 'Appearance & Personalization', icon: HiOutlinePaintBrush },
  { id: 'workspace', label: 'Workspace Preferences', icon: HiOutlineBriefcase },
  { id: 'integrations', label: 'Integrations', icon: HiOutlinePuzzlePiece },
  { id: 'privacy', label: 'Privacy & Data Controls', icon: HiOutlineShieldExclamation },
  { id: 'danger', label: 'Danger Zone', icon: HiOutlineExclamationTriangle, danger: true },
];

const SettingsSidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? tab.danger
                    ? 'bg-danger-50 text-danger-700'
                    : 'bg-primary-50 text-primary-700'
                  : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
              }`}
            >
              <Icon
                className={`flex-shrink-0 h-5 w-5 ${
                  isActive
                    ? tab.danger
                      ? 'text-danger-500'
                      : 'text-primary-500'
                    : 'text-gray-400 group-hover:text-gray-500'
                }`}
                aria-hidden="true"
              />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsSidebar;
