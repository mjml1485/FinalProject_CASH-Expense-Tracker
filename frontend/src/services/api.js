import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('supabase.auth.token');
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token).access_token}`;
  }
  return config;
});

export const getTransactions = async () => {
  const response = await api.get('/transactions');
  return response.data;
};

export const addTransaction = async (transaction) => {
  const response = await api.post('/transactions', transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

export const getBudgets = async () => {
  const response = await api.get('/budgets');
  return response.data;
};