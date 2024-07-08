// actions/questionActions.js
import { startExamAction } from '../reducers/question_reducer';

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/quiz/questions');
      const { questions, answers ,explain} = await response.json();
      dispatch(startExamAction({ question: questions, answers: answers,explain: explain}));
    } catch (error) {
      console.error(error);
    }
  };
};
