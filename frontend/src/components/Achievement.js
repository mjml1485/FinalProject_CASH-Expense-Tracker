import React from 'react';
import '../styles/Achievement.css';

const Achievements = () => {
  const achievements = [
    'Budget Master', 'Savings Guru', 'Consistency King', 
    'Early Saver', 'Goal Crusher', 'Discipline Pro',
    'Investment Starter', 'Debt Free', 'Emergency Fund',
    'Retirement Ready', 'Smart Spender', 'Financial Freedom'
  ];

  return (
    <div className="achievements">
      <header className="achievements-header">
        <h1>CASH</h1>
      </header>

      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-card">
            <div className="achievement-icon">🏆</div>
            <h3 className="achievement-name">{achievement}</h3>
            <p className="achievement-desc">Complete your financial goals</p>
            <div className="progress-bar">
              <div className="progress" style={{width: '0%'}}></div>
            </div>
            <span className="progress-text">0%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;