import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Appointment {
  id: string;
  datetime: string;
  name: string;
  specialty: string;
  location: string;
}

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },

    removeAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },

    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    initializeAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },
  },
});

export const {
  addAppointment,
  removeAppointment,
  updateAppointment,
  setLoading,
  setError,
  initializeAppointments,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
