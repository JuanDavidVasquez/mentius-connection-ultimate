import React, { useState, useEffect } from 'react';

// Definición de la interfaz para los datos de educación
interface EducacionData {
  nivel_educativo: string;
  titulo: string;
  institucion: string;
}

// Componente Educacion que simula la obtención de datos desde una API
export const Educacion: React.FC = () => {
  const [educacionData, setEducacionData] = useState<EducacionData | null>(null);

  useEffect(() => {
    // Simulación de llamada a una API con datos de educación
    const fetchEducacionData = async () => {
      const data: EducacionData = {
        nivel_educativo: 'Universitario',
        titulo: 'Ingeniero de Software',
        institucion: 'Universidad Nacional',
      };

      // Simulamos el delay de la API con un timeout
      setTimeout(() => setEducacionData(data), 1000);
    };

    fetchEducacionData();
  }, []);

  // Renderizamos un mensaje de carga mientras los datos se obtienen
  if (!educacionData) {
    return <div>Cargando datos de educación...</div>;
  }

  // Renderizado de los datos de educación una vez obtenidos
  return (
    <>
      <h2>Datos de Educación</h2>
      <div className="item-data"><strong>Nivel Educativo:</strong> <span>{educacionData.nivel_educativo}</span></div>
      <div className="item-data"><strong>Título:</strong> <span>{educacionData.titulo}</span></div>
      <div className="item-data"><strong>Institución:</strong> <span>{educacionData.institucion}</span></div>
    </>
  );
};
