import React from 'react';

export default function Home({ onNavigate, user }) {
  return (
    <section className="page page-home">
      <h1>Welcome to C++ ITS</h1>
      <p>
        This interactive tutoring system helps students learn C++ through
        short modules and quizzes. Get started by creating an account or
        exploring the available modules.
      </p>

      <div className="home-actions">
        {!user && (
          <>
            <button onClick={() => onNavigate('register')} className="btn">Create account</button>
            <button onClick={() => onNavigate('login')} className="btn btn-outline">Sign in</button>
          </>
        )}

        {user && (
          <>
            <button onClick={() => onNavigate('modules')} className="btn">Browse Modules</button>
            <button className="btn" onClick={() => onNavigate('quiz', { moduleId: 'intro', title: 'Quick Quiz' })}>Go to Quiz</button>
            <p
              className="muted"
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                marginLeft: 'auto'  // This pushes it to the right
              }}
            >
              Signed in as <strong>{user.username}</strong>
          </p>
          </>
        )}
      </div>
    </section>
  );
}
