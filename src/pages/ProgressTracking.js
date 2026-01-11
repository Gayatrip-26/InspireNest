import React from 'react';
import ChildNav from '../components/ChildNav';
import Card from '../components/Card';
import './ProgressTracking.css';

const ProgressTracking = () => {
  const badges = JSON.parse(localStorage.getItem('badges') || '[]');
  const recentActivity = JSON.parse(localStorage.getItem('recentActivity') || '[]');
  const totalStars = parseInt(localStorage.getItem('totalStars') || '0');
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');

  // Calculate statistics
  const totalActivities = recentActivity.length;
  const thisWeekActivities = recentActivity.filter(activity => {
    const activityDate = new Date(activity.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return activityDate >= weekAgo;
  }).length;

  // Get activity breakdown
  const activityBreakdown = recentActivity.reduce((acc, activity) => {
    const category = activity.icon;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Calculate streak (simplified - consecutive days with activity)
  const calculateStreak = () => {
    if (recentActivity.length === 0) return 0;
    const sortedDates = [...new Set(recentActivity.map(a => a.date))].sort((a, b) => {
      return new Date(b) - new Date(a);
    });
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);
      date.setHours(0, 0, 0, 0);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (date.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  const allBadges = [
    { name: 'First Steps', icon: '👶', description: 'Complete your first activity' },
    { name: 'Learning Star', icon: '⭐', description: 'Complete 5 learning activities' },
    { name: 'Game Master', icon: '🎮', description: 'Play 10 games' },
    { name: 'Creative Genius', icon: '🎨', description: 'Create 5 artworks' },
    { name: 'Mood Tracker', icon: '😊', description: 'Track mood for 7 days' },
    { name: 'Perfect Week', icon: '🏆', description: 'Complete activities 7 days in a row' },
    { name: 'IQ Master', icon: '🧠', description: 'Get perfect score on IQ challenge' },
    { name: 'EQ Expert', icon: '❤️', description: 'Get perfect score on EQ challenge' },
  ];

  const earnedBadgeNames = badges.map(b => b.name);
  const unearnedBadges = allBadges.filter(badge => !earnedBadgeNames.includes(badge.name));

  return (
    <div className="progress-tracking">
      <ChildNav />
      <div className="progress-content">
        <div className="progress-header">
          <h1>Your Progress 🏆</h1>
          <p>See how much you've accomplished!</p>
        </div>

        <section className="progress-stats">
          <div className="stats-grid">
            <Card className="stat-card-large">
              <div className="stat-icon-large">⭐</div>
              <div className="stat-value-large">{totalStars}</div>
              <div className="stat-label-large">Total Stars</div>
            </Card>
            <Card className="stat-card-large">
              <div className="stat-icon-large">📊</div>
              <div className="stat-value-large">{totalActivities}</div>
              <div className="stat-label-large">Activities Completed</div>
            </Card>
            <Card className="stat-card-large">
              <div className="stat-icon-large">🔥</div>
              <div className="stat-value-large">{currentStreak}</div>
              <div className="stat-label-large">Day Streak</div>
            </Card>
            <Card className="stat-card-large">
              <div className="stat-icon-large">🏆</div>
              <div className="stat-value-large">{badges.length}</div>
              <div className="stat-label-large">Badges Earned</div>
            </Card>
          </div>
        </section>

        <section className="weekly-progress">
          <Card>
            <h2>This Week's Activity</h2>
            <div className="week-stats">
              <div className="week-stat-item">
                <div className="week-stat-value">{thisWeekActivities}</div>
                <div className="week-stat-label">Activities This Week</div>
              </div>
              <div className="week-stat-item">
                <div className="week-stat-value">{moodHistory.slice(0, 7).length}</div>
                <div className="week-stat-label">Mood Check-ins</div>
              </div>
            </div>
          </Card>
        </section>

        <section className="badges-section">
          <h2>Your Badges</h2>
          <div className="badges-container">
            <div className="earned-badges">
              <h3>Earned Badges ({badges.length})</h3>
              {badges.length > 0 ? (
                <div className="badges-grid">
                  {badges.map((badge, index) => {
                    const fullBadge = allBadges.find(b => b.name === badge.name);
                    return (
                      <Card key={index} className="badge-card-earned">
                        <div className="badge-icon-earned">{badge.icon}</div>
                        <h4>{badge.name}</h4>
                        {fullBadge && <p>{fullBadge.description}</p>}
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="empty-state">
                  <p>Complete activities to earn your first badge! 🌟</p>
                </Card>
              )}
            </div>

            <div className="unearned-badges">
              <h3>Badges to Earn ({unearnedBadges.length})</h3>
              {unearnedBadges.length > 0 ? (
                <div className="badges-grid">
                  {unearnedBadges.map((badge, index) => (
                    <Card key={index} className="badge-card-unearned">
                      <div className="badge-icon-unearned">🔒</div>
                      <h4>{badge.name}</h4>
                      <p>{badge.description}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="empty-state">
                  <p>Amazing! You've earned all badges! 🎉</p>
                </Card>
              )}
            </div>
          </div>
        </section>

        <section className="activity-breakdown">
          <Card>
            <h2>Activity Breakdown</h2>
            <div className="breakdown-grid">
              {Object.entries(activityBreakdown).map(([category, count]) => (
                <div key={category} className="breakdown-item">
                  <div className="breakdown-icon">{category}</div>
                  <div className="breakdown-info">
                    <div className="breakdown-count">{count}</div>
                    <div className="breakdown-label">Activities</div>
                  </div>
                </div>
              ))}
              {Object.keys(activityBreakdown).length === 0 && (
                <div className="empty-state">
                  <p>Start activities to see your breakdown!</p>
                </div>
              )}
            </div>
          </Card>
        </section>

        <section className="recent-achievements">
          <h2>Recent Achievements</h2>
          {recentActivity.length > 0 ? (
            <div className="achievements-list">
              {recentActivity.slice(0, 10).map((activity, index) => (
                <Card key={index} className="achievement-item">
                  <div className="achievement-icon">{activity.icon}</div>
                  <div className="achievement-info">
                    <h4>{activity.title}</h4>
                    <p>{activity.date}</p>
                  </div>
                  <div className="achievement-points">+{activity.points} ⭐</div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="empty-state">
              <p>Complete activities to see your achievements here! 🌟</p>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProgressTracking;



