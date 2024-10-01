import React, { useState, useEffect } from 'react';

// Definición de la interfaz para los datos de contacto de emergencias
interface ContactoEmergenciasData {
  nombre_contacto: string;
  direccion_contacto: string;
  parentesco: string;
  telefono_fijo: string;
  numero_celular: string;
}

// Componente ContactoEmergencias que simula la obtención de datos desde una API
export const ContactoEmergencias: React.FC = () => {
  const [contactoEmergenciasData, setContactoEmergenciasData] = useState<ContactoEmergenciasData | null>(null);

  useEffect(() => {
    // Simulación de llamada a una API con datos de contacto de emergencias
    const fetchContactoEmergenciasData = async () => {
      const data: ContactoEmergenciasData = {
        nombre_contacto: 'Henry Vásquez',
        direccion_contacto: 'Calle 123 #45-67, Sao Paulo, Brasil',
        parentesco: 'Padre',
        telefono_fijo: '123456789',
        numero_celular: '987654321',
      };

      // Simulamos el delay de la API con un timeout
      setTimeout(() => setContactoEmergenciasData(data), 1000);
    };

    fetchContactoEmergenciasData();
  }, []);

  // Renderizamos un mensaje de carga mientras los datos se obtienen
  if (!contactoEmergenciasData) {
    return <div>Cargando datos de contacto de emergencias...</div>;
  }

  // Renderizado de los datos de contacto de emergencias una vez obtenidos
  return (
    <>
      <h2>Contacto de Emergencias</h2>
      <div className="item-data"><strong>Nombre Contacto:</strong> <span>{contactoEmergenciasData.nombre_contacto}</span></div>
      <div className="item-data"><strong>Dirección Contacto:</strong> <span>{contactoEmergenciasData.direccion_contacto}</span></div>
      <div className="item-data"><strong>Parentesco:</strong> <span>{contactoEmergenciasData.parentesco}</span></div>
      <div className="item-data"><strong>Teléfono Fijo:</strong> <span>{contactoEmergenciasData.telefono_fijo}</span></div>
      <div className="item-data"><strong>Número Celular:</strong> <span>{contactoEmergenciasData.numero_celular}</span></div>
    </>
  );
};
