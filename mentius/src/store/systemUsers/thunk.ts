import { Dispatch } from "@reduxjs/toolkit";
import { isLoading, setSystemUsers } from "./systemUserSlice";
import { systemUserApi } from "./systemUserApi";
import { toastActive } from "../hooks/toastSlice";


export const getSystemUsers = () => {
    return async (dispatch: Dispatch) => {
        dispatch(isLoading());
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await systemUserApi.get("sistema-usuarios", config);
            dispatch(setSystemUsers(data.data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const createSystemUserThunk = (systemUser: any) => {
    return async (dispatch: Dispatch) => {
      dispatch(isLoading());
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await systemUserApi.post("sistema-usuarios", systemUser, config);
        
        // Despacha los usuarios al estado
        dispatch(setSystemUsers(data.data));
  
        // Envía un mensaje de éxito a toast
        dispatch(toastActive({ message: data.message || "Usuario creado exitosamente", type: 'success' }));
  
      } catch (error) {
        console.log(error);
  
        // Manejo de errores: usa el mensaje de error del backend si está disponible
        let errorMessage = "Error al crear usuario"; // Mensaje genérico
  
        if ((error as any).response) {
          // Hay una respuesta del servidor
          const { data, status } = (error as any).response;
  
          if (status === 422) {
            // Error de validación
            errorMessage = data.message || "Error de validación de datos";
          } else if (status === 409) {
            // Conflicto (por ejemplo, ID biométrico ya en uso)
            errorMessage = data.message || "Conflicto de datos";
          } else {
            // Otros errores
            errorMessage = data.message || "Error en la base de datos al crear el usuario";
          }
        } else {
          // Si no hay respuesta (errores de red, etc.)
          errorMessage = "Ocurrió un error inesperado";
        }
  
        // Despacha el mensaje de error a toast
        dispatch(toastActive({ message: errorMessage, type: 'error' }));
      }
    };
  };


  export const updateSystemUserThunk = (systemUser: any) => {
    return async (dispatch: Dispatch) => {
      dispatch(isLoading());
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await systemUserApi.put(`sistema-usuarios/${systemUser.cedula}`, systemUser, config);
  
        // Despacha los usuarios al estado
        dispatch(setSystemUsers(data.data));
  
        // Envía un mensaje de éxito a toast
        dispatch(toastActive({ message: data.message || "Usuario actualizado exitosamente", type: 'success' }));
  
      } catch (error) {
        console.log(error);
  
        // Manejo de errores: usa el mensaje de error del backend si está disponible
        let errorMessage = "Error al actualizar usuario"; // Mensaje genérico
  
        if ((error as any).response) {
          // Hay una respuesta del servidor
          const { data, status } = (error as any).response;
  
          if (status === 422) {
            // Error de validación
            errorMessage = data.message || "Error de validación de datos";
          } else if (status === 409) {
            // Conflicto (por ejemplo, ID biométrico ya en uso)
            errorMessage = data.message || "Conflicto de datos";
          } else {
            // Otros errores
            errorMessage = data.message || "Error en la base de datos al actualizar el usuario";
          }
        } else {
          // Si no hay respuesta (errores de red, etc.)
          errorMessage = "Ocurrió un error inesperado";
        }
  
        // Despacha el mensaje de error a toast
        dispatch(toastActive({ message: errorMessage, type: 'error' }));
      }
    };
  };