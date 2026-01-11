import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ChildDashboard from './pages/ChildDashboard';
import LearningModules from './pages/LearningModules';
import Games from './pages/Games';
import EmotionalWellness from './pages/EmotionalWellness';
import CreativityZone from './pages/CreativityZone';
import SelfCareTutorials from './pages/SelfCareTutorials';
import ProgressTracking from './pages/ProgressTracking';
import ParentDashboard from './pages/ParentDashboard';
import VideoLectures from './pages/VideoLectures';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userType = localStorage.getItem('userType') || 'child';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/child-dashboard" 
          element={isAuthenticated && userType === 'child' ? <ChildDashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/learning-modules" 
          element={isAuthenticated && userType === 'child' ? <LearningModules /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/games" 
          element={isAuthenticated && userType === 'child' ? <Games /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/emotional-wellness" 
          element={isAuthenticated && userType === 'child' ? <EmotionalWellness /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/creativity-zone" 
          element={isAuthenticated && userType === 'child' ? <CreativityZone /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/self-care" 
          element={isAuthenticated && userType === 'child' ? <SelfCareTutorials /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/progress" 
          element={isAuthenticated && userType === 'child' ? <ProgressTracking /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/video-lectures" 
          element={isAuthenticated && userType === 'child' ? <VideoLectures /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/parent-dashboard" 
          element={isAuthenticated && userType === 'parent' ? <ParentDashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
