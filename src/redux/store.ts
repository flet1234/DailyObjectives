import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import fileSystemStorage from 'redux-persist-filesystem-storage';
import daysDataReducer from './features/daysData/daysDataSlice';

const persistConfig = {
  key: 'root',
  storage: fileSystemStorage,
};

export const store = configureStore({
  reducer: {daysDataReducer: persistReducer(persistConfig, daysDataReducer)},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
