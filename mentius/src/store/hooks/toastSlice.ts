import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: "toastActive",
    initialState: {
        active: false,
        message: "",
    },
    reducers: {
        toastActive: (state, action) => {
            state.active = true;
            state.message = action.payload.message;
        },
        toastInactive: (state) => {
            state.active = false;
            state.message = "";
        },
    },
});

export const { toastActive, toastInactive } = toastSlice.actions;
export default toastSlice.reducer;
