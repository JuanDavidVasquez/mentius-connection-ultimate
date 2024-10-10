import { biometricoApi } from "./biometricoApi";
import { setBiometricos, addBiometrico } from "./biometricoSlice";

export const getBiometricos = () => {
    return async (dispatch: any) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await biometricoApi.get("/biometricos", config);
            dispatch(setBiometricos({ biometricos: data }));
        } catch (error) {
            console.log(error);
        }
    };
};

export const createBiometrico = (biometrico: any) => {
    return async (dispatch: any) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        // Realiza la solicitud POST para crear un nuevo biométrico
        const { data } = await biometricoApi.post("/biometricos", biometrico, config);
  
        // Dispatch de la acción para actualizar el estado con los datos recibidos
        dispatch(addBiometrico({ biometrico: data.biometrico }));
  
        // Retorna la respuesta de éxito para manejarla en el componente
        return { success: true, message: "Biométrico creado correctamente", createdRecord: data };
      } catch (error) {
        console.log(error);
  
        // Maneja el error retornando un objeto con el mensaje de error
        return { error: (error as any).response?.data?.error || "Error al crear el biométrico" };
      }
    };
  };
  
  export const updateBiometrico = (biometrico: any) => {
    return async (dispatch: any) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await biometricoApi.put(`/biometricos/${biometrico.id}`, biometrico, config);
        dispatch(updateBiometrico({ biometrico: data.biometrico }));
        return { success: true, message: "Biométrico actualizado correctamente", updatedRecord: data };
      } catch (error) {
        console.log(error);
        return { error: (error as any).response?.data?.error || "Error al actualizar el biométrico" };
      }
    };
  };
  