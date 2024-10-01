import { useState, ChangeEvent } from "react";
import '../assets/colaboradoresStyles.css'

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

// Datos simulados de colaboradores
const colaboradoresData: Colaborador[] = [
  {
    id_user: 1,
    cedula: "123456",
    primer_nombre: "Juan",
    segundo_nombre: "David",
    primer_apellido: "Vasquez",
    segundo_apellido: "Lopez",
    genero: "Masculino",
    fecha_nacimiento: "1988-05-15",
    ciudad_nacimiento: "Bogotá",
    edad: 36,
    rango_edad: "35-40",
    estado_civil: "Casado",
    estado_en_la_empresa: "Activo",
  },
  {
    id_user: 2,
    cedula: "654321",
    primer_nombre: "Ana",
    segundo_nombre: "María",
    primer_apellido: "Gómez",
    segundo_apellido: "Fernández",
    genero: "Femenino",
    fecha_nacimiento: "1992-03-10",
    ciudad_nacimiento: "Medellín",
    edad: 31,
    rango_edad: "30-35",
    estado_civil: "Soltera",
    estado_en_la_empresa: "Activo",
  },
  {
    id_user: 3,
    cedula: "789012",
    primer_nombre: "Carlos",
    segundo_nombre: "Andrés",
    primer_apellido: "Martínez",
    segundo_apellido: "Hernández",
    genero: "Masculino",
    fecha_nacimiento: "1980-11-25",
    ciudad_nacimiento: "Cali",
    edad: 43,
    rango_edad: "40-45",
    estado_civil: "Divorciado",
    estado_en_la_empresa: "Inactivo",
  },
  {
    id_user: 4,
    cedula: "345678",
    primer_nombre: "Luisa",
    segundo_nombre: "Fernanda",
    primer_apellido: "Fernández",
    segundo_apellido: "García",
    genero: "Femenino",
    fecha_nacimiento: "1995-07-22",
    ciudad_nacimiento: "Barranquilla",
    edad: 29,
    rango_edad: "25-30",
    estado_civil: "Casada",
    estado_en_la_empresa: "Activo",
  },
];

export const ColaboradoresSearch = () => {
  // Estados para manejar la búsqueda y el colaborador seleccionado
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredColaboradores, setFilteredColaboradores] = useState<Colaborador[]>(colaboradoresData);
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);

  // Manejar el cambio en el campo de búsqueda
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filtrar colaboradores por nombre, apellidos o cédula
    const filtered = colaboradoresData.filter((colaborador) =>
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

  return (
    <div className="colaboradores-search">
          {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre, apellidos o cédula"
        value={searchTerm}
        onChange={handleSearch}
      />
<div className="resultados">
      {/* Lista de resultados filtrados */}
      {searchTerm && (
        <ul className="suggestions">
          {filteredColaboradores.map((colaborador) => (
            <li key={colaborador.id_user} onClick={() => handleSelectColaborador(colaborador)}>
              {colaborador.primer_nombre} {colaborador.primer_apellido} - {colaborador.cedula}
            </li>
          ))}
          {filteredColaboradores.length === 0 && <li>No se encontraron resultados</li>}
        </ul>
      )}

      {/* Mostrar información del colaborador seleccionado */}
      {selectedColaborador && (
        <div className="colaborador-details">
          <h2>Información del Colaborador</h2>
          <p><strong>Cédula:</strong> {selectedColaborador.cedula}</p>
          <p><strong>Nombre:</strong> {selectedColaborador.primer_nombre} {selectedColaborador.segundo_nombre}</p>
          <p><strong>Apellidos:</strong> {selectedColaborador.primer_apellido} {selectedColaborador.segundo_apellido}</p>
          <p><strong>Género:</strong> {selectedColaborador.genero}</p>
          <p><strong>Fecha de Nacimiento:</strong> {selectedColaborador.fecha_nacimiento}</p>
          <p><strong>Edad:</strong> {selectedColaborador.edad}</p>
          <p><strong>Rango de Edad:</strong> {selectedColaborador.rango_edad}</p>
          <p><strong>Estado Civil:</strong> {selectedColaborador.estado_civil}</p>
          <p><strong>Estado en la Empresa:</strong> {selectedColaborador.estado_en_la_empresa}</p>
          <div>
            <button className="btn">Edit</button>
            <button className="btn info">Traer todos los datos del colaborador</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
