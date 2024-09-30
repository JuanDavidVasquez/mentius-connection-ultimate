import React, { useState, ChangeEvent } from "react";

interface User {
    id: number;
    cedula: string;
    nombre: string;
    apellidos: string;
    cargo: string;
    estado: string;
  }
  
  // Datos simulados de usuarios
  const usersData: User[] = [
    { id: 1, cedula: "123456", nombre: "Juan", apellidos: "Pérez", cargo: "Developer", estado: "Activo" },
    { id: 2, cedula: "654321", nombre: "Ana", apellidos: "Gómez", cargo: "Designer", estado: "Activo" },
    { id: 3, cedula: "789012", nombre: "Carlos", apellidos: "Martínez", cargo: "Manager", estado: "Inactivo" },
    { id: 4, cedula: "345678", nombre: "Luisa", apellidos: "Fernández", cargo: "HR", estado: "Activo" },
  ];

export const UserSearch = () => {
 // Estados para manejar la búsqueda y el usuario seleccionado
 const [searchTerm, setSearchTerm] = useState<string>("");
 const [filteredUsers, setFilteredUsers] = useState<User[]>(usersData);
 const [selectedUser, setSelectedUser] = useState<User | null>(null);

 // Manejar el cambio en el campo de búsqueda
 const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
   const searchValue = e.target.value.toLowerCase();
   setSearchTerm(searchValue);

   // Filtrar usuarios por nombre, apellidos o cédula
   const filtered = usersData.filter((user) =>
     user.nombre.toLowerCase().includes(searchValue) ||
     user.apellidos.toLowerCase().includes(searchValue) ||
     user.cedula.includes(searchValue)
   );
   setFilteredUsers(filtered);
 };

 // Manejar la selección de un usuario de la lista
 const handleSelectUser = (user: User) => {
   setSelectedUser(user);
   setSearchTerm(""); // Limpiar el término de búsqueda
   setFilteredUsers([]); // Ocultar las sugerencias después de la selección
 };

 return (
   <div className="user-search">
    <div>     <h1>Buscador de Usuarios</h1>

     {/* Campo de búsqueda */}
     <input
       type="text"
       placeholder="Buscar por nombre, apellidos o cédula"
       value={searchTerm}
       onChange={handleSearch}
     />
     </div>

<div className="resultUsers">     {/* Lista de resultados filtrados */}
     {searchTerm && (
       <ul className="suggestions">
         {filteredUsers.map((user) => (
           <li key={user.id} onClick={() => handleSelectUser(user)}>
             {user.nombre} {user.apellidos} - {user.cedula}
           </li>
         ))}
         {filteredUsers.length === 0 && <li>No se encontraron resultados</li>}
       </ul>
     )}

     {/* Mostrar información del usuario seleccionado */}
     {selectedUser && (
       <div className="user-details">
         <h2>Información del Usuario</h2>
         <p><strong>Cédula:</strong> {selectedUser.cedula}</p>
         <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
         <p><strong>Apellidos:</strong> {selectedUser.apellidos}</p>
         <p><strong>Cargo:</strong> {selectedUser.cargo}</p>
         <p><strong>Estado:</strong> {selectedUser.estado}</p>
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