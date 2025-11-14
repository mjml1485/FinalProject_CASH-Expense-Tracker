-- CASH Expense Tracker Database Schema
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(12, 2) NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  category TEXT,
  date DATE DEFAULT CURRENT_DATE
);
