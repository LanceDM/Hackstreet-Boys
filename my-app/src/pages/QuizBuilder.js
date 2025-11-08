import React, { useState, useEffect } from "react";
import TableofContents from "../components/TableofContents";
import CodeEditor from "../components/CodeEditor";
import {
  loadAllQuizzes,
  getAllQuizzes,
  setEditedCode,
} from "./Quizzes/QuizManager.js";

import "./QuizBuilder.css";
import "../App.css";

export default function QuizBuilder({ onNavigate, user }) {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizzes, setQuizzes] = useState([]);

  // Fisher–Yates shuffle
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Load and randomize quizzes
  useEffect(() => {
    async function init() {
      await loadAllQuizzes();
      const loadedQuizzes = getAllQuizzes();
      const randomized = shuffleArray(loadedQuizzes);
      setQuizzes(randomized);
      // console.log("✅ Quizzes loaded and randomized:", randomized.map(q => q.title || q.id));
    }
    init();
  }, []);

  // Log when the current quiz changes
  useEffect(() => {
    if (quizzes.length > 0) {
      const current = quizzes[currentQuizIndex];
      // console.log(`📘 Now viewing quiz: [${currentQuizIndex + 1}/${quizzes.length}] ${current.title || current.id}`);
    }
  }, [currentQuizIndex, quizzes]);

  const quiz = quizzes[currentQuizIndex];
  if (!quiz) return <p>Loading quizzes...</p>;

  const displayedCode = quiz.editedCode || quiz.initialCode;

  const handleRunCode = async ({ code, input }) => {
    try {
      const response = await fetch("/api/compile/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, input }),
      });
      if (!response.ok) throw new Error("Failed to run code");
      return await response.json();
    } catch (error) {
      console.error("Run error:", error);
      return { output: `Error: ${error.message}` };
    }
  };

  const handleSelectQuiz = (index) => {
    setCurrentQuizIndex(index);
    document.querySelector(".quiz-builder")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCodeChange = (newCode) => {
    const quizId = quiz.id;
    setEditedCode(quizId, newCode);
    setQuizzes(getAllQuizzes());
  };

  const tocItems = quizzes.map((q) => ({
    label: q.title || q.id,
    id: q.id,
  }));

  return (
    <>
      <TableofContents
        disableTransform
        isOpen={true}
        onToggle={() => setIsTocOpen((prev) => !prev)}
        items={tocItems.map((item) => item.label)}
        onSelect={(label) => {
          const index = tocItems.findIndex((i) => i.label === label);
          if (index !== -1) handleSelectQuiz(index);
        }}
      />

      <div className="quiz-builder">
        <main className="main-content">
          <div className="content-area">
            <section className="problem-section">
              <header className="top-bar">
                <h2 className="Quiz-title">{quiz.title}</h2>
              </header>
              <h3>Problem Statement</h3>
              <p className="problem-text">{quiz.problemStatement}</p>
            </section>

            <section className="code-editor-wrapper">
              <div className="code-container">
                <CodeEditor
                  initialCode={displayedCode}
                  onChange={handleCodeChange}
                  onSubmit={handleRunCode}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
