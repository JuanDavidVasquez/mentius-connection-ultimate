import { Dispatch } from "@reduxjs/toolkit";
import { isLoading, setPersonas } from "./personaSlice";
import { personaApi } from "./personaApi";

export const getPersonas = () => {
    return async (dispatch:Dispatch) => {
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