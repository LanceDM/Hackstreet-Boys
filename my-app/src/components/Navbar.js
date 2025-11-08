import React from 'react';
import './Navbar.css';

export default function Navbar({ onNavigate, user, onLogout, currentPage }) {
  const isQuizPage = currentPage === 'quiz' || currentPage === 'quiz-builder';

  return (
    <div className="nav-strip-container" tabIndex={0} aria-label="Main navigation">
      <header className="nav">
        <div className="nav-left">
          <button
            className="brand"
            onClick={!isQuizPage ? () => onNavigate('home') : undefined}
            disabled={isQuizPage}
            style={{
              opacity: isQuizPage ? 0.6 : 1,
              cursor: isQuizPage ? 'not-allowed' : 'pointer',
            }}
          >
            C++ ITS
          </button>
        </div>

        <nav className="nav-right">
          {isQuizPage ? (
            // QUIZ MODE — only show a red Quit button
            <button
              className="btn"
              style={{
                backgroundColor: 'red',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '6px',
                padding: '8px 16px',
              }}
              onClick={() => onNavigate('home')}
            >
              Quit
            </button>
          ) : user ? (
            // NORMAL NAV (logged in)
            <>
              <button className="nav-link" onClick={() => onNavigate('modules')}>Modules</button>
              <button className="nav-link" onClick={() => onNavigate('quiz', { moduleId: 'intro', title: 'Quick Quiz' })}>Quiz</button>
              <button className="nav-link" onClick={() => onNavigate('profile')}>Profile</button>
              <span className="nav-user">{user.username}</span>
              <button className="btn btn-ghost" onClick={onLogout}>Sign out</button>
            </>
          ) : (
            // GUEST NAV
            <>
              <button className="nav-link" onClick={() => onNavigate('login')}>Sign in</button>
              <button className="nav-link" onClick={() => onNavigate('register')}>Register</button>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}
