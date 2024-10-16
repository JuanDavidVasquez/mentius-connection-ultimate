import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { usersSlice } from './users';
import { roleSlice } from './roles';
import toastSlice from './hooks/toastSlice';
import { permisoSlice } from './permisos';
import { permisosRoleSlice } from './permisosRole';
import { biometricoSlice } from './biometricos/biometricoSlice';
import { personasSlice } from './personas';
import { systemUserSlice } from './systemUsers';



export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toastActive: toastSlice,
    users: usersSlice.reducer,
    personas: personasSlice.reducer,
    roles: roleSlice.reducer,
    permisos: permisoSlice.reducer,
    permisosRole: permisosRoleSlice.reducer,
    biometricos: biometricoSlice.reducer,
    systemUsers :systemUserSlice.reducer,
  },
});