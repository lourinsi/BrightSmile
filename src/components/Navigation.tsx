import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="navigation">
      <div className="logo">
        <h1>BrightSmile😊</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <span className="icon">👤</span>
          Dashboard
        </Link>
        <Link to="/patients" className={location.pathname === '/patients' ? 'active' : ''}>
          <span className="icon">👥</span>
          Patients
        </Link>
        <Link to="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}>
          <span className="icon">📅</span>
          Calendar
        </Link>
        <Link to="/finance" className={location.pathname === '/finance' ? 'active' : ''}>
          <span className="icon">📊</span>
          Finance
        </Link>
      </div>
      <div className="profile-icon">
        <img src="/profile-pic.jpg" alt="Dr. Smith" />
      </div>
    </nav>
  );
};

export default Navigation;