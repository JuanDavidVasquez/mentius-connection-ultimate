import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: {},
        loading: false,
    },
    reducers: {
        isLoading: (state) => {
            state.loading = true;
        },
        setUsers: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
        },
        setUser: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        newUser: (state, action) => {
            state.loading = true;
            state.user = action.payload.user;
        },
        addUser: (state, action) => {
            state.loading = false;
            state.users.push(action.payload.user);
        },
        removeUser: (state, action) => {
            state.loading = false;
            state.users = state.users.filter(user => user.id !== action.payload.id);
        }
    }
});

export const { isLoading, setUsers, setUser, newUser, addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
