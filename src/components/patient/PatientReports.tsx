import React, { useState } from 'react';
import { dummyReports } from '../../data/dummyData';
import ProgressChart from '../charts/ProgressChart';
import SessionsChart from '../charts/SessionsChart';
import { generateProgressData, generateSessionsData, generateRatingsData } from '../../data/chartData';

interface PatientReportsProps {
  user: any;
}

const PatientReports: React.FC<PatientReportsProps> = ({ user }) => {
  const [activeReportsTab, setActiveReportsTab] = useState('progress');

  const patientReports = dummyReports.filter(r => r.patientId === user.profile.id);
  const progressData = generateProgressData(user.profile.id);
  const sessionsData = generateSessionsData(user.profile.id);
  const ratingsData = generateRatingsData(user.profile.id);

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
                  <div className="flex gap-2">
                    <button className="btn btn-secondary btn-small">Area Chart</button>
                    <button className="btn btn-secondary btn-small">Line Chart</button>
                  </div>
                </div>
                <ProgressChart data={progressData} type="area" height={350} />
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Detailed Progress Timeline</h3>
                </div>
                <div>
                  {progressData.slice(-5).map((item, index) => (
                    <div key={index} className="flex justify-between align-center" style={{ padding: '1rem 0', borderBottom: '1px solid #f5f5f5' }}>
                      <div>
                        <div className="font-medium">{new Date(item.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">Session {item.sessions}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{item.progress}% Complete</div>
                        <div className="text-sm text-gray-500">Rating: {item.rating}/5</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeReportsTab === 'sessions' && (
            <div>
              <div className="grid grid-2">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Session Types Distribution</h3>
                  </div>
                  <SessionsChart data={sessionsData} type="bar" height={300} />
                </div>
                
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Session Types Breakdown</h3>
                  </div>
                  <SessionsChart data={sessionsData} type="pie" height={300} />
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Session Statistics</h3>
                </div>
                <div className="grid grid-4">
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
                  <div className="info-card">
                    <h3>{Math.round((user.profile.completedSessions / user.profile.totalSessions) * 100)}%</h3>
                    <p>Completion Rate</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeReportsTab === 'ratings' && (
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Treatment Ratings Over Time</h3>
                </div>
                <ProgressChart 
                  data={ratingsData.map(r => ({ 
                    date: r.date, 
                    progress: r.rating * 20, 
                    sessions: r.energy * 10,
                    rating: r.rating 
                  }))} 
                  type="line" 
                  height={300} 
                />
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Rating Summary</h3>
                </div>
                <div className="grid grid-3">
                  <div className="info-card">
                    <h3>{(ratingsData.reduce((sum, r) => sum + r.rating, 0) / ratingsData.length).toFixed(1)}</h3>
                    <p>Average Rating</p>
                  </div>
                  <div className="info-card">
                    <h3>{Math.max(...ratingsData.map(r => r.rating))}</h3>
                    <p>Highest Rating</p>
                  </div>
                  <div className="info-card">
                    <h3>{(ratingsData.reduce((sum, r) => sum + r.energy, 0) / ratingsData.length).toFixed(1)}</h3>
                    <p>Average Energy Level</p>
                  </div>
                </div>
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
