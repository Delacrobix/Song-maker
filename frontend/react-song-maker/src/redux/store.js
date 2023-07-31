import { configureStore } from '@reduxjs/toolkit';
import tonalitySlice from './tonalitySlice';
import rhythmSlice from './rhythmSlice';
// import isLoggedSlice from './isLoggedSlice';

export default configureStore({
  reducer: {
    tonality: tonalitySlice,
    rhythm: rhythmSlice,
  },
});
