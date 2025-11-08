import React from 'react';

export default function Quiz({ onNavigate, quizConfig }) {
  return (
<section className="page">
  <h2 style={{ marginBottom: '30px' }}>Take Quiz</h2>
  <p>Your quiz is ready to begin!</p>

  <div style={{ display: 'flex', gap: '10px' }}>
    <button
      className="btn"
      onClick={() => onNavigate('quiz-builder', { quizConfig })}
    >
      Take Quiz
    </button>

    <button
      className="btn"
      style={{ marginLeft: 'auto' }}
      onClick={() => onNavigate('home')}
    >
      Go Home
    </button>
  </div>
</section>

  );
}
