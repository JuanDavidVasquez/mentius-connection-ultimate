import { useState } from "react";
import { useSelector } from "react-redux";
import { EditSystemUsers } from "./EditSystemUsers";

export const SelectSystemUser = () => {
  // Obtiene el usuario seleccionado del estado global
  const systemUser = useSelector((state: any) => state.systemUsers.systemUser);
  const [edit, setEdit] = useState(false);

  // Función para alternar la vista de edición
  const activeEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      {edit ? ( // Si está en modo de edición, muestra el componente de edición
        <EditSystemUsers />
      ) : (
        systemUser?.cedula ? (
          <>
            <h2>Usuario seleccionado: {systemUser.cedula}</h2>
            <button className="btn edit" style={{width:"25%",height:"35px"}} onClick={activeEdit}>Editar</button>
            <p><strong>Usuario RED:</strong> {systemUser.usuario_RED}</p>
            <p><strong>ID Walter Bridge:</strong> {systemUser.id_walter_bridge}</p>
            <p><strong>ID Biométrico:</strong> {systemUser.id_biometrico}</p>
            <p><strong>Correo Mentius:</strong> {systemUser.correo_mentius}</p>
            <p><strong>Pure Cloud:</strong> {systemUser.pure_cloud}</p>
            <p><strong>Usuario SAP:</strong> {systemUser.usuario_sap}</p>
            <p><strong>Usuario C4C:</strong> {systemUser.usuario_c4c}</p>
            <p><strong>RTRWeb:</strong> {systemUser.rtrweb}</p>
            <p><strong>S4Hanna:</strong> {systemUser.s4hanna}</p>
            <p><strong>Usuario CRM:</strong> {systemUser.usuario_crm}</p>
            <p><strong>Código Vendedor:</strong> {systemUser.codigo_vendedor}</p>
            <p><strong>Usuario UContact:</strong> {systemUser.usuario_ucontact}</p>
            <p><strong>Agent Genesys:</strong> {systemUser.agent_genesys}</p>
            <p><strong>Usuario Confronta:</strong> {systemUser.usuario_confronta}</p>
            <p><strong>Usuario App Times:</strong> {systemUser.usuario_app_times}</p>
          </>
        ) : (
          <p>No hay usuario seleccionado.</p> 
        )
      )}
    </>
  );
};
