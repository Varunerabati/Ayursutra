import React from 'react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const getRoleDisplayName = () => {
    switch (user.role) {
      case 'patient':
        return 'Patient';
      case 'doctor':
        return `Doctor - ${user.profile.specialization}`;
      case 'admin':
        return 'Administrator';
      default:
        return user.role;
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">AyurSutra</a>
          <div className="user-info">
            <div>
              <div className="user-name">{user.profile.name}</div>
              <div className="user-role">{getRoleDisplayName()}</div>
            </div>
            <button onClick={onLogout} className="btn btn-secondary btn-small">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
