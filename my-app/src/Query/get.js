import axios from 'axios';
import UserSession from './UserSession';
import API_BASE_URL from '../config/api';

// Login: POST /login/
export default function Login(username, password) {
  const payload = {
    username: username,
    password_hash: password,
  };

  return axios.post(`${API_BASE_URL}/login/`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('Login Response:', response.data);
    return response.data;
  })
  .catch(error => {
    console.error('Login Error:', error.response?.data || error.message);
    throw error;
  });
}

// Get user by username: GET /users/<username>/
export function GetUser(username = null) {
  const target = username || UserSession.getUsername();
  if (!target) {
    return Promise.reject(new Error('No username provided and no session user available'));
  }
  return axios.get(`${API_BASE_URL}/users/${encodeURIComponent(target)}/`)
    .then(response => response.data)
    .catch(error => {
      console.error('GetUser Error:', error.response?.data || error.message);
      throw error;
    });
}
