import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  userInfo: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetUserInfo(state) {
      state.userInfo = null;
    },
    loginStart(state) {
      state.loading = true;
      state.error = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = false;
    },
    loginFailure(state) {
      state.loading = false;
      state.error = true;
    },
    logout:(state) => {
      state.loading =false;
      state.userInfo = null;
      state.error = false;
    },


      subscription: (state, action) => {
        if (state.userInfo.subscribedUsers.includes(action.payload)) {
          state.userInfo.subscribedUsers.splice(
            state.userInfo.subscribedUsers.findIndex(
              (channelId) => channelId === action.payload
            ),
            1
          );
        } else {
          state.userInfo.subscribedUsers.push(action.payload);
        }
      },
},
}); 

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
