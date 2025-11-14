import React, { useState } from 'react';
import { signIn } from '../services/auth';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await signIn(formData.email, formData.password);
      if (error) throw error;
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>CASH</h1>
        <p className="subtitle">CLOUD ACCESS SYNCHRONIZED HUB</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="user@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <a href="#forgot" className="forgot-password">Forgot?</a>
        </div>

        {message && <div className="message">{message}</div>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Signing In...' : 'Login'}
        </button>
      </form>

      <div className="page-indicator">2/5</div>
    </div>
  );
};

export default Login;