import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🌟</span>
            <span className="logo-text">InspireNest</span>
          </div>
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="highlight">InspireNest</span>
            </h1>
            <p className="hero-subtitle">
              A safe, fun, and engaging learning platform designed especially for children
            </p>
            <div className="hero-buttons">
              <Link to="/register">
                <Button size="large">Start Your Journey</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="large">Sign In</Button>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-emoji">🎨</div>
            <div className="floating-emoji">🎮</div>
            <div className="floating-emoji">📚</div>
            <div className="floating-emoji">🌈</div>
          </div>
        </section>

        <section className="features">
          <h2 className="section-title">What Makes InspireNest Special</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧩</div>
              <h3>Learning Modules</h3>
              <p>Interactive quizzes and challenges designed to enhance IQ and EQ</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Focus Games</h3>
              <p>Fun activities that improve concentration and attention span</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Speech Practice</h3>
              <p>Engaging exercises to develop communication skills</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤲</div>
              <h3>Motor Skills</h3>
              <p>Activities designed to enhance physical coordination</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">😊</div>
              <h3>Emotional Wellness</h3>
              <p>Mood tracking and emotional development tools</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Progress Tracking</h3>
              <p>Earn badges and track your growth journey</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
  <p>
    &copy; 2026 InspireNest. Made with ❤️ for children everywhere.
  </p>

  <div className="footer-social">
    <span>Developed by <strong>Gayatri Patil</strong></span>

    <a
      href="https://www.linkedin.com/in/your-linkedin-username"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
        alt="LinkedIn"
      />
    </a>

    <a
      href="https://github.com/your-github-username"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
        alt="GitHub"
      />
    </a>
  </div>
</footer>

    </div>
  );
};

export default LandingPage;



