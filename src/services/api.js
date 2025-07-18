import axios from 'axios';

const API = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1',
  },
});

export const login = async (email, password) => {
  try {
    const response = await API.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('API Login Error:', error.response?.data || error.message);
    throw error.response?.data?.error || 'Login failed: Invalid credentials or network error';
  }
};

export const fetchUsers = async (page) => {
  try {
    const response = await API.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('API Fetch Users Error:', error.response?.data || error.message);
    throw error.response?.data?.error || 'Failed to fetch users';
  }
};