'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { initializeAppointments } from './slices/appointmentSlice';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();

    if (typeof window !== 'undefined') {
      try {
        const savedAppointments = localStorage.getItem('appointments');
        if (savedAppointments) {
          storeRef.current.dispatch(initializeAppointments(JSON.parse(savedAppointments)));
        }
      } catch (error) {
        console.error('Error loading appointments from localStorage:', error);
      }

      storeRef.current.subscribe(() => {
        try {
          const state = storeRef.current?.getState();
          if (state) {
            localStorage.setItem('appointments', JSON.stringify(state.appointments.appointments));
          }
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      });
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
