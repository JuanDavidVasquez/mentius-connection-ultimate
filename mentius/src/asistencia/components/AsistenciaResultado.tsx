import React from 'react';
import asistenciaData from '../utils/asistenciaConsolidado.json';
import { generarAlertas } from '../utils/alerta';

interface Asistencia {
  cedula: string;
  nombre: string;
  cargo: string;
  modalidad: string;
  supervisor: string;
  sede: string;
  ingresoGestor: string;
  ingresoTorniquete: string;
  desconexionGestor: string;
  ingresoBiometrico: string;
  asistenciaFinal: string;
  horasBiometrico: number; // Asegúrate de que este campo esté presente en tu JSON
  novedad?: string; // Propiedad opcional
  horaIngresots?: string; // Propiedad opcional
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
            <th>Sede</th>
            <th>Ingreso Gestor</th>
            <th>Ingreso Torniquete</th>
            <th>Desconexión Gestor</th>
            <th>Ingreso Biometrico</th>
            <th>Asistencia Final</th>
            <th>Alertas</th>
          </tr>
        </thead>
        <tbody>
          {asistenciaData.map((asistencia: Asistencia, index: number) => {
            const alertas = generarAlertas(asistencia, '08:00'); // Hora programada de ejemplo
            return (
              <tr key={index}>
                <td>{asistencia.cedula}</td>
                <td>{asistencia.nombre}</td>
                <td>{asistencia.cargo}</td>
                <td>{asistencia.modalidad}</td>
                <td>{asistencia.supervisor}</td>
                <td>{asistencia.sede}</td>
                <td>{asistencia.ingresoGestor}</td>
                <td>{asistencia.ingresoTorniquete}</td>
                <td>{asistencia.desconexionGestor}</td>
                <td>{asistencia.ingresoBiometrico}</td>
                <td>{asistencia.asistenciaFinal}</td>
                <td>{alertas.join(', ')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
