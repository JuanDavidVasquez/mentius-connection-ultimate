import { useEffect, useState } from "react";
import { MySearch } from "../../utils/forms";
import { useDispatch, useSelector } from "react-redux";
import { getSystemUsers } from "../../store/systemUsers/thunk";
import { SelectSystemUser } from "../components/SelectSystemUser";
import { selectedSystemUser } from "../../store/systemUsers/systemUserSlice"; // Importa la acción
import { CreateSystemUser } from "../components/CreateSystemUser";

interface SystemUser {
  cedula: string;
  usuario_RED: string;
  id_walter_bridge: string;
  id_biometrico: string;
  correo_mentius: string;
  pure_cloud: string;
  usuario_sap: string;
  usuario_c4c: string;
  rtrweb: string;
  s4hanna: string;
  usuario_crm: string;
  codigo_vendedor: string;
  usuario_ucontact: string;
  agent_genesys: string;
  usuario_confronta: string;
  usuario_app_times: string;
}

export const SystemUsers = () => {
    const [toggleCreated, setToggleCreated] = useState(false);
  const dispatch = useDispatch();
  const systemUsers = useSelector((state: any) => state.systemUsers.systemUsers);

  useEffect(() => {
    // Obtiene los usuarios del sistema
    dispatch(getSystemUsers());
  }, [dispatch]);

  // Función para manejar la selección de un usuario en el dropdown
  const handleUserSelect = (selectedUser: SystemUser) => {
    console.log("Usuario seleccionado:", selectedUser);

    // Despacha la acción para seleccionar el usuario en el store
    dispatch(selectedSystemUser(selectedUser));
  };

  const toggleCreatedUser = () => {
    setToggleCreated(!toggleCreated);
  };

  return (
    <div className="containerSystemUsers">
      <h1>System Users</h1>

      <button 
      onClick={toggleCreatedUser}
      className="btn info"
      >Crear System User</button>

      {toggleCreated && <div className="createSystemUser"><CreateSystemUser/></div>}
      <MySearch
        data={systemUsers}
        filterFields={[
          "cedula",
          "usuario_RED",
          "id_walter_bridge",
          "id_biometrico",
          "correo_mentius",
          "pure_cloud",
          "usuario_sap",
          "usuario_c4c",
          "rtrweb",
          "s4hanna",
          "usuario_crm",
          "codigo_vendedor",
          "usuario_ucontact",
          "agent_genesys",
          "usuario_confronta",
          "usuario_app_times",
        ]}
        onItemSelect={handleUserSelect} // Callback cuando se selecciona un ítem
      />
      <div className="listSystemUserSelected">
        <SelectSystemUser />
      </div>
    </div>
  );
};

export default SystemUsers;
