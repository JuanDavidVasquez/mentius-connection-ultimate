import React, { useState } from 'react';
import { Beneficios } from "./Beneficios";
import { ContactoEmergencias } from "./ContactoEmergencias";
import { Contrato } from "./Contrato";
import { Documentos } from "./Documentos";
import { Educacion } from "./Educacion";
import { Laboral } from "./Laboral";
import { Personal } from "./Personal";
import { Salud } from "./Salud";
import { SistemaUsuarios } from "./SistemaUsuarios";

const components = [
  { name: 'Personal', component: <Personal /> },
  { name: 'Documentos', component: <Documentos /> },
  { name: 'Contrato', component: <Contrato /> },
  { name: 'Laboral', component: <Laboral /> },
  { name: 'Sistema Usuarios', component: <SistemaUsuarios /> },
  { name: 'Educacion', component: <Educacion /> },
  { name: 'Contacto Emergencias', component: <ContactoEmergencias /> },
  { name: 'Salud', component: <Salud /> },
  { name: 'Beneficios', component: <Beneficios /> },
];

export const MyPersonalData = () => {
  const [activeComponent, setActiveComponent] = useState<string>('Personal');

  // Función para renderizar el componente activo
  const renderComponent = () => {
    const active = components.find(comp => comp.name === activeComponent);
    return active ? active.component : <Personal />;
  };

  return (
    <div className="myPersonalData-main">
      <div className="menu-data-personal">
        {components.map(comp => (
          <button 
            key={comp.name} 
            onClick={() => setActiveComponent(comp.name)}
            className={activeComponent === comp.name ? 'active' : ''} 
          >
            {comp.name}
          </button>
        ))}
      </div>
      <div className="personal-data">
        {renderComponent()}
      </div>
    </div>
  );
};
