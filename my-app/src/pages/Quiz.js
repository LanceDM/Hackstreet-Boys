import React, { useState } from 'react';

const SAMPLE_QUESTIONS = {
  intro: [
    {
      id: 'q1',
      text: 'What is the correct file extension for C++ source files?',
      options: ['.c', '.cpp', '.java', '.py'],
      answer: 1,
    },
    {
      id: 'q2',
      text: 'Which statement is used to output text to the console in C++?',
      options: ['print()', 'console.log()', 'std::cout <<', 'System.out.println'],
      answer: 2,
    },
  ],
  vars: [
    {
      id: 'q1',
      text: 'Which type is used to represent decimal numbers in C++?',
      options: ['int', 'double', 'char', 'bool'],
      answer: 1,
    },
  ],
};

export default function Quiz({ quizConfig, onNavigate }) {
  const moduleId = quizConfig?.moduleId || 'intro';
  const title = quizConfig?.title || 'Sample Quiz';
  const questions = SAMPLE_QUESTIONS[moduleId] || SAMPLE_QUESTIONS.intro;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(null);

  const submitAnswer = () => {
    if (selected === null) return;
    const correct = questions[index].answer === selected;
    if (correct) {
      setScore((s) => (s === null ? 1 : s + 1));
    } else {
      setScore((s) => (s === null ? 0 : s));
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      // finished
      setIndex(index + 1);
    }
  };

  return (
    <section className="page page-quiz">
      <h2>{title}</h2>

      {index < questions.length ? (
        <div className="quiz-card">
          <p className="question">{questions[index].text}</p>

          <ul className="options">
            {questions[index].options.map((opt, i) => (
              <li key={i} className={`option ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)}>
                {opt}
              </li>
            ))}
          </ul>

          <div className="form-actions">
            <button className="btn" onClick={submitAnswer} disabled={selected === null}>Submit</button>
            <button className="btn btn-link" onClick={() => onNavigate('modules')}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <p>Quiz finished!</p>
          <p>Your score: {score}/{questions.length}</p>
          <div className="form-actions">
            <button className="btn" onClick={() => { setIndex(0); setSelected(null); setScore(null); }}>Retry</button>
            <button className="btn btn-outline" onClick={() => onNavigate('modules')}>Back to modules</button>
          </div>
        </div>
      )}
    </section>
  );
}
