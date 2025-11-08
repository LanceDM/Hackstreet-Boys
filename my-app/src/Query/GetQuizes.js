import axios from "axios";
import API_BASE_URL from '../config/api';

export default function getQuiz(difficulty, number) {
  return axios.get(`${API_BASE_URL}/quizzes/`, {
    params: { quiz_difficulty: difficulty, quiz_number: number }
  })
  .then(response => response.data)
  .catch(error => {
    console.error('GetQuiz Error:', error.response?.data || error.message);
    throw error;
  });
}
