import React from 'react';
import { signOut } from '../services/auth';
import '../styles/Profile.css';

const Profile = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="profile">
      <header className="profile-header">
        <h1>CASH</h1>
      </header>

      <div className="profile-content">
        <div className="user-info">
          <div className="avatar">👤</div>
          <h2>User Name</h2>
          <p>user@gmail.com</p>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <h3>Total Transactions</h3>
            <p>0</p>
          </div>
          <div className="stat">
            <h3>Budgets Created</h3>
            <p>0</p>
          </div>
          <div className="stat">
            <h3>Achievements</h3>
            <p>0/12</p>
          </div>
        </div>

        <button onClick={handleSignOut} className="sign-out-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;