import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGlobalContextProvider from '../../Context/ContextApi';
import QuizStartHeader from '../QuizStartPage/QuizStartHeader';
import QuizStartQuestions from '../QuizStartPage/QuizStartQuestions';
import { useNavigate } from 'react-router-dom';

// Styled components
const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 0 6rem; /* Adjust padding as needed */
  margin-top: 35px;
`;

const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const ErrorImage = styled.img`
  width: 180px;
  height: 180px;
`;

const ErrorMessage = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const RedirectMessage = styled.span`
  font-size: 1rem;
  font-weight: lighter;
  text-align: center;
`;

// Main component
function Page(props) {
  const { quizToStartObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const [parentTimer, setParentTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectQuizToStart === null) {
      navigate('/');
    }
  }, []);

  function onUpdateTime(currentTime) {
    setParentTimer(currentTime);
  }

  return (
    <Container>
      {selectQuizToStart === null ? (
        <ErrorContainer>
          <ErrorImage src="/errorIcon.png" alt="" />
          <ErrorMessage>Please Select your quiz first...</ErrorMessage>
          <RedirectMessage>You will be redirected to the home page</RedirectMessage>
        </ErrorContainer>
      ) : (
        <>
          <QuizStartHeader parentTimer={parentTimer} />
          <div className="mt-10 flex items-center justify-center">
            <QuizStartQuestions onUpdateTime={onUpdateTime} />
          </div>
        </>
      )}
    </Container>
  );
}

export default Page;
