import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      appointments: appointmentReducer,
    },
  });
};

// Tipos inferidos para el estado completo y dispatch
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];