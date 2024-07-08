import React, { useState } from 'react';
import useGlobalContextProvider from '../../Context/ContextApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createQuiz, saveQuiz } from '../../../../hooks/fetchQuizze';

function QuizBuildNav({ newQuiz, setNewQuiz }) {
  const { allQuizzes, setAllQuizzes } = useGlobalContextProvider();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="poppins my-12 flex justify-between items-center ">
      <div className="flex gap-2 items-center">
        <img src="/quiz-builder-icon.png" alt="" height={50} width={50} />
        <span className="text-2xl">
          Quiz <span className="text-green-700 font-bold">Builder</span>
        </span>
      </div>
      <button
        onClick={() => {
          saveQuiz(newQuiz, allQuizzes, setAllQuizzes, navigate, setIsLoading);
        }}
        className="p-2 px-4 bg-green-700 rounded-md text-white"
      >
        {isLoading ? 'Loading...' : 'Save'}
      </button>
    </div>
  );
}

export default QuizBuildNav;
