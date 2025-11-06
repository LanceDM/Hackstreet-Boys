import React, { useState } from 'react';
import PostUser from '../Query/post.js';
import UserSession from '../Query/UserSession.js';

export default function Register({ onRegister, onNavigate }) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password || !firstName || !lastName) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await PostUser(username, firstName, lastName, password);
      // Store user in session
      const sessionUser = {
        id: response.id || Date.now(),
        username: response.username || username,
        full_name: response.full_name || `${firstName} ${lastName}`,
        role: response.role || 'student'
      };
      UserSession.setUser(sessionUser);
      onRegister(sessionUser);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <section className="page page-register">
      <h2>Create Account</h2>

      <form onSubmit={submit} className="form form-auth">
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          First Name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Last Name
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn">Create account</button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => onNavigate('login')}
          >
            Sign in instead
          </button>
        </div>
      </form>
    </section>
  );
}
