import React, { useState, useEffect } from 'react';

// Definición de la interfaz para los datos de salud
interface SaludData {
  rh: string;
  preexistencias_medicas: string;
  alergias: string;
  medicamentos: string;
  observaciones_medicas: string;
}

// Componente Salud que simula la obtención de datos desde una API
export const Salud: React.FC = () => {
  const [saludData, setSaludData] = useState<SaludData | null>(null);

  useEffect(() => {
    // Simulación de llamada a una API con datos de salud
    const fetchSaludData = async () => {
      const data: SaludData = {
        rh: 'O+',
        preexistencias_medicas: 'Hipertensión',
        alergias: 'Penicilina',
        medicamentos: 'Enalapril',
        observaciones_medicas: 'Requiere chequeos periódicos',
      };

      // Simulamos el delay de la API con un timeout
      setTimeout(() => setSaludData(data), 1000);
    };

    fetchSaludData();
  }, []);

  // Renderizamos un mensaje de carga mientras los datos se obtienen
  if (!saludData) {
    return <div>Cargando datos de salud...</div>;
  }

  // Renderizado de los datos de salud una vez obtenidos
  return (
    <>
      <h2>Datos de Salud</h2>
      <div className="item-data"><strong>RH:</strong> <span>{saludData.rh}</span></div>
      <div className="item-data"><strong>Preexistencias Médicas:</strong> <span>{saludData.preexistencias_medicas}</span></div>
      <div className="item-data"><strong>Alergias:</strong> <span>{saludData.alergias}</span></div>
      <div className="item-data"><strong>Medicamentos:</strong> <span>{saludData.medicamentos}</span></div>
      <div className="item-data"><strong>Observaciones Médicas:</strong> <span>{saludData.observaciones_medicas}</span></div>
    </>
  );
};
