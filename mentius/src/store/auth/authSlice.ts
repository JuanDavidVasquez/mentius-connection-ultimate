import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        user:{},
        dataUser:{},
        status: ''        
    },
    reducers: {
        isLoading:(state)=>{
            state.isLoading = true;
        },
        loginIn: (state ) => {           
          state.status = 'checking'
        },
        logout:(state)=>{
            state.user = {},
            state.dataUser = {}
            state.status = ''
        },
        userAuth:(state, action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.status = action.payload.status;
            state.dataUser = action.payload.dataUser;
        },
        reloadAuth:(state, action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.dataUser = action.payload.dataUser;
        },
        perfilUserAuth:(state,action)=>{
            state.status = action.payload.status;
        }
    }
});
export const { isLoading, logout, userAuth, perfilUserAuth, reloadAuth } = authSlice.actions;
