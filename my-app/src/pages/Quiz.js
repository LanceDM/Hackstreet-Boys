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
  pointers: [
    {
      id: 'p1',
      text: 'What does the * operator do when applied to a pointer variable in C++?',
      options: ['Declare a pointer', 'Dereference the pointer (access pointed value)', 'Multiply two values', 'Address-of operator'],
      answer: 1,
      hint: 'Think about how you access the value a pointer points to.',
      explanation: 'The * operator dereferences a pointer, giving access to the value stored at the address. The & operator is the address-of operator.'
    },
    {
      id: 'p2',
      text: 'How do you obtain the address of a variable x?',
      options: ['*x', '&x', 'x&', 'addr(x)'],
      answer: 1,
      hint: 'It is the opposite of dereferencing.',
      explanation: 'Using &x returns the memory address of variable x. This can be assigned to a pointer of a matching type.'
    },
  ],
  recursion: [
    {
      id: 'r1',
      text: 'Which property is essential for a recursive function to terminate?',
      options: ['Global variables', 'Base case', 'Static variables', 'Operator overloading'],
      answer: 1,
      hint: 'Without this, recursion would continue indefinitely.',
      explanation: 'A base case stops further recursive calls. Each recursive step should move toward the base case.'
    },
    {
      id: 'r2',
      text: 'What is the output of a recursive factorial function factorial(3) assuming factorial(0) = 1?',
      options: ['6', '3', '9', 'Undefined'],
      answer: 0,
      hint: '3! = 3*2*1',
      explanation: 'factorial(3) = 3 * 2 * 1 = 6. A typical recursive implementation multiplies n by factorial(n-1) until 0.'
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
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const submitAnswer = () => {
    if (selected === null) return;
    const correct = questions[index].answer === selected;
    if (correct) {
      setScore((s) => (s === null ? 1 : s + 1));
    } else {
      setScore((s) => (s === null ? 0 : s));
    }
    // Reveal explanation for this question; user will click Next to continue
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const next = index + 1;
    setSelected(null);
    setShowHint(false);
    setShowExplanation(false);
    setIndex(next);
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
            {!showExplanation ? (
              <>
                <button className="btn" onClick={submitAnswer} disabled={selected === null}>Submit</button>
                <button className="btn btn-ghost" onClick={() => setShowHint((s) => !s)}>Hint</button>
                <button className="btn btn-link" onClick={() => onNavigate('modules')}>Cancel</button>
              </>
            ) : (
              <>
                <div className="muted">{questions[index].explanation || 'No explanation provided.'}</div>
                <div className="form-actions">
                  <button className="btn" onClick={nextQuestion}>Next</button>
                </div>
              </>
            )}
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
      {/* Show hint if requested */}
      {showHint && index < questions.length && (
        <div className="page page-quiz">
          <strong>Hint:</strong>
          <p className="muted">{questions[index].hint || 'No hint available.'} <a href="https://www.w3schools.com/cpp/" target="_blank" rel="noreferrer">W3Schools C++</a></p>
        </div>
      )}
    </section>
  );
}
