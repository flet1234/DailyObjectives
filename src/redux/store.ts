import {configureStore} from '@reduxjs/toolkit';
import daysDataReducer from './features/daysData/daysDataSlice';

export const store = configureStore({
  reducer: {
    daysDataReducer: daysDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
