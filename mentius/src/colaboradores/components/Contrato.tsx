import React, { useState, useEffect } from 'react';

// Definición de la interfaz para los datos del contrato
interface ContratoData {
  tipo_contrato: string;
  modalidad: string;
  fecha_novedad: string;
  novedad: string;
}

// Componente Contrato que simula la obtención de datos desde una API
export const Contrato: React.FC = () => {
  const [contratoData, setContratoData] = useState<ContratoData | null>(null);

  useEffect(() => {
    // Simulación de llamada a una API con datos
    const fetchContratoData = async () => {
      const data: ContratoData = {
        tipo_contrato: 'Indefinido',
        modalidad: 'Presencial',
        fecha_novedad: '2024-09-15',
        novedad: 'Cambio de horario',
      };

      // Simulamos el delay de la API con un timeout
      setTimeout(() => setContratoData(data), 1000);
    };

    fetchContratoData();
  }, []);

  // Renderizamos un mensaje de carga mientras los datos se obtienen
  if (!contratoData) {
    return <div>Cargando datos del contrato...</div>;
  }

  // Renderizado de los datos del contrato una vez obtenidos
  return (
    <>
      <h2>Datos del Contrato</h2>
      <div className="item-data"><strong>Tipo de Contrato:</strong> <span>{contratoData.tipo_contrato}</span></div>
      <div className="item-data"><strong>Modalidad:</strong> <span>{contratoData.modalidad}</span></div>
      <div className="item-data"><strong>Fecha de Novedad:</strong> <span>{contratoData.fecha_novedad}</span></div>
      <div className="item-data"><strong>Novedad:</strong> <span>{contratoData.novedad}</span></div>
    </>
  );
};
