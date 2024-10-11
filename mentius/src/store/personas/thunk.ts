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

// thunk.ts
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
        const { data } = await personaApi.put(`personas/${persona.id}`, persona, config);
        dispatch(setPersona({ persona: data.data }));
        console.log(data);
        // Devuelve un objeto indicando éxito
        return { success: true, message: "Persona actualizada correctamente." };
      } catch (error) {
        console.log(error);
        // Devuelve un objeto indicando error
        return { error: (error as any).response?.data?.message || (error as any).message || "Error al actualizar la persona." };
      }
    };
  };
  