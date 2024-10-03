import { AsistenciaImports } from "../components/AsistenciaImports";
import "../assets/stylesAsistencia.css";
import { useState, useRef } from "react";
import { animateOpenClose } from "../../utils/animations/animationOpenClose";
import { AsistenciaGenerar } from "../components/AsistenciaGenerar";
import { AsistenciaResultado } from "../components/AsistenciaResultado";

const Asistencia = () => {
  const [importContainers, setImportContainers] = useState(false);
  const [generateContainers, setGenerateContainers] = useState(false);
  const containerImportsRef = useRef<HTMLDivElement>(null); // Ref para importaciones
  const containerGenerarRef = useRef<HTMLDivElement>(null); // Ref para generación

  const toggleImports = () => {
    if (generateContainers) {
      animateOpenClose(containerGenerarRef.current, setGenerateContainers, generateContainers);
    }
    animateOpenClose(containerImportsRef.current, setImportContainers, importContainers);
  };

  const toggleGenerar = () => {
    if (importContainers) {
      animateOpenClose(containerImportsRef.current, setImportContainers, importContainers);
    }
    animateOpenClose(containerGenerarRef.current, setGenerateContainers, generateContainers);
  };

  return (
    <>
      <h1>Asistencia</h1>
      <div className="container-buttons">
        <button
          onClick={toggleImports}
          className="btn info btn-imports"
        >
          Importar contenedores
        </button>
        <button
          onClick={toggleGenerar}
          className="btn info btn-imports"
        >
          Generar Asistencia
        </button>
      </div>

      <div
        className="container-imports-asistencia"
        ref={containerImportsRef}
        style={{ display: importContainers ? "block" : "none", opacity: 0 }} // Ocultar/mostrar
      >
        <AsistenciaImports />
      </div>

      <div
        className="container-asistencia"
        ref={containerGenerarRef}
        style={{ display: generateContainers ? "block" : "none", opacity: 0 }} // Ocultar/mostrar
      >
        <AsistenciaGenerar />
      </div>

      <div className="resultado-asistencia">
        <AsistenciaResultado />
      </div>
    </>
  );
};

export default Asistencia;
