import React, { useState, useEffect } from 'react';
import ChildNav from '../components/ChildNav';
import Card from '../components/Card';
import Button from '../components/Button';
import { generateIQQuiz, generateEQQuiz } from '../utils/quizGenerator';
import './LearningModules.css';

const LearningModules = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [moduleType, setModuleType] = useState(null); // 'iq' or 'eq'
  const [currentLevel, setCurrentLevel] = useState(1);
  const [questions, setQuestions] = useState([]);

  // Load user's progress from localStorage
  useEffect(() => {
    const savedIQLevel = parseInt(localStorage.getItem('iqLevel') || '1');
    const savedEQLevel = parseInt(localStorage.getItem('eqLevel') || '1');
    // Will be set when module is selected
  }, []);

  const handleModuleSelect = (type) => {
    setModuleType(type);
    setSelectedModule(type);
    
    // Load user's level for this module type
    const savedLevel = parseInt(localStorage.getItem(`${type}Level`) || '1');
    setCurrentLevel(savedLevel);
    
    // Generate questions for current level
    const generatedQuestions = type === 'iq' 
      ? generateIQQuiz(savedLevel)
      : generateEQQuiz(savedLevel);
    
    setQuestions(generatedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const question = questions[currentQuestion];
    
    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed - check if level up
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Save activity
    const activity = {
      icon: moduleType === 'iq' ? '🧠' : '❤️',
      title: `${moduleType.toUpperCase()} Level ${currentLevel} Completed!`,
      date: new Date().toLocaleDateString(),
      points: score * 10
    };
    
    const activities = JSON.parse(localStorage.getItem('recentActivity') || '[]');
    activities.unshift(activity);
    localStorage.setItem('recentActivity', JSON.stringify(activities.slice(0, 10)));
    
    // Update stars
    const totalStars = parseInt(localStorage.getItem('totalStars') || '0') + (score * 10);
    localStorage.setItem('totalStars', totalStars.toString());
    
    // Level up if score is 80% or higher
    let newLevel = currentLevel;
    let levelUp = false;
    if (percentage >= 80) {
      newLevel = currentLevel + 1;
      levelUp = true;
      localStorage.setItem(`${moduleType}Level`, newLevel.toString());
      setCurrentLevel(newLevel);
      
      // Award badge for level milestones
      const badges = JSON.parse(localStorage.getItem('badges') || '[]');
      const badgeName = `${moduleType === 'iq' ? 'IQ' : 'EQ'} Level ${newLevel}`;
      const badgeIcon = moduleType === 'iq' ? '🧠' : '❤️';
      if (!badges.find(b => b.name === badgeName)) {
        badges.push({ name: badgeName, icon: badgeIcon });
        localStorage.setItem('badges', JSON.stringify(badges));
      }
    }
    
    // Show completion message
    if (levelUp) {
      alert(`🎉 Amazing! You scored ${score}/${totalQuestions} (${percentage}%)!\n\n🌟 LEVEL UP! You've reached Level ${newLevel}!`);
      
      // Generate new questions for next level
      const nextLevelQuestions = moduleType === 'iq' 
        ? generateIQQuiz(newLevel)
        : generateEQQuiz(newLevel);
      setQuestions(nextLevelQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      alert(`🎉 Great job! You scored ${score}/${totalQuestions} (${percentage}%)!\n\n💡 Score 80% or higher to unlock the next level!`);
      handleModuleSelect(null);
    }
  };

  const getCurrentLevel = () => {
    if (moduleType) {
      return parseInt(localStorage.getItem(`${moduleType}Level`) || '1');
    }
    return 1;
  };

  const question = questions.length > 0 ? questions[currentQuestion] : null;

  return (
    <div className="learning-modules">
      <ChildNav />
      <div className="modules-content">
        <div className="modules-header">
          <h1>Learning Modules 📚</h1>
          <p>Challenge yourself with fun IQ and EQ activities! Level up as you improve!</p>
        </div>

        {!selectedModule ? (
          <div className="module-selection">
            <Card className="module-card iq-card" onClick={() => handleModuleSelect('iq')}>
              <div className="module-icon">🧠</div>
              <h2>IQ Challenges</h2>
              <p>Test your thinking skills with patterns, logic, and problem-solving!</p>
              <div className="level-info">
                <span className="level-badge">Level {parseInt(localStorage.getItem('iqLevel') || '1')}</span>
              </div>
              <Button>Start Challenge</Button>
            </Card>

            <Card className="module-card eq-card" onClick={() => handleModuleSelect('eq')}>
              <div className="module-icon">❤️</div>
              <h2>EQ Challenges</h2>
              <p>Learn about emotions, empathy, and understanding feelings!</p>
              <div className="level-info">
                <span className="level-badge">Level {parseInt(localStorage.getItem('eqLevel') || '1')}</span>
              </div>
              <Button variant="secondary">Start Challenge</Button>
            </Card>
          </div>
        ) : (
          <div className="quiz-container">
            <div className="quiz-header-info">
              <div className="level-display">
                <span className="level-label">Level {currentLevel}</span>
                {moduleType === 'iq' && <span className="module-type-badge">🧠 IQ Challenge</span>}
                {moduleType === 'eq' && <span className="module-type-badge">❤️ EQ Challenge</span>}
              </div>
              <div className="score-display">
                Score: {score}/{questions.length}
              </div>
            </div>

            <div className="quiz-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <p>Question {currentQuestion + 1} of {questions.length}</p>
            </div>

            {question && (
              <Card className="question-card">
                <h2 className="question-text">{question.question}</h2>
                
                {!showResult ? (
                  <>
                    <div className="options-grid">
                      {question.options.map((option, index) => (
                        <button
                          key={index}
                          className={`option-btn ${selectedAnswer === index ? 'selected' : ''}`}
                          onClick={() => handleAnswerSelect(index)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <Button 
                      size="large" 
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="result-section">
                      {selectedAnswer === question.correct ? (
                        <div className="result correct">
                          <div className="result-icon">✅</div>
                          <h3>Correct! Great job!</h3>
                          <p>{question.explanation}</p>
                        </div>
                      ) : (
                        <div className="result incorrect">
                          <div className="result-icon">❌</div>
                          <h3>Not quite, but good try!</h3>
                          <p>The correct answer was: {question.options[question.correct]}</p>
                          <p>{question.explanation}</p>
                        </div>
                      )}
                    </div>
                    <Button size="large" onClick={handleNext}>
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  </>
                )}
              </Card>
            )}

            <Button variant="secondary" onClick={() => handleModuleSelect(null)}>
              Back to Modules
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningModules;