import { createSlice } from '@reduxjs/toolkit';

export const rhythmSlice = createSlice({
  name: 'rhythm',
  initialState: {
    value: null,
  },
  reducers: {
    setRhythm: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRhythm } = rhythmSlice.actions;

export default rhythmSlice.reducer;
