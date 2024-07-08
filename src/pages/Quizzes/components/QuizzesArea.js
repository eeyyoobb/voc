import React from 'react';
import QuizCard from './QuizCard';
import PlaceHolder from './PlaceHolder';
import useGlobalContextProvider from '../Context/ContextApi';
import DropDown from '../quizStart/QuizStartPage/DropDown';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/reducers/auth'; // Import the login action
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../../utils/Theme'; // Adjust the path based on your project structure

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  margin-top:0;
  padding: 0 1rem;
  max-width: auto;
  background-color: ${props => props.theme.body}; // Ensure theme is applied here
  color: ${props => props.theme.text};
`;

const QuizSection = styled.div`
  margin-top:0;
`;

const Button = styled.button`
  background-color: ${props => props.theme.button};
  color: ${props => props.theme.text};
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

function QuizzesArea({ darkMode }) {
  const { allQuizzes, isLoadingObject } = useGlobalContextProvider();
  const navigate = useNavigate();
  const { isLoading } = isLoadingObject;
  const userInfo = useSelector(state => state.user.userInfo);
  const userName = userInfo ? userInfo.name : '';
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login()); // Dispatch the login action when the button is clicked
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        {isLoading ? (
          <div></div>
        ) : (
          <>
            {userName ? (
              <>
                {allQuizzes.length === 0 ? (
                  <PlaceHolder />
                ) : (
                  <QuizSection>
                    <DropDown />
                    <h2 className="text-xl font-bold">My Quizzes</h2>
                    <div className="mt-6 flex gap-2 flex-wrap">
                      {allQuizzes.map((singleQuiz, quizIndex) => (
                        <QuizCard key={quizIndex} singleQuiz={singleQuiz} />
                      ))}
                      <div
                        onClick={() => navigate('/add-quiz')}
                        className="cursor-pointer justify-center items-center rounded-[10px]
                         w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
                      >
                        <img
                          src={'/add-quiz.png'}
                          width={160}
                          height={160}
                          alt=""
                        />
                        <span className="select-none opacity-40">
                          Add a new Quiz
                        </span>
                      </div>
                    </div>
                  </QuizSection>
                )}
              </>
            ) : (
              <div className="h-96 flex flex-col gap-4 justify-center items-center">
                <h2 className="font-bold text-5xl">
                  Learn 10x <span className="text-green-700">Faster!</span>
                </h2>
                <span className="text-xl font-light">
                  Unlock Your Potential with Personalized Quizzes
                </span>
                <Button onClick={handleLogin}>
                  Get Started Now!
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default QuizzesArea;
