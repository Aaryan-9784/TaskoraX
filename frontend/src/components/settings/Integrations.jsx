import React, { useState } from 'react';
import Button from '../common/Button';
import Switch from '../common/Switch';
import { HiOutlinePuzzlePiece, HiOutlineCodeBracket } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const Integrations = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'google',
      name: 'Google Workspace',
      description: 'Sync your calendar and use Google Drive for file attachments.',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
      connected: true,
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Link commits, PRs, and issues directly to your tasks.',
      icon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      connected: false,
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and create tasks directly from Slack channels.',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
      connected: false,
    },
    {
      id: 'figma',
      name: 'Figma',
      description: 'Embed live Figma designs into your project specifications.',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
      connected: false,
    },
  ]);

  const [webhooksEnabled, setWebhooksEnabled] = useState(false);

  const toggleIntegration = (id) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        const newStatus = !integration.connected;
        if (newStatus) {
          toast.success(`${integration.name} connected successfully`);
        } else {
          toast.success(`${integration.name} disconnected`);
        }
        return { ...integration, connected: newStatus };
      }
      return integration;
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
          <HiOutlinePuzzlePiece className="h-5 w-5 text-orange-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Integrations
          </h2>
          <p className="text-sm text-text-secondary">
            Connect TaskoraX with your favorite tools
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-text-primary mb-4">
            Connected Apps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex flex-col p-5 bg-white border border-border/50 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg p-2 bg-gray-50 flex items-center justify-center border border-border/50">
                    <img src={integration.icon} alt={integration.name} className="w-full h-full object-contain" />
                  </div>
                  <Button
                    variant={integration.connected ? "outline" : "primary"}
                    size="sm"
                    onClick={() => toggleIntegration(integration.id)}
                  >
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    {integration.name}
                    {integration.connected && (
                      <span className="w-2 h-2 rounded-full bg-success-500" title="Connected"></span>
                    )}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {integration.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-medium text-text-primary">
                Developer API & Webhooks
              </h3>
              <p className="text-sm text-text-secondary">
                Build custom integrations using our REST API and webhooks.
              </p>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <HiOutlineCodeBracket className="w-4 h-4 mr-2" />
              API Documentation
            </Button>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-text-primary">Personal Access Tokens</p>
                <p className="text-xs text-text-secondary">Tokens you have generated that can be used to access the TaskoraX API.</p>
              </div>
              <Button size="sm">Generate New Token</Button>
            </div>
            <div className="text-center py-6 bg-white border border-dashed border-border/50 rounded-lg">
              <p className="text-sm text-text-secondary">You haven't generated any personal access tokens yet.</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border/50">
               <Switch
                checked={webhooksEnabled}
                onChange={(val) => {
                  setWebhooksEnabled(val);
                  if(val) toast.success('Webhooks enabled');
                }}
                label="Enable Webhooks"
                description="Allow external services to receive real-time updates when events occur in your workspace."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
