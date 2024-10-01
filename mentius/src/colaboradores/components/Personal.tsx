import React, { useState, useEffect } from 'react';

// Definición de la interfaz para los datos personales
interface PersonalData {
  id_user: number;
  cedula: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  genero: string;
  fecha_nacimiento: string;
  ciudad_nacimiento: string;
  edad: number;
  rango_edad: string;
  estado_civil: string;
  estado_en_la_empresa: string;
}

// Componente Personal que simula la obtención de datos desde una API
export const Personal: React.FC = () => {
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);

  useEffect(() => {
    // Simulación de llamada a una API con datos
    const fetchPersonalData = async () => {
      const data: PersonalData = {
        id_user: 1,
        cedula: '123456789',
        primer_nombre: 'Juan',
        segundo_nombre: 'David',
        primer_apellido: 'Vásquez',
        segundo_apellido: 'Pérez',
        genero: 'Masculino',
        fecha_nacimiento: '1988-01-24',
        ciudad_nacimiento: 'Medellín',
        edad: 36,
        rango_edad: '30-40',
        estado_civil: 'Casado',
        estado_en_la_empresa: 'Activo',
      };
      
      // Simulamos el delay de la API con un timeout
      setTimeout(() => setPersonalData(data), 1000);
    };

    fetchPersonalData();
  }, []);

  // Renderizamos un mensaje de carga mientras los datos se obtienen
  if (!personalData) {
    return <div>Cargando datos...</div>;
  }

  // Renderizado de los datos personales una vez obtenidos
  return (
    <>
      <h2>Datos Personales</h2>
      <div className="item-data"><strong>ID Usuario:</strong> <span>{personalData.id_user}</span></div>
      <div className="item-data"><strong>Cédula:</strong> <span>{personalData.cedula}</span></div>
      <div className="item-data"><strong>Primer Nombre:</strong> <span>{personalData.primer_nombre}</span></div>
      <div className="item-data"><strong>Segundo Nombre:</strong> <span>{personalData.segundo_nombre}</span></div>
      <div className="item-data"><strong>Primer Apellido:</strong> <span>{personalData.primer_apellido}</span></div>
      <div className="item-data"><strong>Segundo Apellido:</strong> <span>{personalData.segundo_apellido}</span></div>
      <div className="item-data"><strong>Género:</strong> <span>{personalData.genero}</span></div>
      <div className="item-data"><strong>Fecha de Nacimiento:</strong> <span>{personalData.fecha_nacimiento}</span></div>
      <div className="item-data"><strong>Ciudad de Nacimiento:</strong> <span>{personalData.ciudad_nacimiento}</span></div>
      <div className="item-data"><strong>Edad:</strong> <span>{personalData.edad}</span></div>
      <div className="item-data"><strong>Rango de Edad:</strong> <span>{personalData.rango_edad}</span></div>
      <div className="item-data"><strong>Estado Civil:</strong> <span>{personalData.estado_civil}</span></div>
      <div className="item-data"><strong>Estado en la Empresa:</strong> <span>{personalData.estado_en_la_empresa}</span></div>
    </>
  );
};
