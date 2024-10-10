import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Biometrico {
    id: number;
    numero: string;
}


export const biometricoSlice = createSlice({
    name: 'biometricos',
    initialState: {
        loading: false,
        biometrico: {} as Biometrico,
        biometricos: [] as Biometrico[],

    },
    reducers: {
        isLoading: (state) => {
            state.loading = true;
        },
        setBiometricos: (state, action: PayloadAction<{ biometricos: Biometrico[] }>) => {
            state.loading = false;
            state.biometricos = action.payload.biometricos;
        },
        setBiometrico: (state, action: PayloadAction<{ biometrico: Biometrico }>) => {
            state.loading = false;
            state.biometrico = action.payload.biometrico;
        },
        newBiometrico: (state, action: PayloadAction<{ biometrico: Biometrico }>) => {
            state.loading = false;
            state.biometrico = action.payload.biometrico;
        },
        addBiometrico: (state, action: PayloadAction<{ biometrico: Biometrico }>) => {
            state.loading = false;
            state.biometricos.push(action.payload.biometrico);
        },
        updateBiometrico: (state, action: PayloadAction<{ biometrico: Biometrico }>) => {
            state.loading = false;
            const updatedBiometrico = action.payload.biometrico;
            state.biometricos = state.biometricos.map(biometrico =>
                biometrico.id === updatedBiometrico.id ? updatedBiometrico : biometrico
            );
        },
        removeBiometrico: (state, action: PayloadAction<{ id: number }>) => {
            state.loading = false;
            state.biometricos = state.biometricos.filter(biometrico => biometrico.id !== action.payload.id);
        },

    }

});
export const { isLoading, 
                setBiometricos,
                setBiometrico,
                newBiometrico,
                addBiometrico,
                updateBiometrico,
                removeBiometrico } = biometricoSlice.actions;
export default biometricoSlice.reducer;