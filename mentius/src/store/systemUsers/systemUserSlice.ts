import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define la interfaz del usuario
interface User {
  cedula?: string;
  usuario_RED?: string;
  id_walter_bridge?: string;
  id_biometrico?: string;
  correo_mentius?: string;
  pure_cloud?: string;
  usuario_sap?: string;
  usuario_c4c?: string;
  rtrweb?: string;
  s4hanna?: string;
  usuario_crm?: string;
  codigo_vendedor?: string;
  usuario_ucontact?: string;
  agent_genesys?: string;
  usuario_confronta?: string;
  usuario_app_times?: string;
}

// Define la interfaz del estado de usuarios
interface UsersState {
  systemUsers: User[]; 
  systemUser: Partial<User>; 
  loading: boolean;
}

// Estado inicial
const initialState: UsersState = {
  systemUsers: [], 
  systemUser: {}, 
  loading: false,
};

// Define el slice
export const systemUserSlice = createSlice({
  name: 'systemUsers', 
  initialState,
  reducers: {
    isLoading: (state) => {
      state.loading = true; // Activa el estado de carga
    },
    setSystemUsers: (state, action: PayloadAction<User[]>) => {
      state.loading = false; 
      state.systemUsers = action.payload; // Establece la lista de usuarios
    },
    setSystemUser: (state, action: PayloadAction<User>) => {
      state.loading = false; 
      state.systemUser = action.payload; // Establece el usuario seleccionado
    },
    addSystemUser: (state, action: PayloadAction<User>) => {
      state.loading = false; 
      state.systemUsers.push(action.payload); // Agrega un nuevo usuario a la lista
    },
    updateSystemUser: (state, action: PayloadAction<User>) => {
      state.loading = false; 
      const index = state.systemUsers.findIndex(systemUser => systemUser.cedula === action.payload.cedula);
      if (index !== -1) {
        state.systemUsers[index] = { ...state.systemUsers[index], ...action.payload }; // Actualiza el usuario
      }
    },
    removeSystemUser: (state, action: PayloadAction<{ cedula: string }>) => {
      state.loading = false; 
      state.systemUsers = state.systemUsers.filter(systemUser => systemUser.cedula !== action.payload.cedula); // Elimina el usuario
    },
    selectedSystemUser: (state, action: PayloadAction<User>) => {
      state.loading = false; 
      state.systemUser = action.payload; // Establece el usuario seleccionado
    },
  },
});

// Exporta las acciones para su uso en los componentes
export const { isLoading, setSystemUsers, setSystemUser, addSystemUser, updateSystemUser, removeSystemUser, selectedSystemUser } = systemUserSlice.actions;

// Exporta el reducer para agregarlo al store
export default systemUserSlice.reducer;
