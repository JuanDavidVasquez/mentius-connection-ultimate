import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Permiso {
    id: number;
    name: string;
}


export const permisoSlice = createSlice({
    name: 'permisos',
    initialState: {
        loading: false,
        permiso:{},
        permisos: [] as Permiso[],

    },
    reducers: {
        isLoading: (state) => {
            state.loading = true;
        },
        setPermisos: (state, action: PayloadAction<{ permisos: Permiso[] }>) => {
            state.loading = false;
            state.permisos = action.payload.permisos;
        },
        setPermiso: (state, action: PayloadAction<{ permiso: Permiso }>) => {
            state.loading = false;
            state.permiso = action.payload.permiso;
        },
        newPermiso: (state, action: PayloadAction<{ permiso: Permiso }>) => {
            state.loading = false;
            state.permiso = action.payload.permiso;
        },
        addPermiso: (state, action: PayloadAction<{ permiso: Permiso }>) => {
            state.loading = false;
            state.permisos.push(action.payload.permiso);
        },
        removePermiso: (state, action: PayloadAction<{ id: number }>) => {
            state.loading = false;
            state.permisos = state.permisos.filter(permiso => permiso.id !== action.payload.id);
        },
        selectedPermiso: (state, action: PayloadAction<{ permiso: Permiso }>) => {
            state.loading = false;
            state.permiso = action.payload.permiso;
        },
        updatePermiso: (state, action: PayloadAction<{ permiso: Permiso }>) => {
            state.loading = false;
            const updatedPermiso = action.payload.permiso;
            state.permisos = state.permisos.map(permiso => 
                permiso.id === updatedPermiso.id ? updatedPermiso : permiso
            );
        },
    }

});
export const { isLoading, setPermisos, setPermiso, newPermiso, addPermiso, removePermiso, selectedPermiso, updatePermiso } = permisoSlice.actions;
export default permisoSlice.reducer;