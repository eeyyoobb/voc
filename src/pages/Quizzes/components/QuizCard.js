import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useGlobalContextProvider from '../Context/ContextApi';
import convertToFaIcons from '../common/convertToFaIcons';
import { darkTheme, lightTheme } from '../../../utils/Theme'; 


const StyledQuizCard = styled.div`
  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function successRate(singleQuiz) {
  let correctQuestions = 0;
  let totalAttempts = 0;

  singleQuiz.quizQuestions.forEach(question => {
    totalAttempts += question.statistics.totalAttempts;
    correctQuestions += question.statistics.correctAttempts;
  });

  const successRate = Math.ceil((correctQuestions / totalAttempts) * 100);
  return successRate;
}

function QuizCard({ singleQuiz }) {
  const {
    quizToStartObject,
    dropDownToggleObject,
    threeDotsPositionsObject,
    selectedQuizObject,
  } = useGlobalContextProvider();
  const { setDropDownToggle } = dropDownToggleObject;
  const { setSelectQuizToStart } = quizToStartObject;
  const { setThreeDotsPositions } = threeDotsPositionsObject;
  const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;

  const { quizTitle, quizQuestions, icon } = singleQuiz;
  const totalQuestions = quizQuestions.length;
  const globalSuccessRate = successRate(singleQuiz);

  function openDropDownMenu(event) {
    const xPos = event.clientX;
    const yPos = event.clientY;

    setThreeDotsPositions({ x: xPos, y: yPos });

    if (event) {
      event.stopPropagation();
    }

    setDropDownToggle(true);
    setSelectedQuiz(singleQuiz);
  }

  return (
    <StyledQuizCard>
      <div className="relative bg-green-700 w-full h-32 flex justify-center items-center rounded-md">
        <div className="absolute cursor-pointer top-3 right-3">
          <FontAwesomeIcon
            className="text-white"
            height={13}
            width={13}
            icon={faEllipsis}
            onClick={openDropDownMenu}
          />
        </div>

        <FontAwesomeIcon
          className="text-white text-3xl"
          width={120}
          height={120}
          icon={convertToFaIcons(icon)}
        />
      </div>
      <h3 className="font-bold">{quizTitle}</h3>
      <p className="text-sm font-light">{totalQuestions} question(s)</p>
      <div className="flex gap-3">
        <div className="flex gap-1 items-center">
          <img src="/target-777.png" width={20} height={10} alt="" />
          <span className="text-[12px]">Success rate: {globalSuccessRate}%</span>
        </div>
        <Link
          to="/quiz/quiz-start"
          onClick={() => setSelectQuizToStart(singleQuiz)}
        >
          <div className="rounded-full w-7 h-7 bg-green-700 flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon
              className="text-white"
              width={15}
              height={15}
              icon={faPlay}
            />
          </div>
        </Link>
      </div>
    </StyledQuizCard>
  );
}

export default QuizCard;
