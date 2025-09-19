import React from 'react';
import ProgressChart from '../charts/ProgressChart';
import { generateProgressData } from '../../data/chartData';

interface PatientOverviewProps {
  user: any;
}

const PatientOverview: React.FC<PatientOverviewProps> = ({ user }) => {
  const { profile } = user;
  const progressData = generateProgressData(profile.id);
  const recentProgress = progressData.slice(-7); // Last 7 data points
  
  return (
    <div className="fade-in">
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Patient Information</h3>
          </div>
          <div>
            <p><strong>Patient ID:</strong> {profile.id}</p>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Age:</strong> {profile.age} years</p>
            <p><strong>Therapy Type:</strong> {profile.therapyType}</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Treatment Progress</h3>
          </div>
          <div>
            <p><strong>Sessions Completed:</strong> {profile.completedSessions} / {profile.totalSessions}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${profile.progress}%` }}
              ></div>
            </div>
            <p className="mt-1">{profile.progress}% Complete</p>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Progress Trend</h3>
        </div>
        <ProgressChart data={recentProgress} type="area" height={250} />
      </div>
      
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Last Session</h3>
          </div>
          <div>
            <p><strong>Date:</strong> {new Date(profile.lastSession.date).toLocaleDateString()}</p>
            <p><strong>Practitioner:</strong> {profile.lastSession.practitioner}</p>
            <p><strong>Treatment Type:</strong> {profile.lastSession.type}</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Upcoming Session</h3>
          </div>
          <div>
            <p><strong>Date:</strong> {new Date(profile.upcomingSession.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {profile.upcomingSession.time}</p>
            <p><strong>Practitioner:</strong> {profile.upcomingSession.practitioner}</p>
            <p><strong>Treatment Type:</strong> {profile.upcomingSession.type}</p>
            <button className="btn btn-secondary btn-small mt-2">
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;
