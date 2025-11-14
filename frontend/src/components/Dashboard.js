import React, { useState, useEffect } from 'react';
import { supabase } from '../services/auth';
import { getTransactions, getBudgets } from '../services/api';
import '../styles/Dashboard.css';
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchUserData();
    fetchTransactions();
    fetchBudgets();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  return (
    <div className="dashboard">
      {/* Header - matches Figma description */}
      <header className="dashboard-header">
        <h1>CASH</h1>
        <div className="header-icons">
          <button className="icon-btn">🔔</button>
          <button className="icon-btn">👤</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-tab ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Plan
        </button>
        <button 
          className={`nav-tab ${activeTab === 'shared' ? 'active' : ''}`}
          onClick={() => setActiveTab('shared')}
        >
          Shared Plan
        </button>
        <button 
          className={`nav-tab ${activeTab === 'achievement' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievement')}
        >
          Achievement
        </button>
      </nav>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h2>Hello {user?.user_metadata?.full_name || 'User'}</h2>
        {budgets.length === 0 && (
          <button className="add-wallet-btn">+ Add Wallet</button>
        )}
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="stat-card">
          <h3>Balance</h3>
          <p className="amount">₱0.00</p>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <p className="amount">₱0.00</p>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="recent-transactions">
        <h3>Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p className="no-data">No transactions yet. Add your first transaction!</p>
        ) : (
          <div className="transactions-list">
            {transactions.slice(0, 5).map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <span className="description">{transaction.description}</span>
                  <span className="category">{transaction.category}</span>
                </div>
                <span className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}₱{transaction.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;