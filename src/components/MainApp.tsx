import React from 'react';
import { useApp } from '../contexts/AppContext';
import LoginPage from './LoginPage';
import Header from './Header';
import PatientDashboard from './patient/PatientDashboard';
import DoctorDashboard from './doctor/DoctorDashboard';
import AdminDashboard from './admin/AdminDashboard';

interface User {
  username: string;
  role: 'patient' | 'doctor' | 'admin';
  profile: any;
}

const MainApp: React.FC = () => {
  const { user, setUser, setUpcomingSession } = useApp();

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    // Initialize upcoming session from user profile
    if (loggedInUser.profile.upcomingSession) {
      setUpcomingSession(loggedInUser.profile.upcomingSession);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUpcomingSession(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      
      {user.role === 'patient' && <PatientDashboard />}
      {user.role === 'doctor' && <DoctorDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </div>
  );
};

export default MainApp;