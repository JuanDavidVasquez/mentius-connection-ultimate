import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Role {
    id: number;
    name: string;
}


export const roleSlice = createSlice({
    name: 'roles',
    initialState: {
        loading: false,
        role:{},
        roles: [] as Role[],

    },
    reducers: {
        isLoading: (state) => {
            state.loading = true;
        },
        setRoles: (state, action: PayloadAction<{ roles: Role[] }>) => {
            state.loading = false;
            state.roles = action.payload.roles;
        },
        setRole: (state, action: PayloadAction<{ role: Role }>) => {
            state.loading = false;
            state.role = action.payload.role;
        },
        newRole: (state, action: PayloadAction<{ role: Role }>) => {
            state.loading = false;
            state.role = action.payload.role;
        },
        addRole: (state, action: PayloadAction<{ role: Role }>) => {
            state.loading = false;
            state.roles.push(action.payload.role);
        },
        removeRole: (state, action: PayloadAction<{ id: number }>) => {
            state.loading = false;
            state.roles = state.roles.filter(role => role.id !== action.payload.id);
        },
        selectedRole: (state, action: PayloadAction<{ role: Role }>) => {
            state.loading = false;
            state.role = action.payload.role;
        },
        updateRole: (state, action: PayloadAction<{ role: Role }>) => {
            state.loading = false;
            const updatedRole = action.payload.role;
            state.roles = state.roles.map(role => 
                role.id === updatedRole.id ? updatedRole : role
            );
        },
    }

});
export const { isLoading, setRoles, setRole, newRole, addRole, removeRole, selectedRole, updateRole } = roleSlice.actions;
export default roleSlice.reducer;