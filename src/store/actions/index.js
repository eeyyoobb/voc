import {
    FETCH_QUIZZES_SUCCESS,
    SET_SELECT_QUIZ_TO_START,
    FETCH_USER_SUCCESS,
    SET_USER_XP,
    SET_LOADING,
    SET_SELECTED_ICON,
    SET_DROP_DOWN_TOGGLE,
    SET_THREE_DOTS_POSITIONS,
    SET_SELECTED_QUIZ,
    SET_OPEN_ICON_BOX,
  } from './types';
  import toast from 'react-hot-toast';
  
  export const fetchQuizzesSuccess = (quizzes) => ({
    type: FETCH_QUIZZES_SUCCESS,
    payload: quizzes,
  });
  
  export const setSelectQuizToStart = (quiz) => ({
    type: SET_SELECT_QUIZ_TO_START,
    payload: quiz,
  });
  
  export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    payload: user,
  });
  
  export const setUserXP = (xp) => ({
    type: SET_USER_XP,
    payload: xp,
  });
  
  export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
  });
  
  export const setSelectedIcon = (icon) => ({
    type: SET_SELECTED_ICON,
    payload: icon,
  });
  
  export const setDropDownToggle = (toggle) => ({
    type: SET_DROP_DOWN_TOGGLE,
    payload: toggle,
  });
  
  export const setThreeDotsPositions = (positions) => ({
    type: SET_THREE_DOTS_POSITIONS,
    payload: positions,
  });
  
  export const setSelectedQuiz = (quiz) => ({
    type: SET_SELECTED_QUIZ,
    payload: quiz,
  });
  
  export const setOpenIconBox = (open) => ({
    type: SET_OPEN_ICON_BOX,
    payload: open,
  });
  
  export const fetchAllQuizzes = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('http://localhost:5000/api/quizzes', {
        cache: 'no-cache',
      });
  
      if (!response.ok) {
        toast.error('Something went wrong...');
        throw new Error('Fetching failed...');
      }
  
      const quizzesData = await response.json();
      dispatch(fetchQuizzesSuccess(quizzesData));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const fetchUser = () => async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: 'quizUser',
          isLogged: false,
          experience: 0,
        }),
      });
  
      if (!response.ok) {
        toast.error('Something went wrong...');
        throw new Error('Fetching failed...');
      }
  
      const userData = await response.json();
      dispatch(fetchUserSuccess(userData.user));
    } catch (error) {
      console.error(error);
    }
  };
  