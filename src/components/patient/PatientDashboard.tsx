import React, { useState } from 'react';
import PatientOverview from './PatientOverview';
import PatientSchedule from './PatientSchedule';
import PatientFeedback from './PatientFeedback';
import PatientReports from './PatientReports';

interface PatientDashboardProps {
  user: any;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'reports', label: 'Reports' }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="main-content">
          <h1>Patient Dashboard</h1>
          
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
              {activeTab === 'overview' && <PatientOverview user={user} />}
              {activeTab === 'schedule' && <PatientSchedule user={user} />}
              {activeTab === 'feedback' && <PatientFeedback user={user} />}
              {activeTab === 'reports' && <PatientReports user={user} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
