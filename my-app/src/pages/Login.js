import React, { useState } from 'react';
import LoginApi from '../Query/LoginQuery.js';
import UserSession from '../Query/UserSession.js';

export default function Login({ onLogin, onNavigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    
    try {
      const userData = await LoginApi(username, password);
      // Store only required fields in session
      const sessionUser = {
        id: userData.id ?? Date.now(),
        username: userData.username,
        role: userData.role ?? 'student',
        full_name: userData.full_name ?? null,
      };
      UserSession.setUser(sessionUser);
      onLogin(sessionUser);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password');
    }
  };

  return (
    <section className="page page-login">
      <h2>Sign in</h2>

      <form onSubmit={submit} className="form form-auth">
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn">Sign in</button>
          <button type="button" className="btn btn-link" onClick={() => onNavigate('register')}>Create account</button>
        </div>
      </form>
    </section>
  );
}
