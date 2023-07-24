import { createSlice } from '@reduxjs/toolkit';

export const tonalitySlice = createSlice({
  name: 'tonality',
  initialState: {
    value: null,
  },
  reducers: {
    setTonality: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTonality } = tonalitySlice.actions;

export default tonalitySlice.reducer;
