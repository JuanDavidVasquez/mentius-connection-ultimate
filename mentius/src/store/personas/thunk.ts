import { Dispatch } from "@reduxjs/toolkit";
import { isLoading, setPersona, setPersonas } from "./personaSlice";
import { personaApi } from "./personaApi";

export const getPersonas = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoading());
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await personaApi.get("personas", config);

      dispatch(setPersonas({ personas: data.data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPersona = (persona: any) => {
    return async (dispatch: Dispatch) => {
      dispatch(isLoading());
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await personaApi.post(`personas`, persona, config);
        
        dispatch(setPersonas({ personas: data.data }));
  
        // Retornar la respuesta exitosa
        return { success: true, message: 'Persona asignada con éxito', data: data.data };
      } catch (error) {
        // Manejar el error de forma adecuada
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message || 'Error al asignar la persona';
          return { success: false, error: message };
        } else {
          return { success: false, error: 'Error desconocido' };
        }
      }
    };
  };

export const updatePersona = (persona: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoading());
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await personaApi.put(
        `personas/${persona.id}`,
        persona,
        config
      );
      dispatch(setPersona({ persona: data.data }));
      console.log(data);
      // Devuelve un objeto indicando éxito
      return { success: true, message: "Persona actualizada correctamente." };
    } catch (error) {
      console.log(error);
      // Devuelve un objeto indicando error
      return {
        error:
          (error as any).response?.data?.message ||
          (error as any).message ||
          "Error al actualizar la persona.",
      };
    }
  };
};
