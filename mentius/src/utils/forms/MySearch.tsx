import { useState, useEffect } from "react";

// Define las props del componente
interface MySearchProps<T> {
  data: T[]; // Array genérico de datos
  filterFields: (keyof T)[]; // Array de campos a filtrar (debe coincidir con las llaves de los objetos de datos)
  onItemSelect?: (item: T) => void; // Callback opcional para cuando se selecciona un ítem
}

export const MySearch = <T extends {}>({ data, filterFields, onItemSelect }: MySearchProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filtrar los datos según el término de búsqueda y los campos proporcionados
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredResults = Array.isArray(data)
        ? data.filter((item) =>
            filterFields.some((field) =>
              String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
        : []; // Si data no es un array, no filtramos
      setFilteredData(filteredResults);
      setShowDropdown(filteredResults.length > 0); // Solo muestra el dropdown si hay resultados
    } else {
      setFilteredData([]);
      setShowDropdown(false);
    }
  }, [searchTerm, data, filterFields]);

  // Manejar la selección de un elemento del dropdown
  const handleSelect = (item: T) => {
    if (onItemSelect) onItemSelect(item); // Ejecuta el callback si está definido
    setSearchTerm(String(item[filterFields[0]])); // Actualiza el input con el primer campo de filtro
    setShowDropdown(false); // Cierra el dropdown
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar..."
        className="search-input"
      />
      {showDropdown && (
        <ul className="dropdown-list">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="dropdown-item"
              >
                {/* Mostrar el valor de todos los campos filtrados */}
                {filterFields.map((field) => (
                  <span key={field.toString()}>{String(item[field])} </span>
                ))}
              </li>
            ))
          ) : (
            <li className="dropdown-item">No hay resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};
