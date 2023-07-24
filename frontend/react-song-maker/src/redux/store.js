import { configureStore } from '@reduxjs/toolkit';
import tonalitySlice from './tonalitySlice';
import rhythmSlice from './rhythmSlice';

export default configureStore({
  reducer: {
    tonality: tonalitySlice,
    rhythm: rhythmSlice,
  },
});
