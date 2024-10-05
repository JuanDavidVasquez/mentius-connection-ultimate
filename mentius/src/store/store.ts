import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { usersSlice } from './users';
import { roleSlice } from './roles';
import toastSlice from './hooks/toastSlice';



export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toastActive: toastSlice,
    users: usersSlice.reducer,
    roles: roleSlice.reducer,
  },
});