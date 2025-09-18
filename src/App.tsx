import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import PatientDashboard from './components/patient/PatientDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

interface User {
  username: string;
  role: 'patient' | 'doctor' | 'admin';
  profile: any;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      
      {user.role === 'patient' && <PatientDashboard user={user} />}
      {user.role === 'doctor' && <DoctorDashboard user={user} />}
      {user.role === 'admin' && <AdminDashboard user={user} />}
    </div>
  );
}

export default App;
