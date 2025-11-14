import React, { useState } from 'react';
import { signUp } from '../services/auth';
import '../styles/Register.css';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const { data, error } = await signUp(formData.email, formData.password, fullName);
      
      if (error) throw error;
      setMessage('Account created successfully! Please check your email for verification.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>CASH</h1>
        <p className="subtitle">CLOUD ACCESS SYNCHRONIZED HUB</p>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label>Name</label>
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="A. Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="user@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {message && <div className="message">{message}</div>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating Account...' : 'Create account'}
        </button>

        <p className="switch-auth">
          Already Have An Account?{' '}
          <span onClick={onSwitchToLogin} className="auth-link">Log In</span>
        </p>
      </form>

      <div className="page-indicator">1/5</div>
    </div>
  );
};

export default Register;