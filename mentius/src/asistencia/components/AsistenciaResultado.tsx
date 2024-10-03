import React from 'react';
import asistenciaData from '../utils/asistenciaConsolidado.json';


interface Asistencia {
  cedula: string;
  nombreCompleto: string;
  cargo: string;
  modalidad: string;
  supervisor: string;
  gestor: string;
  genesys: string;
  ucontact: string;
  biometrico: string;
  asistenciaFinal: string;
  alertas?: string;
}

export const AsistenciaResultado: React.FC = () => {
  return (
    <div className="table-container">
      <h1>Asistencia Resultado</h1>
      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre Completo</th>
            <th>Cargo</th>
            <th>Modalidad</th>
            <th>Supervisor</th>
            <th>Genesys</th>
            <th>Ucontact</th>
            <th>Biometrico</th>
            <th>Asistencia Final</th>
            <th>Alertas</th>
          </tr>
        </thead>
        <tbody>
          {asistenciaData.map((asistencia: Asistencia, index) => {
            return (
              <tr key={index}>
                <td>{asistencia.cedula}</td>
                <td>{asistencia.nombreCompleto}</td>
                <td>{asistencia.cargo}</td>
                <td>{asistencia.modalidad}</td>
                <td>{asistencia.supervisor}</td>
                <td>{asistencia.genesys}</td>
                <td>{asistencia.ucontact}</td>
                <td>{asistencia.biometrico}</td>
                <td>{asistencia.asistenciaFinal}</td>
                <td>{asistencia.alertas}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
