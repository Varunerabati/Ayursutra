import React, { useState } from 'react';
import { dummyUsers, dummyFeedback, dummyReports } from '../../data/dummyData';
import PatientOverview from '../patient/PatientOverview';
import PatientSchedule from '../patient/PatientSchedule';
import PatientFeedback from '../patient/PatientFeedback';
import PatientReports from '../patient/PatientReports';

interface DoctorDashboardProps {
  user: any;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user }) => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const patients = dummyUsers.filter(u => u.role === 'patient');
  const totalPatients = patients.length;
  const activeCases = patients.filter(p => p.profile.completedSessions < p.profile.totalSessions).length;
  const averageProgress = Math.round(patients.reduce((sum, p) => sum + p.profile.progress, 0) / patients.length);
  const todaySessions = 3; // Dummy data

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'feedback', label: 'Feedback History' },
    { id: 'reports', label: 'Reports' }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="main-content">
          <h1>Doctor Dashboard</h1>
          
          {!selectedPatient ? (
            <>
              <div className="grid grid-4 mb-3">
                <div className="info-card">
                  <h3>{totalPatients}</h3>
                  <p>Total Patients</p>
                </div>
                <div className="info-card">
                  <h3>{activeCases}</h3>
                  <p>Active Cases</p>
                </div>
                <div className="info-card">
                  <h3>{averageProgress}%</h3>
                  <p>Average Progress</p>
                </div>
                <div className="info-card">
                  <h3>{todaySessions}</h3>
                  <p>Today&apos;s Sessions</p>
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Patient Management</h3>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Patient ID</th>
                      <th>Name</th>
                      <th>Therapy Type</th>
                      <th>Sessions</th>
                      <th>Progress</th>
                      <th>Last Session</th>
                      <th>Next Session</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map(patient => (
                      <tr key={patient.profile.id}>
                        <td>{patient.profile.id}</td>
                        <td>{patient.profile.name}</td>
                        <td>{patient.profile.therapyType}</td>
                        <td>{patient.profile.completedSessions}/{patient.profile.totalSessions}</td>
                        <td>
                          <div className="progress-bar" style={{ width: '80px' }}>
                            <div 
                              className="progress-fill" 
                              style={{ width: `${patient.profile.progress}%` }}
                            ></div>
                          </div>
                          {patient.profile.progress}%
                        </td>
                        <td>{new Date(patient.profile.lastSession.date).toLocaleDateString()}</td>
                        <td>{new Date(patient.profile.upcomingSession.date).toLocaleDateString()}</td>
                        <td>
                          <button 
                            onClick={() => setSelectedPatient(patient)}
                            className="btn btn-primary btn-small"
                          >
                            View Patient Results
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between align-center mb-3">
                <h2>Patient: {selectedPatient.profile.name}</h2>
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="btn btn-secondary"
                >
                  Back to Patient List
                </button>
              </div>
              
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
                  {activeTab === 'overview' && <PatientOverview user={selectedPatient} />}
                  {activeTab === 'schedule' && <PatientSchedule user={selectedPatient} />}
                  {activeTab === 'feedback' && (
                    <div className="fade-in">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Feedback History</h3>
                        </div>
                        <div>
                          {dummyFeedback.filter(f => f.patientId === selectedPatient.profile.id).map(feedback => (
                            <div key={feedback.id} className="card" style={{ marginBottom: '1rem' }}>
                              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                                {new Date(feedback.date).toLocaleDateString()} - Rating: {feedback.rating}/5
                              </div>
                              <p><strong>Symptoms:</strong> {feedback.symptoms}</p>
                              <p><strong>Improvements:</strong> {feedback.improvements}</p>
                              <p><strong>Side Effects:</strong> {feedback.sideEffects}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'reports' && <PatientReports user={selectedPatient} />}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
