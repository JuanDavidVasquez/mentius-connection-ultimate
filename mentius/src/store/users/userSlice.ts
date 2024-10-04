import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    name: string;
    // Add other user properties here
}

interface UsersState {
    users: User[];
    user: Partial<User>;
    loading: boolean;
}

const initialState: UsersState = {
    users: [],
    user: {},
    loading: false,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        isLoading: (state) => {
            state.loading = true;
        },
        setUsers: (state, action: PayloadAction<{ users: User[] }>) => {
            state.loading = false;
            state.users = action.payload.users;
        },
        setUser: (state, action: PayloadAction<{ user: User }>) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        newUser: (state, action: PayloadAction<{ user: User }>) => {
            state.loading = true;
            state.user = action.payload.user;
        },
        addUser: (state, action: PayloadAction<{ user: User }>) => {
            state.loading = false;
            state.users.push(action.payload.user);
        },
        removeUser: (state, action: PayloadAction<{ id: number }>) => {
            state.loading = false;
            state.users = state.users.filter(user => user.id !== action.payload.id);
        },
        selectedUser: (state, action: PayloadAction<{ user: User }>) => {
            state.loading = false;
            state.user = action.payload.user;
        }
    }
});

export const { isLoading, setUsers, setUser, newUser, addUser, removeUser, selectedUser } = usersSlice.actions;
export default usersSlice.reducer;
