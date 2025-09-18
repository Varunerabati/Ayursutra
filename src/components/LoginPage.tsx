import React, { useState } from 'react';
import { dummyUsers } from '../data/dummyData';

interface LoginPageProps {
  onLogin: (user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const user = dummyUsers.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">AyurSutra</h1>
        <p className="login-subtitle">Panchakarma Therapy Management System</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <div className="error mb-2">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-3">
          <h4>Demo Accounts:</h4>
          <p><strong>Patients:</strong> patient1/pass123, patient2/pass123</p>
          <p><strong>Doctors:</strong> doctor1/pass123, doctor2/pass123</p>
          <p><strong>Admin:</strong> admin1/admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
