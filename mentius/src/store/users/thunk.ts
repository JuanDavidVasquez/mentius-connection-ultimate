import { userApi } from "./userApi";
import { isLoading, setUsers, setUser, addUser, removeUser } from "./userSlice";
import { Dispatch } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  password?: string;
  role?: string;
}

export const getUsers = () => {
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

      const { data } = await userApi.get("users", config);

      dispatch(setUsers({ users: data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUser = (user: any) => {
  return async (dispatch:Dispatch) => {
    dispatch(setUser({ user }));
  };
};

export const createNewUser = (user: any) =>{
    return async (dispatch:Dispatch) => {
      dispatch(isLoading()); 
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const { data } = await userApi.post(`users`,user, config);

        dispatch(addUser({ user: data }));

      } catch (error) {
        console.log(error);
      }
    }
  }

  export const removeUsuario = (id: number) => {
    return async (dispatch:Dispatch) => {
      dispatch(isLoading());
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await userApi.delete(`users/${id}`, config);
        dispatch(removeUser({ id }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  export const updateUser = (user: User) => {
    return async (dispatch:Dispatch) => {
      dispatch(isLoading());
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await userApi.put(`users/${user.id}`, user, config);
        dispatch(setUser({ user: data }));
      }
      catch (error) {
        console.log(error);
      }
    }
  };

  export const updateUserPassword = (user: any) => {
    return async (dispatch:Dispatch) => {
      dispatch(isLoading());
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await userApi.put(`users/${user.id}`, user, config);
        dispatch(setUser({ user: data }));
      }
      catch (error) {
        console.log(error);
      }
    }
  };