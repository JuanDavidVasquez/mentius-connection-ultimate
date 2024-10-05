import { Dispatch } from "@reduxjs/toolkit";
import { roleApi } from "./roleApi";
import { addRole, isLoading, setRole, setRoles, updateRole, removeRole } from "./roleSlice";

export const getRoles = () => {
    return async (dispatch: Dispatch) => {
        try {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await roleApi.get("roles", config);

            dispatch(setRoles({ roles: data }));
        } catch (error) {   
            console.log(error);
        }
    };  
};

export const getRole = (role) => {
    return async (dispatch: Dispatch) => {
        dispatch(setRoles({ role }));
    };
};

export const createNewRole = (role) => {
    console.log(role);
    return async (dispatch:Dispatch) => {
      dispatch(isLoading()); 
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const { data } = await roleApi.post(`roles`,role, config);

        dispatch(addRole({ role: data }));

      } catch (error) {
        console.log(error);
      }
    }
  }

  export const updateRoleThunk = (role) =>{
    return async (dispatch:Dispatch) => {
        dispatch(isLoading());
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await roleApi.put(`roles/${role.id}`, role, config);
          dispatch(setRole({ role: data }));
          dispatch(updateRole({ role: data }));
        }
        catch (error) {
          console.log(error);
        }
      }
    };

    export const removeRoleThunk = (id) => {
        return async (dispatch:Dispatch) => {
            dispatch(isLoading());
            try {
              const token = localStorage.getItem("token");
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              const { data } = await roleApi.delete(`roles/${id}`, config);
              dispatch(removeRole({ id }));
            } catch (error) {
              console.log(error);
            }
          }
        };
      