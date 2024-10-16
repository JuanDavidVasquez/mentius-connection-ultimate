import { ThunkAction } from 'redux-thunk';
import { RootState } from './RootState'; // Asegúrate de que esta ruta sea correcta
import { Action } from 'redux';

// Define el tipo AppThunk
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState, // Tipo del estado de la tienda
  unknown, // Tipo de extra argument
  Action<string> // Tipo de la acción
>;
