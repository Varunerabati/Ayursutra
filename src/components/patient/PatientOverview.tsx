import React from 'react';
import { useApp } from '../../contexts/AppContext';
import ProgressChart from '../charts/ProgressChart';
import { generateProgressData } from '../../data/chartData';

const PatientOverview: React.FC = () => {
  const { user, upcomingSession } = useApp();
  
  if (!user) return null;
  
  const { profile } = user;
  const progressData = generateProgressData(profile.id);
  const recentProgress = progressData.slice(-7); // Last 7 data points
  
  // Use context upcoming session if available, otherwise fall back to profile
  const nextSession = upcomingSession || profile.upcomingSession;
  
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
            <span className="text-sm text-gray-500">
              {upcomingSession ? 'Recently Updated' : 'Default Schedule'}
            </span>
          </div>
          <div>
            {nextSession ? (
              <>
                <p><strong>Date:</strong> {new Date(nextSession.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {nextSession.time}</p>
                <p><strong>Practitioner:</strong> {nextSession.practitioner}</p>
                <p><strong>Treatment Type:</strong> {nextSession.type}</p>
                <div className="mt-2 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-800 text-sm">
                    ✓ Your next session is confirmed. You will receive a reminder 24 hours before.
                  </p>
                </div>
              </>
            ) : (
              <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  No upcoming session scheduled. Please visit the Schedule tab to book your next appointment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;
