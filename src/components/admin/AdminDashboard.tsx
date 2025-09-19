import React, { useState } from 'react';
import CreateAccounts from './CreateAccounts';
import UploadReports from './UploadReports';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('accounts');

  const tabs = [
    { id: 'accounts', label: 'Create Accounts' },
    { id: 'reports', label: 'Upload Reports' }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="main-content">
          <h1>Admin Dashboard</h1>
          
          <div className="tabs">
            <div className="tab-list">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="tab-content active">
              {activeTab === 'accounts' && <CreateAccounts />}
              {activeTab === 'reports' && <UploadReports />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
