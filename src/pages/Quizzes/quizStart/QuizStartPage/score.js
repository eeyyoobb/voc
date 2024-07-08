// ScoreComponent.js

import React from 'react';
import useGlobalContextProvider  from '../../Context/ContextApi';
import { useNavigate } from 'react-router-dom';

function ScoreComponent({ quizStartParentProps,setShowAnswer }) {
  const { quizToStartObject, allQuizzes } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const numberOfQuestions = selectQuizToStart.quizQuestions.length;
  const navigate = useNavigate();
  const { setIsQuizEnded, setIndexOfQuizSelected, setCurrentQuestionIndex, setSelectedChoice, setScore, score } = quizStartParentProps;

  function emojiIconScore() {
    const emojiFaces = ['confused-emoji.png', 'happy-emoji.png', 'very-happy-emoji.png'];
    const result = (score / selectQuizToStart.quizQuestions.length) * 100;

    if (result < 25) {
      return emojiFaces[0];
    }
    if (result === 50) {
      return emojiFaces[1];
    }
    return emojiFaces[2];
  }

  function tryAgainFunction() {
    setIsQuizEnded(false);
    const newQuizIndex = allQuizzes.findIndex((quiz) => quiz._id === selectQuizToStart._id);
    setIndexOfQuizSelected(newQuizIndex);
    setCurrentQuestionIndex(0);
    setSelectedChoice(null);
    setScore(0);
    setShowAnswer(false);
  }

  return (
    <div className="flex items-center justify-center rounded-md top-[-100px] border border-gray-200 absolute w-full h-[450px] bg-white">
      <div className="flex gap-4 items-center justify-center flex-col">
        <img src={`/${emojiIconScore()}`} alt="" width={100} height={100} />
        <div className="flex gap-1 flex-col">
          <span className="font-bold text-2xl">Your Score</span>
          <div className="text-[22px] text-center">
            {score}/{numberOfQuestions}
          </div>
        </div>
        <button onClick={tryAgainFunction} className="p-2 bg-green-700 rounded-md text-white px-6">
          Try Again
        </button>
        <div className="w-full flex gap-2 flex-col mt-3">
          <div className="flex gap-1 items-center justify-center">
            <img src="/correct-answer.png" alt="" width={20} height={20} />
            <span className="text-[14px]">Correct Answers: {score}</span>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <img src="/incorrect-answer.png" alt="" width={20} height={20} />
            <span className="text-[14px]">Incorrect Answers: {numberOfQuestions - score}</span>
          </div>
        </div>
        <span onClick={() => navigate('/quiz')} className="text-green-700 select-none cursor-pointer text-sm mt-8">
          Select Another Quiz
        </span>
      </div>
    </div>
  );
}

export default ScoreComponent;
