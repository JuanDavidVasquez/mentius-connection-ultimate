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
    console.log(formData);

    try {
      const { data } = await authApi.post("login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user_name);

      dispatch(userAuth({ user: data, status: "check" }));

      // Si el inicio de sesión fue exitoso, intenta recuperar el perfil
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const profileResponse = await authApi.get("/perfil", config);
      dispatch(userAuth({ dataUser: profileResponse.data }));

      // Retorna un objeto que indique que el login fue exitoso
      return { success: true };
    } catch (error) {
      console.error("Error during login:", error);
      // Retorna un objeto que indique que hubo un error
      return { success: false, error: error.response?.data || "Login failed" };
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
