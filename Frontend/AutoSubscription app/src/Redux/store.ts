import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSliceReducer from './authSlice';
import userSliceReducer from './userSlice';

const store = configureStore({
    reducer: {
      auth: authSliceReducer,
      users: userSliceReducer
    
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;