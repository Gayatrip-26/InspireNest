# InspireNest 🌟

A fully responsive web application designed for mentally disabled children, featuring learning modules, games, emotional wellness tracking, creativity tools, and progress monitoring.

## Features

### For Children
- **Learning Modules**: AI-generated IQ and EQ quizzes and challenges
- **Games**: Focus games, motor skills activities, and speech practice
- **Emotional Wellness**: Mood tracking and emotional development tools
- **Creativity Zone**: Digital drawing and creative writing
- **Self-Care Tutorials**: Step-by-step life skills tutorials
- **Progress Tracking**: Badges, stars, and activity reports

### For Parents/Therapists
- **Dashboard**: Monitor child's progress and activities
- **Mood Insights**: Track emotional wellness patterns
- **Activity Analysis**: View detailed activity breakdowns
- **Recommendations**: AI-powered insights and suggestions

## Technologies Used

- React 18.2.0
- React Router DOM 6.20.0
- CSS3 (Simple, responsive styling)
- Local Storage (for data persistence)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
  ├── components/          # Reusable components (Button, Card, ChildNav)
  ├── pages/              # Page components
  │   ├── LandingPage.js
  │   ├── Login.js
  │   ├── Register.js
  │   ├── ChildDashboard.js
  │   ├── LearningModules.js
  │   ├── Games.js
  │   ├── EmotionalWellness.js
  │   ├── CreativityZone.js
  │   ├── SelfCareTutorials.js
  │   ├── ProgressTracking.js
  │   └── ParentDashboard.js
  ├── App.js              # Main app component with routing
  ├── App.css
  └── index.js            # Entry point
```

## Features in Detail

### Learning Modules
- IQ Challenges: Pattern recognition, counting, logic, shapes, sequences
- EQ Challenges: Emotion recognition, empathy, social skills, self-awareness
- Interactive quizzes with instant feedback
- Progress tracking and badges

### Games
- **Focus Game**: Memory and concentration training with color sequences
- **Motor Skills**: Hand-eye coordination with target clicking
- **Speech Practice**: Word pronunciation and speech exercises

### Emotional Wellness
- Daily mood tracking with emoji selection
- Mood history and statistics
- Breathing exercises and calming techniques
- Support resources

### Creativity Zone
- Digital drawing canvas with customizable brushes
- Creative writing with story prompts
- Creative ideas and inspiration

### Self-Care Tutorials
- Step-by-step tutorials for:
  - Hand washing
  - Teeth brushing
  - Getting dressed
  - Eating healthy
  - Bedtime routine
  - Cleaning up

### Progress Tracking
- Comprehensive statistics dashboard
- Badge collection system
- Activity breakdowns
- Achievement history

## User Types

1. **Child**: Full access to learning modules, games, and activities
2. **Parent/Therapist**: Access to monitoring dashboard and progress reports

## Accessibility Features

- Large, readable fonts
- High contrast colors
- Simple, intuitive navigation
- Keyboard navigation support
- Touch-friendly interface
- Emoji-based visual cues

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational and therapeutic purposes.

## Contributing

This is a demo project. For production use, consider adding:
- Backend API integration
- User authentication system
- Database storage
- Real-time updates
- Therapist tools
- Additional accessibility features



