import React from 'react';
import { Link } from 'react-router-dom';
import ChildNav from '../components/ChildNav';
import Card from '../components/Card';
import Button from '../components/Button';
import './ChildDashboard.css';

const ChildDashboard = () => {
  const userName = localStorage.getItem('userName') || 'Friend';
  const badges = JSON.parse(localStorage.getItem('badges') || '[]');
  const recentActivity = JSON.parse(localStorage.getItem('recentActivity') || '[]');

  const quickLinks = [
    { path: '/video-lectures', icon: '🎬', label: 'Videos', color: '#667eea' },
    { path: '/learning-modules', icon: '📚', label: 'Learning', color: '#f5576c' },
    { path: '/games', icon: '🎮', label: 'Games', color: '#4facfe' },
    { path: '/emotional-wellness', icon: '😊', label: 'Mood', color: '#f093fb' },
    { path: '/creativity-zone', icon: '🎨', label: 'Create', color: '#43e97b' },
    { path: '/self-care', icon: '💆', label: 'Self-Care', color: '#fa709a' },
    { path: '/progress', icon: '🏆', label: 'Progress', color: '#fbbf24' },
  ];

  return (
    <div className="child-dashboard">
      <ChildNav />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Hello, {userName}! 👋</h1>
          <p>Ready for an amazing day of learning and fun?</p>
        </div>

        <div className="dashboard-stats">
          <Card className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <div className="stat-value">{badges.length}</div>
              <div className="stat-label">Badges Earned</div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-value">{localStorage.getItem('totalStars') || '0'}</div>
              <div className="stat-label">Stars Collected</div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-value">{recentActivity.length}</div>
              <div className="stat-label">Activities Done</div>
            </div>
          </Card>
        </div>

        <section className="quick-access">
          <h2>Quick Access</h2>
          <div className="quick-links-grid">
            {quickLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Card className="quick-link-card" style={{ borderTop: `4px solid ${link.color}` }}>
                  <div className="quick-link-icon" style={{ color: link.color }}>
                    {link.icon}
                  </div>
                  <h3>{link.label}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="activity-list">
              {recentActivity.slice(0, 5).map((activity, index) => (
                <Card key={index} className="activity-item">
                  <span className="activity-icon">{activity.icon}</span>
                  <div className="activity-info">
                    <h4>{activity.title}</h4>
                    <p>{activity.date}</p>
                  </div>
                  <span className="activity-badge">+{activity.points} ⭐</span>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="empty-state">
              <p>Start your learning journey to see activities here!</p>
              <Link to="/learning-modules">
                <Button>Start Learning</Button>
              </Link>
            </Card>
          )}
        </section>

        <section className="badges-preview">
          <h2>Your Badges</h2>
          {badges.length > 0 ? (
            <div className="badges-grid">
              {badges.slice(0, 6).map((badge, index) => (
                <Card key={index} className="badge-card">
                  <div className="badge-icon">{badge.icon}</div>
                  <h4>{badge.name}</h4>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="empty-state">
              <p>Complete activities to earn badges! 🌟</p>
            </Card>
          )}
          {badges.length > 0 && (
            <Link to="/progress">
              <Button variant="secondary">View All Badges</Button>
            </Link>
          )}
        </section>
      </div>
    </div>
  );
};

export default ChildDashboard;
