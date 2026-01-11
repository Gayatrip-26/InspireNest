import React, { useState } from 'react';
import ChildNav from '../components/ChildNav';
import Card from '../components/Card';
import Button from '../components/Button';
import './EmotionalWellness.css';

const EmotionalWellness = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNotes, setMoodNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState(
    JSON.parse(localStorage.getItem('moodHistory') || '[]')
  );

  const moods = [
    { emoji: '😊', label: 'Happy', color: '#fbbf24' },
    { emoji: '😢', label: 'Sad', color: '#3b82f6' },
    { emoji: '😡', label: 'Angry', color: '#ef4444' },
    { emoji: '😴', label: 'Tired', color: '#8b5cf6' },
    { emoji: '😰', label: 'Worried', color: '#ec4899' },
    { emoji: '🤔', label: 'Confused', color: '#6b7280' },
    { emoji: '😄', label: 'Excited', color: '#10b981' },
    { emoji: '😌', label: 'Calm', color: '#14b8a6' },
  ];

  const breathingExercises = [
    {
      id: 1,
      title: 'Deep Breathing',
      description: 'Take slow, deep breaths to feel calm',
      steps: ['Breathe in for 4 counts', 'Hold for 4 counts', 'Breathe out for 4 counts', 'Repeat 3 times']
    },
    {
      id: 2,
      title: 'Box Breathing',
      description: 'A simple technique to reduce stress',
      steps: ['Inhale for 4 counts', 'Hold for 4 counts', 'Exhale for 4 counts', 'Hold for 4 counts', 'Repeat']
    }
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (!selectedMood) {
      alert('Please select a mood first!');
      return;
    }

    const moodEntry = {
      id: Date.now(),
      mood: selectedMood,
      notes: moodNotes,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    const updatedHistory = [moodEntry, ...moodHistory].slice(0, 30);
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));

    // Save activity
    const activity = {
      icon: selectedMood.emoji,
      title: 'Mood Check-in',
      date: new Date().toLocaleDateString(),
      points: 5
    };
    
    const activities = JSON.parse(localStorage.getItem('recentActivity') || '[]');
    activities.unshift(activity);
    localStorage.setItem('recentActivity', JSON.stringify(activities.slice(0, 10)));

    const totalStars = parseInt(localStorage.getItem('totalStars') || '0') + 5;
    localStorage.setItem('totalStars', totalStars.toString());

    // Reset form
    setSelectedMood(null);
    setMoodNotes('');
    alert('Mood saved! Great job checking in with yourself! 🌟');
  };

  const getMoodStats = () => {
    if (moodHistory.length === 0) return null;
    
    const last7Days = moodHistory.slice(0, 7);
    const happyCount = last7Days.filter(m => m.mood.label === 'Happy').length;
    const totalCount = last7Days.length;
    
    return {
      happyPercentage: Math.round((happyCount / totalCount) * 100),
      totalEntries: moodHistory.length
    };
  };

  const stats = getMoodStats();

  return (
    <div className="emotional-wellness">
      <ChildNav />
      <div className="wellness-content">
        <div className="wellness-header">
          <h1>Emotional Wellness 😊</h1>
          <p>How are you feeling today? Let's check in with your emotions!</p>
        </div>

        <section className="mood-tracker">
          <Card>
            <h2>How are you feeling right now?</h2>
            <div className="moods-grid">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  className={`mood-btn ${selectedMood?.label === mood.label ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect(mood)}
                  style={{ 
                    borderColor: selectedMood?.label === mood.label ? mood.color : '#e2e8f0',
                    backgroundColor: selectedMood?.label === mood.label ? `${mood.color}20` : 'white'
                  }}
                >
                  <div className="mood-emoji">{mood.emoji}</div>
                  <div className="mood-label">{mood.label}</div>
                </button>
              ))}
            </div>

            {selectedMood && (
              <div className="mood-notes">
                <label htmlFor="moodNotes">Want to add a note? (Optional)</label>
                <textarea
                  id="moodNotes"
                  value={moodNotes}
                  onChange={(e) => setMoodNotes(e.target.value)}
                  placeholder="Write how you're feeling..."
                  rows="4"
                  className="notes-textarea"
                />
              </div>
            )}

            <Button 
              size="large" 
              onClick={handleSaveMood}
              disabled={!selectedMood}
              className="save-mood-btn"
            >
              Save My Mood
            </Button>
          </Card>
        </section>

        {stats && (
          <section className="mood-stats">
            <Card>
              <h2>Your Mood Stats</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{stats.happyPercentage}%</div>
                  <div className="stat-label">Happy Days (Last 7)</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.totalEntries}</div>
                  <div className="stat-label">Total Check-ins</div>
                </div>
              </div>
            </Card>
          </section>
        )}

        <section className="mood-history">
          <h2>Recent Mood Check-ins</h2>
          {moodHistory.length > 0 ? (
            <div className="history-list">
              {moodHistory.slice(0, 10).map((entry) => (
                <Card key={entry.id} className="history-item">
                  <div className="history-mood">
                    <span className="history-emoji">{entry.mood.emoji}</span>
                    <div className="history-info">
                      <h4>{entry.mood.label}</h4>
                      <p>{entry.date} at {entry.time}</p>
                      {entry.notes && <p className="history-notes">{entry.notes}</p>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="empty-state">
              <p>Start tracking your mood to see your history here! 😊</p>
            </Card>
          )}
        </section>

        <section className="breathing-exercises">
          <h2>Calming Exercises</h2>
          <div className="exercises-grid">
            {breathingExercises.map((exercise) => (
              <Card key={exercise.id} className="exercise-card">
                <h3>{exercise.title}</h3>
                <p>{exercise.description}</p>
                <div className="exercise-steps">
                  <h4>Steps:</h4>
                  <ol>
                    {exercise.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="feeling-help">
          <Card className="help-card">
            <h2>Need Help? 💙</h2>
            <p>It's okay to feel different emotions. If you're feeling really sad or worried, talk to a trusted adult like a parent, teacher, or therapist.</p>
            <div className="help-tips">
              <div className="tip">💬 Talk to someone you trust</div>
              <div className="tip">🎨 Do something creative</div>
              <div className="tip">🏃 Go for a walk or play</div>
              <div className="tip">💤 Get some rest</div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default EmotionalWellness;



