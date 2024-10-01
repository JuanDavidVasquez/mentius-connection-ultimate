import React, { useState, useEffect } from 'react';

// Definición de la interfaz para los datos de beneficios
interface BeneficiosData {
  fondo_cesantias: string;
  fondo_pensiones: string;
  eps: string;
  caja_compensacion: string;
  ips: string;
  arl: string;
}

// Componente Beneficios que simula la obtención de datos desde una API
export const Beneficios: React.FC = () => {
  const [beneficiosData, setBeneficiosData] = useState<BeneficiosData | null>(null);

  useEffect(() => {
    // Simulación de llamada a una API con datos de beneficios
    const fetchBeneficiosData = async () => {
      const data: BeneficiosData = {
        fondo_cesantias: 'Fondo de Cesantías XYZ',
        fondo_pensiones: 'Fondo de Pensiones ABC',
        eps: 'EPS Salud Total',
        caja_compensacion: 'Caja de Compensación Familiar',
        ips: 'IPS Local',
        arl: 'Seguro de Riesgos Laborales',
      };

      // Simulamos el delay de la API con un timeout
      setTimeout(() => setBeneficiosData(data), 1000);
    };

    fetchBeneficiosData();
  }, []);

  // Renderizamos un mensaje de carga mientras los datos se obtienen
  if (!beneficiosData) {
    return <div>Cargando datos de beneficios...</div>;
  }

  // Renderizado de los datos de beneficios una vez obtenidos
  return (
    <>
      <h2>Beneficios</h2>
      <div className="item-data"><strong>Fondo de Cesantías:</strong> <span>{beneficiosData.fondo_cesantias}</span></div>
      <div className="item-data"><strong>Fondo de Pensiones:</strong> <span>{beneficiosData.fondo_pensiones}</span></div>
      <div className="item-data"><strong>EPS:</strong> <span>{beneficiosData.eps}</span></div>
      <div className="item-data"><strong>Caja de Compensación:</strong> <span>{beneficiosData.caja_compensacion}</span></div>
      <div className="item-data"><strong>IPS:</strong> <span>{beneficiosData.ips}</span></div>
      <div className="item-data"><strong>ARL:</strong> <span>{beneficiosData.arl}</span></div>
    </>
  );
};
