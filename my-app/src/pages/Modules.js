import React from 'react';

const SAMPLE_MODULES = [
  { id: 'pointers', title: 'Pointers', description: 'Addresses, dereferencing, pointer arithmetic' },
  { id: 'recursion', title: 'Recursion', description: 'Recursive functions, base cases, examples' },
];

export default function Modules({ onNavigate, user }) {
  return (
    <section className="page page-modules">
      <h2>Modules</h2>

      <p className="muted">{user ? `Signed in as ${user.username}` : 'Sign in to track progress'}</p>

      <div className="module-list">
        {SAMPLE_MODULES.map((m) => (
          <article key={m.id} className="module-card">
            <h3>{m.title}</h3>
            <p>{m.description}</p>
            <div className="module-actions">
              <button className="btn btn-outline" onClick={() => onNavigate('quiz', { moduleId: m.id, title: m.title })}>Take quiz</button>
              <button className="btn" onClick={() => onNavigate('lesson', { moduleId: m.id })}>Open lesson</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
