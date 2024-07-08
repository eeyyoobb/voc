import { configureStore, combineReducers } from "@reduxjs/toolkit";
//import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';

import {userReducer} from "./reducers/userReducers";
import questionReducer from './reducers/question_reducer';
import resultReducer from './reducers/result_reducer';
import VideoReducer from "./reducers/videoSlice"

import { authReducer } from './reducers/auth.reducer';
import {
   homeVideosReducer,
   relatedVideoReducer,
   searchedVideosReducer,
   subscriptionsChannelReducer,
   channelVideosReducer,
   selectedVideoReducer,
} from './reducers/videos.reducer';
import { channelDetailsReducer } from './reducers/channel.reducer';
import { commentListReducer } from './reducers/comments.reducer';

// Retrieve user info from localStorage if it exists
const userInfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

// Define the initial state including user info from storage
const initialState = {
  user: { userInfo: userInfoFromStorage },
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  questions: questionReducer,
  result: resultReducer,
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
  searchedVideos: searchedVideosReducer,
  subscriptionsChannel: subscriptionsChannelReducer,
  channelVideos: channelVideosReducer,
  video: VideoReducer,
});

// Configure the store with the combined reducers and initial state
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: false // Enable Redux DevTools only in development mode
});

export default store;
