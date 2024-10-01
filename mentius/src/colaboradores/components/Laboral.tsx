import React, { useState, useEffect } from 'react';

// Definición de la interfaz para los datos laborales
interface LaboralData {
  id_cargo: string;
  supervisor: string;
  fecha_ingreso: string;
  fecha_retiro: string | null;  // Fecha de retiro puede ser null si aún está activo
  motivo_retiro: string | null; // Motivo del retiro puede ser null si aún está activo
  sede_trabajo: string;
}

// Componente Laboral que simula la obtención de datos desde una API
export const Laboral: React.FC = () => {
  const [laboralData, setLaboralData] = useState<LaboralData | null>(null);

  useEffect(() => {
    // Simulación de llamada a una API con datos laborales
    const fetchLaboralData = async () => {
      const data: LaboralData = {
        id_cargo: 'Software Developer',
        supervisor: 'Laura Ramírez',
        fecha_ingreso: '2020-03-01',
        fecha_retiro: null, // Actualmente activo, por lo que no tiene fecha de retiro
        motivo_retiro: null, // Sin motivo de retiro si está activo
        sede_trabajo: 'Sede Principal - Bogotá',
      };

      // Simulamos el delay de la API con un timeout
      setTimeout(() => setLaboralData(data), 1000);
    };

    fetchLaboralData();
  }, []);

  // Renderizamos un mensaje de carga mientras los datos se obtienen
  if (!laboralData) {
    return <div>Cargando datos laborales...</div>;
  }

  // Renderizado de los datos laborales una vez obtenidos
  return (
    <>
      <h2>Datos Laborales</h2>
      <div className="item-data"><strong>Cargo:</strong> <span>{laboralData.id_cargo}</span></div>
      <div className="item-data"><strong>Supervisor:</strong> <span>{laboralData.supervisor}</span></div>
      <div className="item-data"><strong>Fecha de Ingreso:</strong> <span>{laboralData.fecha_ingreso}</span></div>
      <div className="item-data"><strong>Fecha de Retiro:</strong> <span>{laboralData.fecha_retiro ? laboralData.fecha_retiro : 'Actualmente activo'}</span></div>
      <div className="item-data"><strong>Motivo de Retiro:</strong> <span>{laboralData.motivo_retiro ? laboralData.motivo_retiro : 'N/A'}</span></div>
      <div className="item-data"><strong>Sede de Trabajo:</strong> <span>{laboralData.sede_trabajo}</span></div>
    </>
  );
};
