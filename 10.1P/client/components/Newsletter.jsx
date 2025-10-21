import React, { useState } from 'react';
import axios from 'axios';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage({ text: 'Please enter your email', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await axios.post('/api/subscribe', { email });
      
      setMessage({ 
        text: response.data.message || 'Successfully subscribed!', 
        type: 'success' 
      });
      setEmail('');
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to subscribe. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay updated with the latest tutorials, articles, and community news</p>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                disabled={loading}
                required
              />
              <button 
                type="submit" 
                className="newsletter-btn"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.type === 'success' && <span className="icon">✓</span>}
              {message.type === 'error' && <span className="icon">✕</span>}
              {message.text}
            </div>
          )}

          <p className="newsletter-note">
            📧 We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
