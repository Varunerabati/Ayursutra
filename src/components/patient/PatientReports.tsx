import React, { useState } from 'react';
import { dummyReports } from '../../data/dummyData';

interface PatientReportsProps {
  user: any;
}

const PatientReports: React.FC<PatientReportsProps> = ({ user }) => {
  const [activeReportsTab, setActiveReportsTab] = useState('progress');

  const patientReports = dummyReports.filter(r => r.patientId === user.profile.id);

  const progressData = [
    { date: '2025-01-01', progress: 20 },
    { date: '2025-01-03', progress: 25 },
    { date: '2025-01-05', progress: 35 },
    { date: '2025-01-08', progress: 42 },
    { date: '2025-01-10', progress: 57 }
  ];

  const reportsTab = [
    { id: 'progress', label: 'Progress' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'ratings', label: 'Ratings' },
    { id: 'documents', label: 'Documents' }
  ];

  const handlePreview = (report: any) => {
    window.open(report.preview, '_blank');
  };

  const handleDownload = (report: any) => {
    alert(`Downloading ${report.type} for Session ${report.sessionNumber}`);
  };

  return (
    <div className="fade-in">
      <div className="tabs">
        <div className="tab-list">
          {reportsTab.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeReportsTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveReportsTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="tab-content active">
          {activeReportsTab === 'progress' && (
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Progress Chart</h3>
                </div>
                <div className="chart-placeholder">
                  Progress Chart Visualization (Would show actual chart with real data)
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Progress Timeline</h3>
                </div>
                <div>
                  {progressData.map((item, index) => (
                    <div key={index} className="flex justify-between align-center" style={{ padding: '0.5rem 0', borderBottom: '1px solid #f5f5f5' }}>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                      <span>{item.progress}% Complete</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeReportsTab === 'sessions' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Session Statistics</h3>
              </div>
              <div className="grid grid-3">
                <div className="info-card">
                  <h3>{user.profile.completedSessions}</h3>
                  <p>Completed Sessions</p>
                </div>
                <div className="info-card">
                  <h3>{user.profile.totalSessions - user.profile.completedSessions}</h3>
                  <p>Remaining Sessions</p>
                </div>
                <div className="info-card">
                  <h3>{user.profile.progress}%</h3>
                  <p>Overall Progress</p>
                </div>
              </div>
            </div>
          )}
          
          {activeReportsTab === 'ratings' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Treatment Ratings</h3>
              </div>
              <div className="chart-placeholder">
                Rating Trends Chart (Would show actual ratings over time)
              </div>
            </div>
          )}
          
          {activeReportsTab === 'documents' && (
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Session Documents</h3>
                </div>
                <div className="grid grid-3">
                  {patientReports.map(report => (
                    <div key={report.id} className="card">
                      <div className="text-center">
                        <img 
                          src={report.preview} 
                          alt={`${report.type} Preview`}
                          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                        <h4 className="mt-2">{report.type}</h4>
                        <p>Session {report.sessionNumber}</p>
                        <p>{new Date(report.date).toLocaleDateString()}</p>
                        <p>{report.practitioner}</p>
                        <div className="flex gap-1 mt-2">
                          <button 
                            onClick={() => handlePreview(report)}
                            className="btn btn-secondary btn-small"
                          >
                            Preview
                          </button>
                          <button 
                            onClick={() => handleDownload(report)}
                            className="btn btn-primary btn-small"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientReports;
