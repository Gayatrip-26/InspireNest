import React, { useState } from 'react';
import ChildNav from '../components/ChildNav';
import Card from '../components/Card';
import Button from '../components/Button';
import './SelfCareTutorials.css';

const SelfCareTutorials = () => {
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const tutorials = [
    {
      id: 1,
      title: 'Hand Washing',
      icon: '🧼',
      description: 'Learn how to wash your hands properly',
      steps: [
        { text: 'Turn on the water and wet your hands', emoji: '💧' },
        { text: 'Apply soap and rub your hands together', emoji: '🧼' },
        { text: 'Scrub all parts: palms, backs, between fingers, and nails', emoji: '👐' },
        { text: 'Rub for at least 20 seconds (sing Happy Birthday twice!)', emoji: '⏰' },
        { text: 'Rinse your hands with clean water', emoji: '💦' },
        { text: 'Dry your hands with a clean towel', emoji: '🧻' }
      ]
    },
    {
      id: 2,
      title: 'Teeth Brushing',
      icon: '🪥',
      description: 'Keep your teeth clean and healthy',
      steps: [
        { text: 'Put toothpaste on your toothbrush', emoji: '🪥' },
        { text: 'Brush the front of your teeth in circles', emoji: '🦷' },
        { text: 'Brush the back of your teeth', emoji: '😁' },
        { text: 'Brush the chewing surfaces', emoji: '🦷' },
        { text: 'Brush your tongue gently', emoji: '👅' },
        { text: 'Spit out the toothpaste and rinse with water', emoji: '💧' }
      ]
    },
    {
      id: 3,
      title: 'Getting Dressed',
      icon: '👕',
      description: 'Learn to dress yourself step by step',
      steps: [
        { text: 'Pick out your clothes for the day', emoji: '👔' },
        { text: 'Put on your underwear first', emoji: '🩲' },
        { text: 'Put on your shirt (arms through sleeves)', emoji: '👕' },
        { text: 'Put on your pants (one leg at a time)', emoji: '👖' },
        { text: 'Put on your socks and shoes', emoji: '👟' },
        { text: 'Check if everything feels comfortable!', emoji: '✅' }
      ]
    },
    {
      id: 4,
      title: 'Eating Healthy',
      icon: '🍎',
      description: 'Make good food choices',
      steps: [
        { text: 'Wash your hands before eating', emoji: '🧼' },
        { text: 'Eat fruits and vegetables every day', emoji: '🥗' },
        { text: 'Drink plenty of water', emoji: '💧' },
        { text: 'Eat slowly and chew your food well', emoji: '🍽️' },
        { text: 'Try new healthy foods', emoji: '🍎' },
        { text: 'Stop eating when you feel full', emoji: '✅' }
      ]
    },
    {
      id: 5,
      title: 'Bedtime Routine',
      icon: '😴',
      description: 'Get ready for a good night\'s sleep',
      steps: [
        { text: 'Brush your teeth', emoji: '🪥' },
        { text: 'Put on your pajamas', emoji: '🛏️' },
        { text: 'Use the bathroom', emoji: '🚽' },
        { text: 'Read a book or listen to calm music', emoji: '📚' },
        { text: 'Get into bed', emoji: '🛏️' },
        { text: 'Close your eyes and relax', emoji: '😴' }
      ]
    },
    {
      id: 6,
      title: 'Cleaning Up',
      icon: '🧹',
      description: 'Keep your space tidy',
      steps: [
        { text: 'Put toys back in their place', emoji: '🧸' },
        { text: 'Put books on the shelf', emoji: '📚' },
        { text: 'Throw away any trash', emoji: '🗑️' },
        { text: 'Put clothes in the laundry basket', emoji: '👕' },
        { text: 'Wipe down surfaces with a cloth', emoji: '🧽' },
        { text: 'Stand back and admire your clean space!', emoji: '✨' }
      ]
    }
  ];

  const handleTutorialSelect = (tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (selectedTutorial && currentStep < selectedTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tutorial complete
      const activity = {
        icon: selectedTutorial.icon,
        title: `${selectedTutorial.title} Tutorial Completed`,
        date: new Date().toLocaleDateString(),
        points: 15
      };
      
      const activities = JSON.parse(localStorage.getItem('recentActivity') || '[]');
      activities.unshift(activity);
      localStorage.setItem('recentActivity', JSON.stringify(activities.slice(0, 10)));

      const totalStars = parseInt(localStorage.getItem('totalStars') || '0') + 15;
      localStorage.setItem('totalStars', totalStars.toString());

      alert(`Great job completing the ${selectedTutorial.title} tutorial! 🌟`);
      setSelectedTutorial(null);
      setCurrentStep(0);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="self-care-tutorials">
      <ChildNav />
      <div className="tutorials-content">
        <div className="tutorials-header">
          <h1>Self-Care Tutorials 💆</h1>
          <p>Learn important life skills step by step!</p>
        </div>

        {!selectedTutorial ? (
          <div className="tutorials-grid">
            {tutorials.map((tutorial) => (
              <Card 
                key={tutorial.id} 
                className="tutorial-card"
                onClick={() => handleTutorialSelect(tutorial)}
              >
                <div className="tutorial-icon">{tutorial.icon}</div>
                <h2>{tutorial.title}</h2>
                <p>{tutorial.description}</p>
                <Button>Start Tutorial</Button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="tutorial-viewer">
            <Card className="tutorial-content">
              <div className="tutorial-header-view">
                <div className="tutorial-icon-large">{selectedTutorial.icon}</div>
                <h2>{selectedTutorial.title}</h2>
                <div className="progress-indicator">
                  Step {currentStep + 1} of {selectedTutorial.steps.length}
                </div>
              </div>

              <div className="step-content">
                <div className="step-emoji">{selectedTutorial.steps[currentStep].emoji}</div>
                <div className="step-text">{selectedTutorial.steps[currentStep].text}</div>
              </div>

              <div className="step-progress-bar">
                <div 
                  className="step-progress-fill" 
                  style={{ width: `${((currentStep + 1) / selectedTutorial.steps.length) * 100}%` }}
                ></div>
              </div>

              <div className="tutorial-actions">
                <Button 
                  variant="secondary" 
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                <Button 
                  size="large"
                  onClick={handleNextStep}
                >
                  {currentStep < selectedTutorial.steps.length - 1 ? 'Next Step' : 'Complete Tutorial'}
                </Button>
              </div>
            </Card>

            <Button variant="secondary" onClick={() => {
              setSelectedTutorial(null);
              setCurrentStep(0);
            }}>
              Back to Tutorials
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfCareTutorials;



