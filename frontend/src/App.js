import React, { useState, useEffect } from 'react';
import { supabase } from './services/auth';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Achievement from './components/Achievement';
import './styles/App.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Auth pages based on Figma
  if (!session) {
    return <Register onSwitchToLogin={() => setCurrentPage('login')} />;
  }

  // Main app with bottom navigation (from Figma page 5)
  return (
    <div className="App">
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'achievements' && <Achievements />}
      {currentPage === 'profile' && <Profile />}
      
      {/* Bottom Navigation - Exact match from Figma page 5 */}
      <nav className="bottom-nav">
        <button 
          className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-btn ${currentPage === 'achievements' ? 'active' : ''}`}
          onClick={() => setCurrentPage('achievements')}
        >
          Achievements
        </button>
        <button 
          className={`nav-btn ${currentPage === 'profile' ? 'active' : ''}`}
          onClick={() => setCurrentPage('profile')}
        >
          Profile
        </button>
      </nav>
    </div>
  );
}

export default App;