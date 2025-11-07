import axios from 'axios';
import API_BASE_URL from '../config/api';

export default function PostUser(username, firstname, lastname, password) {
  const payload = {
    username: username,
    password_hash: password,
    full_name: `${firstname} ${lastname}`,
    role: 'student',
  };

  return axios.post(`${API_BASE_URL}/users/`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('Response:', response.data);
    return response.data;
  })
  .catch(error => {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  });
}
