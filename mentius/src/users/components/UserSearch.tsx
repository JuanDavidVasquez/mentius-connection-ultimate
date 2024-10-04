import { useState, ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

interface User {
  id: number;
  user_name: string;
  name: string;
  role: string;
}

const selectedUserAction = (user: User) => ({
  type: 'users/selectedUser', 
  payload: { user }
});

export const UserSearch = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);
  const [usersData, setUsersData] = useState<User[]>(users || []);

  useEffect(() => {
    setUsersData(users || []); // Asegúrate de que no sea undefined
  }, [users]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(usersData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Manejar el cambio en el campo de búsqueda
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filtrar usuarios por name, role o cédula
    const filtered = usersData.filter((user: User) =>
      (user.role && user.role.toLowerCase().includes(searchValue)) ||
      (user.user_name && user.user_name.toLowerCase().includes(searchValue))
    );
    setFilteredUsers(filtered);
  };

  // Manejar la selección de un usuario de la lista
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSearchTerm(""); // Limpiar el término de búsqueda
    setFilteredUsers([]); // Ocultar las sugerencias después de la selección
  };

  // Manejar el clic en el botón "Edit"
  const handleEditUser = () => {
    if (selectedUser) {
      dispatch(selectedUserAction(selectedUser)); // Despachar la acción con el usuario seleccionado
    }
  };

  return (
    <div className="user-search">
      <div>
        <h1>Buscador de Usuarios</h1>

        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por user name, role"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="resultUsers">
        {/* Lista de resultados filtrados */}
        {searchTerm && (
          <ul className="suggestions">
            {filteredUsers.map((user) => (
              <li key={user.id} onClick={() => handleSelectUser(user)}>
                {user.role} - {user.user_name}
              </li>
            ))}
            {filteredUsers.length === 0 && <li>No se encontraron resultados</li>}
          </ul>
        )}

        {/* Mostrar información del usuario seleccionado */}
        {selectedUser && (
          <div className="user-details">
            <h2>Información del Usuario</h2>
            <p><strong>User Name:</strong> {selectedUser.user_name}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <div>
              <button className="btn" onClick={handleEditUser}>Edit</button>
              <button className="btn info">Traer todos los datos del colaborador</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
