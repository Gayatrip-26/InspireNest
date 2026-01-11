import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import './ParentDashboard.css';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Parent';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  // Get child's data (simulated - in real app, this would come from API)
  const childActivities = JSON.parse(localStorage.getItem('recentActivity') || '[]');
  const childBadges = JSON.parse(localStorage.getItem('badges') || '[]');
  const childStars = parseInt(localStorage.getItem('totalStars') || '0');
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');

  // Calculate statistics
  const totalActivities = childActivities.length;
  const thisWeekActivities = childActivities.filter(activity => {
    const activityDate = new Date(activity.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return activityDate >= weekAgo;
  }).length;

  // Get mood statistics
  const recentMoods = moodHistory.slice(0, 7);
  const happyDays = recentMoods.filter(m => m.mood.label === 'Happy').length;
  const moodPercentage = recentMoods.length > 0 ? Math.round((happyDays / recentMoods.length) * 100) : 0;

  // Activity breakdown
  const activityBreakdown = childActivities.reduce((acc, activity) => {
    const category = activity.icon;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="parent-dashboard">
      <nav className="parent-nav">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🌟</span>
            <span className="logo-text">InspireNest</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome, {userName} 👋</h1>
          <p>Monitor your child's progress and activities</p>
        </div>

        <section className="overview-stats">
          <div className="stats-grid">
            <Card className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <div className="stat-value">{childStars}</div>
                <div className="stat-label">Total Stars Earned</div>
              </div>
            </Card>
            <Card className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-value">{totalActivities}</div>
                <div className="stat-label">Activities Completed</div>
              </div>
            </Card>
            <Card className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <div className="stat-value">{childBadges.length}</div>
                <div className="stat-label">Badges Earned</div>
              </div>
            </Card>
            <Card className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <div className="stat-value">{thisWeekActivities}</div>
                <div className="stat-label">This Week</div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mood-insights">
          <Card>
            <h2>Emotional Wellness Insights</h2>
            {moodHistory.length > 0 ? (
              <>
                <div className="mood-stats-grid">
                  <div className="mood-stat-item">
                    <div className="mood-stat-value">{moodPercentage}%</div>
                    <div className="mood-stat-label">Happy Days (Last 7 Days)</div>
                  </div>
                  <div className="mood-stat-item">
                    <div className="mood-stat-value">{moodHistory.length}</div>
                    <div className="mood-stat-label">Total Mood Check-ins</div>
                  </div>
                </div>
                <div className="recent-moods">
                  <h3>Recent Moods</h3>
                  <div className="moods-timeline">
                    {recentMoods.slice(0, 7).map((entry, index) => (
                      <div key={index} className="mood-entry">
                        <span className="mood-emoji-small">{entry.mood.emoji}</span>
                        <span className="mood-date">{entry.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>No mood tracking data yet. Encourage your child to check in with their emotions!</p>
              </div>
            )}
          </Card>
        </section>

        <section className="activity-analysis">
          <Card>
            <h2>Activity Analysis</h2>
            {Object.keys(activityBreakdown).length > 0 ? (
              <div className="activity-breakdown-parent">
                {Object.entries(activityBreakdown).map(([category, count]) => (
                  <div key={category} className="activity-item-parent">
                    <div className="activity-icon-parent">{category}</div>
                    <div className="activity-info-parent">
                      <div className="activity-count-parent">{count}</div>
                      <div className="activity-label-parent">times</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No activity data yet. Activities will appear here as your child uses the platform.</p>
              </div>
            )}
          </Card>
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          {childActivities.length > 0 ? (
            <div className="activity-list-parent">
              {childActivities.slice(0, 10).map((activity, index) => (
                <Card key={index} className="activity-item-parent-card">
                  <div className="activity-icon-parent-card">{activity.icon}</div>
                  <div className="activity-info-parent-card">
                    <h4>{activity.title}</h4>
                    <p>{activity.date}</p>
                  </div>
                  <div className="activity-points-parent">+{activity.points} ⭐</div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="empty-state">
              <p>No activities yet. Activities will appear here as your child uses InspireNest.</p>
            </Card>
          )}
        </section>

        <section className="badges-section">
          <h2>Badges Earned</h2>
          {childBadges.length > 0 ? (
            <div className="badges-grid-parent">
              {childBadges.map((badge, index) => (
                <Card key={index} className="badge-card-parent">
                  <div className="badge-icon-parent">{badge.icon}</div>
                  <h4>{badge.name}</h4>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="empty-state">
              <p>No badges earned yet. Encourage your child to complete activities to earn badges!</p>
            </Card>
          )}
        </section>

        <section className="insights-section">
          <Card className="insights-card">
            <h2>💡 Insights & Recommendations</h2>
            <div className="insights-list">
              {totalActivities === 0 && (
                <div className="insight-item">
                  <p><strong>Getting Started:</strong> Encourage your child to explore the learning modules and games to begin their journey!</p>
                </div>
              )}
              {thisWeekActivities < 5 && totalActivities > 0 && (
                <div className="insight-item">
                  <p><strong>Consistency:</strong> Your child has completed {thisWeekActivities} activities this week. Consider setting daily goals for better progress.</p>
                </div>
              )}
              {moodPercentage < 50 && moodHistory.length > 0 && (
                <div className="insight-item">
                  <p><strong>Emotional Support:</strong> Your child has been feeling less happy recently. Consider checking in with them or consulting with a therapist.</p>
                </div>
              )}
              {childBadges.length === 0 && totalActivities > 5 && (
                <div className="insight-item">
                  <p><strong>Motivation:</strong> Your child has been active! Encourage them to complete challenges to earn their first badge!</p>
                </div>
              )}
              {thisWeekActivities >= 10 && (
                <div className="insight-item">
                  <p><strong>Great Progress:</strong> Excellent! Your child has been very active this week with {thisWeekActivities} activities. Keep up the great work!</p>
                </div>
              )}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ParentDashboard;
