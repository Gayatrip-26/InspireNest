import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ChildNav.css';

const ChildNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const navItems = [
    { path: '/child-dashboard', label: 'Home', icon: '🏠' },
    { path: '/video-lectures', label: 'Videos', icon: '🎬' },
    { path: '/learning-modules', label: 'Learn', icon: '📚' },
    { path: '/games', label: 'Games', icon: '🎮' },
    { path: '/emotional-wellness', label: 'Mood', icon: '😊' },
    { path: '/creativity-zone', label: 'Create', icon: '🎨' },
    { path: '/self-care', label: 'Care', icon: '💆' },
    { path: '/progress', label: 'Progress', icon: '🏆' },
  ];

  return (
    <nav className="child-nav">
      <div className="nav-brand">
        <span className="logo-icon">🌟</span>
        <span className="logo-text">InspireNest</span>
      </div>
      <div className="nav-menu">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default ChildNav;
