import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../pages/auth/api/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
