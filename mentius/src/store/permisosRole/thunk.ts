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
console.log(data);
            dispatch(setPermisoRole({ permisoRole: data }));
        } catch (error) {   
            console.log(error);
        }
    };  
};