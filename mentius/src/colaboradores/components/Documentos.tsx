import React, { useState, useEffect } from 'react';

// Definición de la interfaz para los datos de documentos
interface DocumentosData {
  tipo_documento: string;
  fecha_expedicion: string;
  ciudad_expedicion: string;
}

// Componente Documentos que simula la obtención de datos desde una API
export const Documentos: React.FC = () => {
  const [documentosData, setDocumentosData] = useState<DocumentosData | null>(null);

  useEffect(() => {
    // Simulación de llamada a una API con datos de documentos
    const fetchDocumentosData = async () => {
      const data: DocumentosData = {
        tipo_documento: 'Cédula de Ciudadanía',
        fecha_expedicion: '10-05-2010',
        ciudad_expedicion: 'Bogotá, Colombia',
      };

      // Simulamos el delay de la API con un timeout
      setTimeout(() => setDocumentosData(data), 1000);
    };

    fetchDocumentosData();
  }, []);

  // Renderizamos un mensaje de carga mientras los datos se obtienen
  if (!documentosData) {
    return <div>Cargando datos de documentos...</div>;
  }

  // Renderizado de los datos de documentos una vez obtenidos
  return (
    <>
      <h2>Tipo de Documento</h2>
      <div className="item-data"><strong>Tipo de Documento:</strong> <span>{documentosData.tipo_documento}</span></div>
      <div className="item-data"><strong>Fecha de Expedición:</strong> <span>{documentosData.fecha_expedicion}</span></div>
      <div className="item-data"><strong>Ciudad de Expedición:</strong> <span>{documentosData.ciudad_expedicion}</span></div>
    </>
  );
};
