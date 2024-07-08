import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false; // Reset error state when fetching starts
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
      state.error = false; // Reset error state on successful fetch
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true; // Set error state on fetch failure
    },
    like: (state, action) => {
      if (state.currentVideo) {
        const userId = action.payload;
        if (!state.currentVideo.likes.includes(userId)) {
          state.currentVideo.likes.push(userId);
        }
        const dislikeIndex = state.currentVideo.dislikes.findIndex(
          (userId) => userId === action.payload
        );
        if (dislikeIndex !== -1) {
          state.currentVideo.dislikes.splice(dislikeIndex, 1);
        }
      }
    },
    dislike: (state, action) => {
      if (state.currentVideo) {
        const userId = action.payload;
        if (!state.currentVideo.dislikes.includes(userId)) {
          state.currentVideo.dislikes.push(userId);
        }
        const likeIndex = state.currentVideo.likes.findIndex(
          (userId) => userId === action.payload
        );
        if (likeIndex !== -1) {
          state.currentVideo.likes.splice(likeIndex, 1);
        }
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  videoSlice.actions;

export default videoSlice.reducer;
