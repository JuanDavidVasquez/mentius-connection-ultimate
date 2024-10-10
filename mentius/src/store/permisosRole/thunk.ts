import { Dispatch } from "@reduxjs/toolkit";
import { setPermisoRole } from "./permisosRoleSlice";
import { permisosRoleApi } from "./permisosRoleApi";

export const getPermisoRole = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await permisosRoleApi.get("/roles-permissions", config);

      dispatch(setPermisoRole({ permisoRole: data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewPermisoRole = (permisoRole: any) => {
    return async (dispatch: Dispatch) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await permisosRoleApi.post(
          `roles-permissions`,
          permisoRole,
          config
        );
  
        // Dispatch de la acción de éxito
        dispatch(setPermisoRole({ permisoRole: data }));
  
        // Retorna la respuesta para manejarla en el componente
        return { success: true, message: "Permisos asignados correctamente", createdRecords: data.createdRecords };
      } catch (error) {
        console.log(error);
        
        // Retorna el error para manejarlo en el componente
        return { error: error.response?.data?.error || "Error al asignar permisos" };
      }
    };
  };
  