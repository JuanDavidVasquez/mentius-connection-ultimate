import { useState, ChangeEvent } from "react";
import "../assets/colaboradoresStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { setPersona } from "../../store/personas/personaSlice";

// Definir la interfaz para los colaboradores
interface Colaborador {
  id_user: number;
  cedula: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  genero: string;
  fecha_nacimiento: string;
  ciudad_nacimiento: string;
  edad: number;
  rango_edad: string;
  estado_civil: string;
  estado_en_la_empresa: string;
}

export const ColaboradoresSearch = () => {
  const colaboradoresData = useSelector(
    (state: any) => state.personas.personas
  );

  const dispatch = useDispatch();

  // Estados para manejar la búsqueda y el colaborador seleccionado
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredColaboradores, setFilteredColaboradores] =
    useState<Colaborador[]>(colaboradoresData);
  const [selectedColaborador, setSelectedColaborador] =
    useState<Colaborador | null>(null);

  // Manejar el cambio en el campo de búsqueda
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filtrar colaboradores por nombre, apellidos o cédula
    const filtered = colaboradoresData.filter(
      (colaborador: Colaborador) =>
        colaborador.primer_nombre.toLowerCase().includes(searchValue) ||
        colaborador.primer_apellido.toLowerCase().includes(searchValue) ||
        colaborador.cedula.includes(searchValue)
    );
    setFilteredColaboradores(filtered);
  };

  // Manejar la selección de un colaborador de la lista
  const handleSelectColaborador = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setSearchTerm(""); // Limpiar el término de búsqueda
    setFilteredColaboradores([]); // Ocultar las sugerencias después de la selección
  };

  const handleEditColaborador = () => {
    if (selectedColaborador) {
      dispatch(setPersona({ persona: { ...selectedColaborador, id: selectedColaborador.id_user } }));
    }
  };

  return (
    <div className="colaboradores-search">
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre, apellidos o cédula"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="resultados">
        {/* Lista de resultados filtrados */}
        {searchTerm && (
          <ul className="suggestions">
            {filteredColaboradores.map((colaborador) => (
              <li
                key={colaborador.id_user}
                onClick={() => handleSelectColaborador(colaborador)}
              >
                {colaborador.primer_nombre} {colaborador.primer_apellido} -{" "}
                {colaborador.cedula}
              </li>
            ))}
            {filteredColaboradores.length === 0 && (
              <li>No se encontraron resultados</li>
            )}
          </ul>
        )}

        {/* Mostrar información del colaborador seleccionado */}
        {selectedColaborador && (
          <div className="colaborador-details">
            <h2>Información del Colaborador</h2>
            <p>
              <strong>Cédula:</strong> {selectedColaborador.cedula}
            </p>
            <p>
              <strong>Nombre:</strong> {selectedColaborador.primer_nombre}{" "}
              {selectedColaborador.segundo_nombre}
            </p>
            <p>
              <strong>Apellidos:</strong> {selectedColaborador.primer_apellido}{" "}
              {selectedColaborador.segundo_apellido}
            </p>
            <p>
              <strong>Género:</strong> {selectedColaborador.genero}
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong>{" "}
              {selectedColaborador.fecha_nacimiento}
            </p>
            <p>
              <strong>Edad:</strong> {selectedColaborador.edad}
            </p>
            <p>
              <strong>Rango de Edad:</strong> {selectedColaborador.rango_edad}
            </p>
            <p>
              <strong>Estado Civil:</strong> {selectedColaborador.estado_civil}
            </p>
            <p>
              <strong>Estado en la Empresa:</strong>{" "}
              {selectedColaborador.estado_en_la_empresa}
            </p>
            <div>
              <button className="btn" onClick={handleEditColaborador}>Edit</button>
              <button className="btn info">
                Traer todos los datos del colaborador
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
