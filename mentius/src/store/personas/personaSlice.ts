import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definir la interfaz de la Persona
interface Persona {
    id: number;
    id_user: number;
    cedula: string;
    primer_nombre: string;
    segundo_nombre?: string; 
    primer_apellido: string;
    segundo_apellido?: string;
    genero?: string;  
    fecha_nacimiento: string;  // ISO Date format: 'YYYY-MM-DD'
    ciudad_nacimiento?: string;
    edad?: number;
    rango_edad?: string;
    estado_civil?: string;
    estado_en_la_empresa: string;
}

// Definir el estado inicial para la slice de Redux
interface PersonasState {
    personas: Persona[];
    persona: Partial<Persona>;  // Para manejar un solo objeto Persona de forma parcial
    loading: boolean;
}

const initialState: PersonasState = {
    personas: [],
    persona: {},
    loading: false,
};

export const personasSlice = createSlice({
    name: 'personas',
    initialState,
    reducers: {
        isLoading: (state) => {
            state.loading = true;
        },
        setPersonas: (state, action: PayloadAction<{ personas: Persona[] }>) => {
            state.loading = false;
            state.personas = action.payload.personas;
        },
        setPersona: (state, action: PayloadAction<{ persona: Persona }>) => {
            state.loading = false;
            state.persona = action.payload.persona;
        },
        newPersona: (state, action: PayloadAction<{ persona: Persona }>) => {
            state.loading = true;
            state.persona = action.payload.persona;
        },
        addPersona: (state, action: PayloadAction<{ persona: Persona }>) => {
            state.loading = false;
            state.personas.push(action.payload.persona);
        },
        removePersona: (state, action: PayloadAction<{ id: number }>) => {
            state.loading = false;
            state.personas = state.personas.filter(persona => persona.id !== action.payload.id);
        },
        selectedPersona: (state, action: PayloadAction<{ persona: Persona }>) => {
            state.loading = false;
            state.persona = action.payload.persona;
        }
    }
});

// Exportar las acciones y el reducer
export const { isLoading, setPersonas, setPersona, newPersona, addPersona, removePersona, selectedPersona } = personasSlice.actions;
export default personasSlice.reducer;
