import React, { useState } from 'react';
import Switch from '../common/Switch';
import Select from '../common/Select';
import { HiOutlinePaintBrush } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const AppearancePersonalization = ({ user, updateProfile }) => {
  const [theme, setTheme] = useState(user?.preferences?.theme || 'Light');
  const [compactMode, setCompactMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

  const handleThemeChange = async (newTheme) => {
    const oldTheme = theme;
    setTheme(newTheme);
    try {
      await updateProfile({ preferences: { theme: newTheme } });
      toast.success('Appearance updated');
    } catch (error) {
      toast.error('Failed to update appearance');
      setTheme(oldTheme);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
        <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
          <HiOutlinePaintBrush className="h-5 w-5 text-accent-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Appearance & Personalization
          </h2>
          <p className="text-sm text-text-secondary">
            Customize how TaskoraX looks and feels
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-text-primary mb-4">
            Theme
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'Light', label: 'Light Mode', bg: 'bg-white', text: 'text-gray-900', border: 'border-gray-200' },
              { id: 'Dark', label: 'Dark Mode', bg: 'bg-gray-900', text: 'text-white', border: 'border-gray-700' },
              { id: 'System', label: 'System Mode', bg: 'bg-gradient-to-r from-gray-100 to-gray-800', text: 'text-gray-900', border: 'border-gray-300' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  theme === t.id
                    ? 'border-primary-500 bg-primary-50/30'
                    : 'border-border hover:border-gray-300 bg-white'
                }`}
              >
                <div
                  className={`w-full h-24 rounded-lg border shadow-sm mb-3 overflow-hidden flex flex-col ${t.border} ${t.bg}`}
                >
                  {/* Mock window content */}
                  <div className={`h-4 w-full border-b ${t.border} flex items-center px-2 gap-1`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-danger-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-warning-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-success-400"></div>
                  </div>
                  <div className="flex flex-1">
                    <div className={`w-1/4 h-full border-r ${t.border}`}></div>
                    <div className="w-3/4 h-full p-2 space-y-1">
                      <div className={`w-1/2 h-2 rounded ${t.id === 'Dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                      <div className={`w-3/4 h-2 rounded ${t.id === 'Dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className={`text-sm font-medium ${theme === t.id ? 'text-primary-700' : 'text-text-primary'}`}>
                    {t.label}
                  </span>
                  {theme === t.id && (
                    <div className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <h3 className="text-base font-medium text-text-primary mb-4">
            Interface Density
          </h3>
          <div className="bg-white border border-border/50 rounded-xl px-5">
            <Switch
              checked={compactMode}
              onChange={(val) => {
                setCompactMode(val);
                toast.success('Interface density updated');
              }}
              label="Compact Mode"
              description="Reduce spacing and padding to fit more content on the screen."
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <h3 className="text-base font-medium text-text-primary mb-4">
            Typography
          </h3>
          <div className="max-w-md">
            <Select
              label="Font Size"
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                toast.success('Typography preferences updated');
              }}
              options={[
                { value: 'small', label: 'Small (12px)' },
                { value: 'medium', label: 'Medium (14px - Default)' },
                { value: 'large', label: 'Large (16px)' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearancePersonalization;
