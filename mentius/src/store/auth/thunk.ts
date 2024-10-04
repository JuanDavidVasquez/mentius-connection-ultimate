import { Dispatch } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { isLoading, userAuth, logout, perfilUserAuth, reloadAuth } from "./authSlice";


interface LoginFormData {
  username: string;
  password: string;
  terms: boolean;
}

export const login = (formData: LoginFormData) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoading());
    console.log(formData)
    try {
      const { data } = await authApi.post("login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user_name);

      dispatch(userAuth({ user: data, status: "check" }));
    } catch (error) {
      console.error("Error during login:", error);
    }

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await authApi.get("/perfil", config);

      dispatch(userAuth({ dataUser: data }));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
};

export const performLogout = () => {
  return (dispatch: Dispatch) => {
    dispatch(logout());
    dispatch(userAuth({ status: "", user: {}, dataUser: {} }));
    localStorage.removeItem("token");
  };
};

export const changeStatus = () => {
  const perfilUser = () => {
    return async (dispatch: Dispatch) => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await authApi.get("/perfil", config);

        dispatch(reloadAuth({ dataUser: data }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  };

  return async (dispatch: Dispatch) => {
    dispatch(perfilUserAuth({ status: "check" }));
    await dispatch(perfilUser());
  };
};
