import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {userReducer} from "./reducers/userReducers";
import questionReducer from './reducers/question_reducer';
import resultReducer from './reducers/result_reducer';
import videoReducer from "./reducers/videoSlice";
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

// Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
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
  video: videoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the combined reducers and initial state
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: false
});

const persistor = persistStore(store);

export default store;
export { persistor };
