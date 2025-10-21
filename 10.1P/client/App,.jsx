import React from 'react';
import Header from './components/Header';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to DEV@Deakin</h1>
            <p className="hero-subtitle">
              Join our community of developers, share knowledge, and grow together
            </p>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2>Why Join DEV@Deakin?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Learn</h3>
                <p>Access tutorials, articles, and resources from expert developers</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h3>Connect</h3>
                <p>Network with fellow developers and build meaningful relationships</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Grow</h3>
                <p>Enhance your skills and advance your development career</p>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />

        <section className="cta-section">
          <div className="container">
            <h2>Ready to Start Your Journey?</h2>
            <p>Subscribe to our newsletter and stay updated with the latest in development</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
