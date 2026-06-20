import React, { useState } from 'react';
import Switch from '../common/Switch';
import Button from '../common/Button';
import { HiOutlineShieldExclamation, HiOutlineCloudArrowDown } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const PrivacyDataControls = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    teamVisibility: true,
    dataSharing: false,
  });

  const handleChange = (key, value) => {
    setPrivacy({ ...privacy, [key]: value });
    toast.success('Privacy settings updated');
  };

  const handleExportData = () => {
    toast.success('Data export requested. You will receive an email when it is ready.');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
          <HiOutlineShieldExclamation className="h-5 w-5 text-primary-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Privacy & Data Controls
          </h2>
          <p className="text-sm text-text-secondary">
            Manage your visibility and control your personal data
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-text-primary mb-4">
            Visibility
          </h3>
          <div className="space-y-1 bg-white border border-border/50 rounded-xl divide-y divide-border/50 px-5">
            <Switch
              checked={privacy.profileVisibility}
              onChange={(val) => handleChange('profileVisibility', val)}
              label="Public Profile"
              description="Make your profile visible to people outside of your workspaces."
            />
            <Switch
              checked={privacy.teamVisibility}
              onChange={(val) => handleChange('teamVisibility', val)}
              label="Team Directory"
              description="Show your contact information in the team directory."
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <h3 className="text-base font-medium text-text-primary mb-4">
            Data Sharing
          </h3>
          <div className="bg-white border border-border/50 rounded-xl px-5">
            <Switch
              checked={privacy.dataSharing}
              onChange={(val) => handleChange('dataSharing', val)}
              label="Share Analytics"
              description="Help us improve TaskoraX by securely sharing anonymous usage data."
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <h3 className="text-base font-medium text-text-primary mb-4">
            Your Data
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-gray-50 border border-border/50 rounded-xl">
            <div className="mb-4 sm:mb-0">
              <h4 className="text-sm font-medium text-text-primary flex items-center gap-2">
                <HiOutlineCloudArrowDown className="w-5 h-5 text-gray-500" />
                Export Personal Data
              </h4>
              <p className="text-xs text-text-secondary mt-1 max-w-md">
                Download a copy of your personal data, including account details, preferences, and workspace activity in JSON format.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              Request Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDataControls;
