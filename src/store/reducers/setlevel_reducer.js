// reducers/setlevel_reducer.js
import { createSlice } from '@reduxjs/toolkit';

const levelSlice = createSlice({
    name: 'level',
    initialState: {
        selectedLevel: 'easy', // Default level
    },
    reducers: {
        setLevel: (state, action) => {
            state.selectedLevel = action.payload;
        },
    },
});

export const { setLevel } = levelSlice.actions;
export default levelSlice.reducer;
