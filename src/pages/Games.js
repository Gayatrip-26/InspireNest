import React, { useState, useEffect } from 'react';
import ChildNav from '../components/ChildNav';
import Card from '../components/Card';
import Button from '../components/Button';
import './Games.css';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Focus Game State
  const [focusSequence, setFocusSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [focusLevel, setFocusLevel] = useState(1);

  // Motor Skills Game State
  const [motorTarget, setMotorTarget] = useState(null);
  const [motorHits, setMotorHits] = useState(0);

  // Speech Practice State
  const [speechWords] = useState(['Hello', 'Please', 'Thank you', 'Yes', 'No', 'Happy', 'Friend', 'Play']);
  const [currentSpeechWord, setCurrentSpeechWord] = useState('');
  const [speechAttempts, setSpeechAttempts] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isPlaying && selectedGame === 'focus') {
      interval = setInterval(() => {
        setGameTime(gameTime => gameTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedGame]);

  const startFocusGame = () => {
    setSelectedGame('focus');
    setIsPlaying(true);
    setGameScore(0);
    setGameTime(0);
    setFocusLevel(1);
    generateFocusSequence();
  };

  const generateFocusSequence = () => {
    const colors = ['🔴', '🔵', '🟢', '🟡'];
    const sequence = [];
    for (let i = 0; i < focusLevel + 2; i++) {
      sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    setFocusSequence(sequence);
    setUserSequence([]);
    
    // Show sequence with delay
    let index = 0;
    const showSequence = setInterval(() => {
      if (index < sequence.length) {
        // Highlight sequence item
        setTimeout(() => {
          setFocusSequence([...sequence]);
        }, index * 800);
        index++;
      } else {
        clearInterval(showSequence);
      }
    }, 100);
  };

  const handleFocusClick = (color) => {
    const newSequence = [...userSequence, color];
    setUserSequence(newSequence);

    if (newSequence[newSequence.length - 1] === focusSequence[newSequence.length - 1]) {
      if (newSequence.length === focusSequence.length) {
        // Level complete
        setGameScore(gameScore + 10 * focusLevel);
        setFocusLevel(focusLevel + 1);
        setTimeout(() => generateFocusSequence(), 1000);
      }
    } else {
      // Game over
      endGame();
    }
  };

  const startMotorGame = () => {
    setSelectedGame('motor');
    setIsPlaying(true);
    setGameScore(0);
    setMotorHits(0);
    createMotorTarget();
  };

  const createMotorTarget = () => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 70 + 10;
    setMotorTarget({ x, y });
  };

  const handleMotorClick = (e) => {
    if (motorTarget) {
      setMotorHits(motorHits + 1);
      setGameScore(gameScore + 5);
      createMotorTarget();
    }
  };

  const startSpeechGame = () => {
    setSelectedGame('speech');
    setIsPlaying(true);
    setGameScore(0);
    setSpeechAttempts(0);
    setCurrentSpeechWord(speechWords[Math.floor(Math.random() * speechWords.length)]);
  };

  const handleSpeechNext = () => {
    setSpeechAttempts(speechAttempts + 1);
    setGameScore(gameScore + 10);
    setCurrentSpeechWord(speechWords[Math.floor(Math.random() * speechWords.length)]);
  };

  const endGame = () => {
    setIsPlaying(false);
    const activity = {
      icon: selectedGame === 'focus' ? '🎯' : selectedGame === 'motor' ? '🤲' : '💬',
      title: `${selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game Completed`,
      date: new Date().toLocaleDateString(),
      points: gameScore
    };
    
    const activities = JSON.parse(localStorage.getItem('recentActivity') || '[]');
    activities.unshift(activity);
    localStorage.setItem('recentActivity', JSON.stringify(activities.slice(0, 10)));
    
    const totalStars = parseInt(localStorage.getItem('totalStars') || '0') + gameScore;
    localStorage.setItem('totalStars', totalStars.toString());
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    if (selectedGame === 'focus') {
      return (
        <Card className="game-card">
          <div className="game-header">
            <h2>Focus Game 🎯</h2>
            <div className="game-stats">
              <div>Level: {focusLevel}</div>
              <div>Score: {gameScore}</div>
            </div>
          </div>
          <div className="focus-instructions">
            <p>Watch the sequence and repeat it!</p>
            <div className="focus-sequence-display">
              {focusSequence.map((color, index) => (
                <span key={index} className="sequence-color">{color}</span>
              ))}
            </div>
          </div>
          <div className="focus-controls">
            <button className="focus-btn red" onClick={() => handleFocusClick('🔴')}>
              🔴
            </button>
            <button className="focus-btn blue" onClick={() => handleFocusClick('🔵')}>
              🔵
            </button>
            <button className="focus-btn green" onClick={() => handleFocusClick('🟢')}>
              🟢
            </button>
            <button className="focus-btn yellow" onClick={() => handleFocusClick('🟡')}>
              🟡
            </button>
          </div>
          <Button variant="secondary" onClick={endGame}>End Game</Button>
        </Card>
      );
    }

    if (selectedGame === 'motor') {
      return (
        <Card className="game-card">
          <div className="game-header">
            <h2>Motor Skills Game 🤲</h2>
            <div className="game-stats">
              <div>Hits: {motorHits}</div>
              <div>Score: {gameScore}</div>
            </div>
          </div>
          <div className="motor-instructions">
            <p>Click on the target as fast as you can!</p>
          </div>
          <div className="motor-game-area" onClick={handleMotorClick}>
            {motorTarget && (
              <div
                className="motor-target"
                style={{
                  left: `${motorTarget.x}%`,
                  top: `${motorTarget.y}%`,
                }}
              >
                🎯
              </div>
            )}
          </div>
          <Button variant="secondary" onClick={endGame}>End Game</Button>
        </Card>
      );
    }

    if (selectedGame === 'speech') {
      return (
        <Card className="game-card">
          <div className="game-header">
            <h2>Speech Practice 💬</h2>
            <div className="game-stats">
              <div>Words: {speechAttempts}</div>
              <div>Score: {gameScore}</div>
            </div>
          </div>
          <div className="speech-instructions">
            <p>Say this word out loud:</p>
            <div className="speech-word-display">{currentSpeechWord}</div>
            <p className="speech-hint">Practice saying it clearly and confidently!</p>
          </div>
          <div className="speech-controls">
            <Button size="large" onClick={handleSpeechNext}>
              Next Word
            </Button>
            <Button variant="secondary" onClick={endGame}>End Practice</Button>
          </div>
        </Card>
      );
    }
  };

  return (
    <div className="games-page">
      <ChildNav />
      <div className="games-content">
        <div className="games-header">
          <h1>Games & Activities 🎮</h1>
          <p>Have fun while learning and improving your skills!</p>
        </div>

        {!selectedGame ? (
          <div className="games-grid">
            <Card className="game-option-card" onClick={startFocusGame}>
              <div className="game-icon">🎯</div>
              <h2>Focus Game</h2>
              <p>Improve your concentration by remembering color sequences!</p>
              <Button>Play Now</Button>
            </Card>

            <Card className="game-option-card" onClick={startMotorGame}>
              <div className="game-icon">🤲</div>
              <h2>Motor Skills</h2>
              <p>Practice your hand-eye coordination by clicking targets!</p>
              <Button variant="secondary">Play Now</Button>
            </Card>

            <Card className="game-option-card" onClick={startSpeechGame}>
              <div className="game-icon">💬</div>
              <h2>Speech Practice</h2>
              <p>Practice speaking clearly with fun word exercises!</p>
              <Button variant="success">Play Now</Button>
            </Card>
          </div>
        ) : (
          <div className="game-container">
            {renderGame()}
            <Button variant="secondary" onClick={() => {
              setSelectedGame(null);
              setIsPlaying(false);
            }}>
              Back to Games
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;



