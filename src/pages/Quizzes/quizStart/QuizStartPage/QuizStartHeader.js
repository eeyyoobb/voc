import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import useGlobalContextProvider from '../../Context/ContextApi';

// Styled component for the quiz header
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
  border-bottom: 1px solid ${props => props.theme.border};
`;

const QuizNameContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const IconContainer = styled.div`
  background-color: ${props => props.theme.soft};
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

function QuizStartHeader({ parentTimer }) {
  const { quizToStartObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
 
  const { quizTitle } = selectQuizToStart;
  const { quizQuestions } = selectQuizToStart;

  return (
    <HeaderContainer>
      {/* Quiz name and icon */}
      <QuizNameContainer>
        <IconContainer>
          <FontAwesomeIcon
            className="text-white"
            width={25}
            height={25}
            icon={faCode}
          />
        </IconContainer>
        <div>
          <h2 className="font-bold text-xl">{quizTitle}</h2>
          <span className="font-light text-sm">
            {quizQuestions.length} Questions
          </span>
        </div>
      </QuizNameContainer>
    </HeaderContainer>
  );
}

export default QuizStartHeader;
