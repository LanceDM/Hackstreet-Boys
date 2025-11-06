import React from 'react';
import UserSession from '../Query/UserSession';

export default function Profile({ onNavigate }) {
  const user = UserSession.getUser();

  if (!user) {
    return (
      <section className="page page-profile">
        <h2>Profile</h2>
        <p>No user is currently logged in.</p>
        <button className="btn" onClick={() => onNavigate('login')}>Go to Login</button>
      </section>
    );
  }

  return (
    <section className="page page-profile">
      <h2>Profile</h2>
      <div className="profile-card">
        <div><strong>Username:</strong> {user.username}</div>
        <div><strong>Full name:</strong> {user.full_name || '—'}</div>
        <div><strong>Role:</strong> {user.role || '—'}</div>
        <div><strong>ID:</strong> {user.id}</div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="btn" onClick={() => onNavigate('modules')}>Back to Modules</button>
      </div>
    </section>
  );
}


