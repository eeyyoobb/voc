import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  // other relevant authentication state variables can be added here
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
