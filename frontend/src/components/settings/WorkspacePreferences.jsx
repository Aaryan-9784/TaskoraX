import React, { useState } from 'react';
import Switch from '../common/Switch';
import Select from '../common/Select';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const WorkspacePreferences = ({ user, updateProfile }) => {
  const [preferences, setPreferences] = useState({
    defaultView: 'board',
    taskSorting: 'priority',
    showCompletedTasks: true,
    showSubtasksInList: false,
    startOfWeek: 'monday',
  });

  const handleChange = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
    toast.success('Workspace preference updated');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <HiOutlineBriefcase className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Workspace Preferences
          </h2>
          <p className="text-sm text-text-secondary">
            Customize how data is displayed across your workspace
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-text-primary mb-4">
            Default Views
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select
              label="Default Project View"
              value={preferences.defaultView}
              onChange={(e) => handleChange('defaultView', e.target.value)}
              options={[
                { value: 'board', label: 'Board (Kanban)' },
                { value: 'list', label: 'List View' },
                { value: 'timeline', label: 'Timeline (Gantt)' },
                { value: 'calendar', label: 'Calendar' },
              ]}
            />
            <Select
              label="Default Task Sorting"
              value={preferences.taskSorting}
              onChange={(e) => handleChange('taskSorting', e.target.value)}
              options={[
                { value: 'priority', label: 'Highest Priority First' },
                { value: 'dueDate', label: 'Due Date (Earliest First)' },
                { value: 'created', label: 'Recently Created' },
                { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
              ]}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <h3 className="text-base font-medium text-text-primary mb-4">
            Display Settings
          </h3>
          <div className="space-y-1 bg-white border border-border/50 rounded-xl divide-y divide-border/50 px-5">
            <Switch
              checked={preferences.showCompletedTasks}
              onChange={(val) => handleChange('showCompletedTasks', val)}
              label="Show completed tasks"
              description="Keep completed tasks visible in your project views."
            />
            <Switch
              checked={preferences.showSubtasksInList}
              onChange={(val) => handleChange('showSubtasksInList', val)}
              label="Expand subtasks by default"
              description="Automatically expand tasks to show their subtasks in List view."
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <h3 className="text-base font-medium text-text-primary mb-4">
            Calendar Settings
          </h3>
          <div className="max-w-md">
            <Select
              label="Start of the week"
              value={preferences.startOfWeek}
              onChange={(e) => handleChange('startOfWeek', e.target.value)}
              options={[
                { value: 'sunday', label: 'Sunday' },
                { value: 'monday', label: 'Monday' },
                { value: 'saturday', label: 'Saturday' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePreferences;
