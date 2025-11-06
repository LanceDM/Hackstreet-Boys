import axios from 'axios';

export default function PostUser(username, firstname, lastname, password) {
  const payload = {
    username: username,
    password_hash: password,
    full_name: `${firstname} ${lastname}`,
    role: 'student',
  };

  return axios.post("http://localhost:8000/users/", payload, {
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
