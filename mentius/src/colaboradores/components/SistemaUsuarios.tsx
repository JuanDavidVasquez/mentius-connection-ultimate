import React, { useState, useEffect } from 'react';

// Definición de la interfaz para los datos del sistema de usuarios
interface SistemaUsuariosData {
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
}

// Componente SistemaUsuarios que simula la obtención de datos desde una API
export const SistemaUsuarios: React.FC = () => {
  const [sistemaUsuariosData, setSistemaUsuariosData] = useState<SistemaUsuariosData | null>(null);

  useEffect(() => {
    // Simulación de llamada a una API con datos del sistema de usuarios
    const fetchSistemaUsuariosData = async () => {
      const data: SistemaUsuariosData = {
        usuario_RED: 'juan.vasquez',
        id_walter_bridge: 'WB123456',
        id_biometrico: 'BIO987654',
        correo_mentius: 'juan.vasquez@mentius.com',
        pure_cloud: 'purecloud_jvasquez',
        usuario_sap: 'sap_jvasquez',
        usuario_c4c: 'c4c_jvasquez',
        rtrweb: 'rtrweb_juanv',
        s4hanna: 's4hanna_jvasquez',
        usuario_crm: 'crm_juanv',
        codigo_vendedor: 'VEN000123',
        usuario_ucontact: 'ucontact_jvasquez',
        agent_genesys: 'genesys_jvasquez',
        usuario_confronta: 'confronta_juanv',
      };

      // Simulamos el delay de la API con un timeout
      setTimeout(() => setSistemaUsuariosData(data), 1000);
    };

    fetchSistemaUsuariosData();
  }, []);

  // Renderizamos un mensaje de carga mientras los datos se obtienen
  if (!sistemaUsuariosData) {
    return <div>Cargando datos del sistema de usuarios...</div>;
  }

  // Renderizado de los datos del sistema de usuarios una vez obtenidos
  return (
    <>
      <h2>Datos del Sistema de Usuarios</h2>
      <div className="item-data"><strong>Usuario RED:</strong> <span>{sistemaUsuariosData.usuario_RED}</span></div>
      <div className="item-data"><strong>ID Walter Bridge:</strong> <span>{sistemaUsuariosData.id_walter_bridge}</span></div>
      <div className="item-data"><strong>ID Biométrico:</strong> <span>{sistemaUsuariosData.id_biometrico}</span></div>
      <div className="item-data"><strong>Correo Mentius:</strong> <span>{sistemaUsuariosData.correo_mentius}</span></div>
      <div className="item-data"><strong>Pure Cloud:</strong> <span>{sistemaUsuariosData.pure_cloud}</span></div>
      <div className="item-data"><strong>Usuario SAP:</strong> <span>{sistemaUsuariosData.usuario_sap}</span></div>
      <div className="item-data"><strong>Usuario C4C:</strong> <span>{sistemaUsuariosData.usuario_c4c}</span></div>
      <div className="item-data"><strong>RTRWeb:</strong> <span>{sistemaUsuariosData.rtrweb}</span></div>
      <div className="item-data"><strong>S4Hanna:</strong> <span>{sistemaUsuariosData.s4hanna}</span></div>
      <div className="item-data"><strong>Usuario CRM:</strong> <span>{sistemaUsuariosData.usuario_crm}</span></div>
      <div className="item-data"><strong>Código Vendedor:</strong> <span>{sistemaUsuariosData.codigo_vendedor}</span></div>
      <div className="item-data"><strong>Usuario UContact:</strong> <span>{sistemaUsuariosData.usuario_ucontact}</span></div>
      <div className="item-data"><strong>Agent Genesys:</strong> <span>{sistemaUsuariosData.agent_genesys}</span></div>
      <div className="item-data"><strong>Usuario Confronta:</strong> <span>{sistemaUsuariosData.usuario_confronta}</span></div>
    </>
  );
};
