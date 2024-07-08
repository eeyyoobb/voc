// actions.js
// Define your action types
export const FETCH_QUIZZES_SUCCESS = 'FETCH_QUIZZES_SUCCESS';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const SET_LOADING = 'SET_LOADING';

// Define action creators
export const fetchQuizzesSuccess = (quizzes) => ({
  type: FETCH_QUIZZES_SUCCESS,
  payload: quizzes,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});
