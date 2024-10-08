import { Dispatch } from "@reduxjs/toolkit";
import { permisoApi } from "./permisoApi";
import { addPermiso, isLoading, setPermiso, setPermisos, updatePermiso, removePermiso } from "./permisoSlice";

export const getPermisos = () => {
    return async (dispatch: Dispatch) => {
        try {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await permisoApi.get("permisos", config);

            dispatch(setPermisos({ permisos: data }));
        } catch (error) {   
            console.log(error);
        }
    };  
};

export const getPermiso = (permiso: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(setPermiso({ permiso }));
    };
};

export const createNewPermiso = (permiso: any) => {
    console.log(permiso);
    return async (dispatch:Dispatch) => {
      dispatch(isLoading()); 
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const { data } = await permisoApi.post(`permisos`,permiso, config);

        dispatch(addPermiso({ permiso: data }));

      } catch (error) {
        console.log(error);
      }
    }
  }

  export const updatePermisoThunk = (permiso: any) =>{
    return async (dispatch:Dispatch) => {
        dispatch(isLoading());
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await permisoApi.put(`permisos/${permiso.id}`, permiso, config);
          dispatch(setPermiso({ permiso: data }));
          dispatch(updatePermiso({ permiso: data }));
        }
        catch (error) {
          console.log(error);
        }
      }
    };

    export const removePermisoThunk = (id: any) => {
        return async (dispatch:Dispatch) => {
            dispatch(isLoading());
            try {
              const token = localStorage.getItem("token");
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              const { data } = await permisoApi.delete(`permisos/${id}`, config);
              dispatch(removePermiso({ id }));
            } catch (error) {
              console.log(error);
            }
          }
        };
      