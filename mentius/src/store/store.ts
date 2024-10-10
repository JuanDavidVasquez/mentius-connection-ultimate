import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { usersSlice } from './users';
import { roleSlice } from './roles';
import toastSlice from './hooks/toastSlice';
import { permisoSlice } from './permisos';
import { permisosRoleSlice } from './permisosRole';
import { biometricoSlice } from './biometricos/biometricoSlice';



export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toastActive: toastSlice,
    users: usersSlice.reducer,
    roles: roleSlice.reducer,
    permisos: permisoSlice.reducer,
    permisosRole: permisosRoleSlice.reducer,
    biometricos: biometricoSlice.reducer,
  },
});