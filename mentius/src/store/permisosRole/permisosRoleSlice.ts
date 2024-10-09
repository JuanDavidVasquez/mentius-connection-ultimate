import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PermisoRole {
    id: number;
    role_id: number;
    permiso_id: number;
}


export const permisosRoleSlice = createSlice({
    name: 'permisosRole',
    initialState: {
        loading: false,
        permisoRole: {} as PermisoRole,
        permisosRole: [] as PermisoRole[],

    },
    reducers: {
        isLoading: (state) => {
            state.loading = true;
        },
        setPermisosRole: (state, action: PayloadAction<{ permisosRole: PermisoRole[] }>) => {
            state.loading = false;
            state.permisosRole = action.payload.permisosRole;
        },
        setPermisoRole: (state, action: PayloadAction<{ permisoRole: PermisoRole }>) => {
            state.loading = false;
            state.permisoRole = action.payload.permisoRole;
        },
        newPermisoRole: (state, action: PayloadAction<{ permisoRole: PermisoRole }>) => {
            state.loading = false;
            state.permisoRole = action.payload.permisoRole;
        },
        addPermisoRole: (state, action: PayloadAction<{ permisoRole: PermisoRole }>) => {
            state.loading = false;
            state.permisosRole.push(action.payload.permisoRole);
        },
        updatePermisoRole: (state, action: PayloadAction<{ permisoRole: PermisoRole }>) => {
            state.loading = false;
            const updatedPermisoRole = action.payload.permisoRole;
            state.permisosRole = state.permisosRole.map(permisoRole =>
                permisoRole.id === updatedPermisoRole.id ? updatedPermisoRole : permisoRole
            );
        },
        removePermisoRole: (state, action: PayloadAction<{ id: number }>) => {
            state.loading = false;
            state.permisosRole = state.permisosRole.filter(permisoRole => permisoRole.id !== action.payload.id);
        },

    }

});
export const { isLoading, 
                setPermisosRole,
                setPermisoRole,
                newPermisoRole,
                addPermisoRole,
                updatePermisoRole,
                removePermisoRole } = permisosRoleSlice.actions;
export default permisosRoleSlice.reducer;