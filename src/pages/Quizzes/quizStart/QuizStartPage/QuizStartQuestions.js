import React, { useState, useEffect, useCallback } from 'react';
import useGlobalContextProvider from '../../Context/ContextApi';
import toast, { Toaster } from 'react-hot-toast';
import ScoreComponent from './score';
import { saveDataIntoDB, addExperience } from '../../../../hooks/fetchQuizze';
import TimeProgressBar from '../../../../common/TimeProgressBar';


function QuizStartQuestions({ onUpdateTime }) {
  const { quizToStartObject, allQuizzes, setAllQuizzes, userObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const { quizQuestions } = selectQuizToStart;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const { user, setUser } = userObject;
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0); // Key to trigger progress bar reset
  const [showAnswer, setShowAnswer] = useState(false); // State to show the answer
  const [timeUp, setTimeUp] = useState(false); 
  
  useEffect(() => {
    const quizIndexFound = allQuizzes.findIndex(
      (quiz) => quiz._id === selectQuizToStart._id,
    );
    setIndexOfQuizSelected(quizIndexFound);
  }, [allQuizzes, selectQuizToStart._id]);
 
  useEffect(() => {
    if (isQuizEnded) {
      quizQuestions.forEach((quizQuestion) => {
        quizQuestion.answeredResult = -1;
      });
      fetchData(); // Call the fetchData function here
    }
  }, [isQuizEnded]);

  function selectChoiceFunction(choiceIndexClicked) {
    setSelectedChoice(choiceIndexClicked);
    setShowAnswer(true); // Show the answer after a choice is selected

    const currentAllQuizzes = [...allQuizzes];
    currentAllQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].answeredResult = choiceIndexClicked;

    setAllQuizzes(currentAllQuizzes);
    setPaused(true); // Pause the timer when a choice is selected
  }

  function moveToTheNextQuestion(skipValidation = true) {
    if (!skipValidation && selectedChoice === null && timeUp) {
      // If the user didn't select an answer and the time is up,
      // show the answer card and return without moving to the next question
      setShowAnswer(true);
      return;
    }

    allQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].statistics.totalAttempts += 1;

    if (
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult !==
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .correctAnswer
    ) {
      allQuizzes[indexOfQuizSelected].quizQuestions[
        currentQuestionIndex
      ].statistics.incorrectAttempts += 1;
      //toast.error('Incorrect Answer!');

      if (currentQuestionIndex !== quizQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((current) => current + 1);
          setSelectedChoice(null);
          setPaused(false); // Unpause the timer for the next question
          setResetKey((prevKey) => prevKey + 1); // Reset the progress bar
          setShowAnswer(false); // Hide the answer for the next question
        }, 1200);
      } else {
        setIsQuizEnded(true);
      }

      return;
    }

    allQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].statistics.correctAttempts += 1;
    setScore((prevState) => prevState + 1);

    //toast.success('Awesome!');
    addExperience(user, setUser); // Pass user and setUser to addExperience function

    if (
      currentQuestionIndex === quizQuestions.length - 1 &&
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult ===
        allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
          .correctAnswer
    ) {
      setIsQuizEnded(true);
      return;
    }

    setTimeout(() => {
      setCurrentQuestionIndex((current) => current + 1);
      setSelectedChoice(null);
      setPaused(false); // Unpause the timer for the next question
      setResetKey((prevKey) => prevKey + 1); // Reset the progress bar
      setShowAnswer(false); // Hide the answer for the next question
    }, 200);
  }

  const fetchData = useCallback(async () => {
    try {
      
      await saveDataIntoDB(selectQuizToStart._id, allQuizzes, indexOfQuizSelected);
    } catch (error) {
      toast.error('Something went wrong while saving...');
    }
  }, [allQuizzes, indexOfQuizSelected, selectQuizToStart._id]);

  return (
    <div className="relative poppins rounded-sm m-9 w-9/12">
      <Toaster
        toastOptions={{
          className: '',
          duration: 1500,
          style: {
            padding: '12px',
          },
        }}
      />
      <div className="flex items-center gap-2">
        <div className="bg-green-700 flex justify-center items-center rounded-md w-11 h-11 text-white p-3">
          {currentQuestionIndex + 1}
        </div>
        <p>{quizQuestions[currentQuestionIndex].mainQuestion}</p>
      </div>
      <TimeProgressBar
  key={currentQuestionIndex}
  duration={10}
  onTimeUp={() => moveToTheNextQuestion(true)} // Skip validation when time is up
  paused={paused}
  resetKey={resetKey} // Pass resetKey to trigger progress bar reset
/>
<div className={`flip-card ${showAnswer ? 'flipped' : ''}`}>
  <div className="flip-card-inner">
    <div className="flip-card-front">
      <div className="mt-7 flex flex-col gap-2">
        {quizQuestions[currentQuestionIndex].choices.map((choice, indexChoice) => (
          <div
            key={indexChoice}
            onClick={() => selectChoiceFunction(indexChoice)}
            className={`p-3 ml-11 w-10/12 border border-green-700 rounded-md hover:bg-green-700 hover:text-white transition-all select-none ${
              selectedChoice === indexChoice ? 'bg-green-700 text-white' : 'bg-white'
            }`}
          >
            {choice}
          </div>
        ))}
      </div>
    </div>
    <div className="flip-card-back">
    <p className={`ans ${selectedChoice === null && timeUp ? 'fast' : (selectedChoice === quizQuestions[currentQuestionIndex].correctAnswer ? 'correct' : 'wrong')}`}>
  {selectedChoice === null && timeUp ? 'BE FAST' : (selectedChoice === quizQuestions[currentQuestionIndex].correctAnswer ? 'CORRECT' : 'WRONG')}
</p>


      <div className="container-card">
        <p className='at'>Correct Answer:</p>
        <p className='af'>{quizQuestions[currentQuestionIndex].choices[quizQuestions[currentQuestionIndex].correctAnswer]}</p>
        <p className='at'>Explanation:</p>
        <p className='af'>{quizQuestions[currentQuestionIndex].explanation}</p>
      </div>
      <div className="flex justify-end mt-7">
        <button
          onClick={() => moveToTheNextQuestion(false)} // Do not skip validation on button click
          disabled={isQuizEnded}
          className={`p-2 px-5 text-[15px] text-white rounded-md bg-green-700 mr-[70px] ${
            isQuizEnded ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  </div>
</div>
{isQuizEnded && (
  <ScoreComponent
    quizStartParentProps={{
      setIsQuizEnded,
      setIndexOfQuizSelected,
      setCurrentQuestionIndex,
      setSelectedChoice,
      score,
      setScore,
    }}
    setShowAnswer={setShowAnswer}
  />
)}

        </div>
      );
    }
    
    export default QuizStartQuestions;

    
    