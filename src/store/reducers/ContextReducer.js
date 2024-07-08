import { combineReducers } from 'redux';
import quizzesReducer from './quizzesReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  quizzes: quizzesReducer,
  user: userReducer,
  ui: uiReducer,
});

export default rootReducer;
