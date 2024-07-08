import React,{useState,useEffect} from 'react';
import QuizBuildNav from './QuizBuildPage/QuizBuildNav';
import QuizBuildTitle from './QuizBuildPage/QuizBuildTitle';
import QuizBuildQuestions from './QuizBuildPage/QuizBuildQuestions';
import { v4 as uuidv4 } from 'uuid';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import IconsComponents from '../common/IconsComponents';
import useGlobalContextProvider from '../Context/ContextApi';


function Page(props) {
    const prefixes = ['A', 'B', 'C', 'D'];
    const { selectedIconObject, selectedQuizObject } = useGlobalContextProvider();
    const { selectedIcon } = selectedIconObject;
    const { selectedQuiz } = selectedQuizObject;
    const [focusFirst, setFocusFirst] = useState(true);

    const [quizQuestions, setQuizQuestions] = useState(() => {
      if (selectedQuiz) {
        return selectedQuiz.quizQuestions;
      } else {
        return [
          {
            id: uuidv4(),
            mainQuestion: '',
            choices: prefixes.slice(0, 2).map((prefix) => `${prefix} `),
            correctAnswer: '',
            explanation: '', // Add explanation field
            answeredResult: -1,
            statistics: {
              totalAttempts: 0,
              correctAttempts: 0,
              incorrectAttempts: 0,
            },
          },
        ];
      }
    });
  
    const [newQuiz, setNewQuiz] = useState(() => {
      if (selectedQuiz) {
        return selectedQuiz;
      } else {
        return {
          _id: '',
          icon: selectedIcon.faIcon,
          quizTitle: '',
          quizQuestions: quizQuestions,
        };
      }
    });
  
    console.log(newQuiz);
  

  function onChangeQuizTitle(text) {
    setNewQuiz((prevQuiz) => ({ ...prevQuiz, quizTitle: text }));
  }


  useEffect(() => {
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      icon: selectedIcon.faIcon,
      quizQuestions: quizQuestions,
    }));
  }, [quizQuestions,selectedIcon.faIcon]);

 const quizNavBarProps = {
    quizQuestions,
    newQuiz,
    setNewQuiz,
  };

  const quizTitleProps = {
    focusProp: { focus: focusFirst, setFocusFirst },
    onChangeQuizTitle,
  };

  const quizQuestionsProps = {
    focusProp: { focus: !focusFirst, setFocusFirst },
    quizQuestions,
    setQuizQuestions,
  };
    return (
      <div className=" relative mx-16 poppins">
        <IconsComponents />
        <QuizBuildNav {...quizNavBarProps} />
        <QuizBuildTitle {...quizTitleProps} />
        <QuizBuildQuestions {...quizQuestionsProps} />
      </div>
    );
  }
  
  export default Page;