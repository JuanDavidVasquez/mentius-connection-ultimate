import { AsistenciaImports } from "../components/AsistenciaImports";
import "../assets/stylesAsistencia.css";
import { useState, useRef } from "react";
import { animateOpenClose } from "../../utils/animations/animationOpenClose";

const Asistencia = () => {
  const [importContainers, setImportContainers] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null); // Crear un ref para el contenedor

  const toggleImportContainers = () => {
    animateOpenClose(containerRef.current, setImportContainers, importContainers);
  };

  return (
    <>
      <h1>Asistencia</h1>
      <button onClick={toggleImportContainers} className="btn info btn-imports">
        Importar contenedores
      </button>
      <div
        className="container-imports-asistencia"
        ref={containerRef}
        style={{ display: importContainers ? "block" : "none", opacity: 0 }} // Mantiene el contenedor en el DOM pero oculto
      >
        <AsistenciaImports />
      </div>
    </>
  );
};

export default Asistencia;
