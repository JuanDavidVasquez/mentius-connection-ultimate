import { combineReducers } from 'redux';
import { authSlice } from './auth';
import toastSlice from './hooks/toastSlice';
import { usersSlice } from './users';
import { personasSlice } from './personas';
import { roleSlice } from './roles';
import { permisoSlice } from './permisos';
import { permisosRoleSlice } from './permisosRole';
import { biometricoSlice } from './biometricos';
import { systemUserSlice } from './systemUsers';


const rootReducer = combineReducers({
  auth: authSlice,
  toastActive: toastSlice,
  users: usersSlice,
  personas: personasSlice,
  roles: roleSlice,
  permisos: permisoSlice,
  permisosRole: permisosRoleSlice,
  biometricos: biometricoSlice,
  systemUsers: systemUserSlice,
});

// Exportamos el tipo RootState
export type RootState = ReturnType<typeof rootReducer>; 

export default rootReducer;
