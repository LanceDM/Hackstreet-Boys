import React from 'react';

export default function Navbar({ onNavigate, user, onLogout }) {
  return (
    <header className="nav">
      <div className="nav-left">
        <button className="brand" onClick={() => onNavigate('home')}>C++ ITS</button>
      </div>

      <nav className="nav-right">
        <button className="nav-link" onClick={() => onNavigate('modules')}>Modules</button>
        <button className="nav-link" onClick={() => onNavigate('quiz', { moduleId: 'intro', title: 'Quick Quiz' })}>Quiz</button>

        {user ? (
          <>
            <span className="nav-user">{user.username}</span>
            <button className="btn btn-ghost" onClick={onLogout}>Sign out</button>
          </>
        ) : (
          <>
            <button className="nav-link" onClick={() => onNavigate('login')}>Sign in</button>
            <button className="nav-link" onClick={() => onNavigate('register')}>Register</button>
          </>
        )}
      </nav>
    </header>
  );
}
