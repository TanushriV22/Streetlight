import React, { useState } from 'react';
import { Save } from 'lucide-react';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const AdminSettingsPage: React.FC = () => {
  const { user } = useAuth();
  
  const [systemName, setSystemName] = useState('Streetlight Complaint Management System');
  const [supportEmail, setSupportEmail] = useState('support@streetlight.com');
  const [mapApiKey, setMapApiKey] = useState('mock-api-key-123456789');
  const [defaultStatus, setDefaultStatus] = useState('pending');
  const [notificationTemplate, setNotificationTemplate] = useState(
    'Dear {{user}},\n\nYour streetlight complaint (ID: {{complaintId}}) status has been updated to {{status}}.\n\nThank you for helping us keep our streets safe and well-lit.\n\nRegards,\nThe Streetlight Team'
  );
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-300">
          <h2 className="text-lg font-semibold">Access Denied</h2>
          <p className="mt-1">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          System Settings
        </h1>
        
        <Button
          icon={<Save size={16} />}
          onClick={handleSaveSettings}
          loading={isSaving}
        >
          Save Changes
        </Button>
      </div>
      
      {saveSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-800 dark:text-green-300 mb-6">
          <h2 className="text-lg font-semibold">Settings Saved</h2>
          <p className="mt-1">Your system settings have been updated successfully.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              General Settings
            </h2>
            
            <form onSubmit={handleSaveSettings}>
              <Input
                label="System Name"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
              />
              
              <Input
                label="Support Email"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
              
              <Input
                label="Map API Key"
                value={mapApiKey}
                onChange={(e) => setMapApiKey(e.target.value)}
                type="password"
              />
              
              <Select
                label="Default Complaint Status"
                value={defaultStatus}
                onChange={setDefaultStatus}
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'in-progress', label: 'In Progress' },
                ]}
              />
              
              <div className="mt-6">
                <TextArea
                  label="Notification Email Template"
                  value={notificationTemplate}
                  onChange={(e) => setNotificationTemplate(e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Available variables: {{user}}, {{complaintId}}, {{status}}, {{address}}
                </p>
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              System Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Version
                </h3>
                <p className="mt-1 text-gray-900 dark:text-white">1.2.0</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Updated
                </h3>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Server Status
                </h3>
                <div className="mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-900 dark:text-white">Operational</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Database Status
                </h3>
                <div className="mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-900 dark:text-white">Connected</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 block">
                  View System Logs
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 block">
                  Backup Database
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 block">
                  Check for Updates
                </button>
                <button className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 block">
                  Clear System Cache
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;