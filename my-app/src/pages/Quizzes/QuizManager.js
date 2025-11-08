// src/quizzes/QuizManager.js
import getQuiz from "../../Query/GetQuizes";

// Define which quizzes exist
const quizDefinitions = [
  { difficulty: "A", number: 1 },
  { difficulty: "A", number: 2 },
  { difficulty: "A", number: 3 },
  { difficulty: "B", number: 1 },
  { difficulty: "B", number: 2 },
  { difficulty: "B", number: 3 },
  { difficulty: "C", number: 1 },
  { difficulty: "C", number: 2 },
  { difficulty: "C", number: 3 },
];

// Central in-memory storage
const quizMap = new Map();

/**
 * Loads all quizzes from backend into the quizMap.
 * If a quiz already exists, preserves its editedCode.
 */
export async function loadAllQuizzes() {
  const promises = quizDefinitions.map(async ({ difficulty, number }) => {
    const key = `${difficulty}${number}`;
    try {
      const quizData = await getQuiz(difficulty, number);

      const existing = quizMap.get(key);
      quizMap.set(key, {
        id: key,
        difficulty,
        number,
        title: quizData.problem_title || `Quiz ${key}`,
        problemStatement: quizData.problem_description || "",
        initialCode: quizData.initial_code || "",
        editedCode: existing?.editedCode || "", // preserve edits
      });

      console.log(`✅ Loaded quiz ${key} (${difficulty} - ${number})`);

    } catch (err) {
      console.error(`❌ Failed to load quiz ${key}:`, err);
    }
  });

  await Promise.all(promises);

  console.log("✅ All quizzes loaded:");
  console.table(
    Array.from(quizMap.values()).map(q => ({
      id: q.id,
      difficulty: q.difficulty,
      number: q.number,
      title: q.title,
    }))
  );

  return quizMap;
}

/**
 * Returns the list of all quizzes as an array.
 */
export function getAllQuizzes() {
  return Array.from(quizMap.values());
}

/**
 * Returns a single quiz object.
 */
export function getQuizById(id) {
  return quizMap.get(id);
}

/**
 * Updates a quiz’s edited code.
 */
export function setEditedCode(id, code) {
  const quiz = quizMap.get(id);
  if (!quiz) return;
  quizMap.set(id, { ...quiz, editedCode: code });
}
