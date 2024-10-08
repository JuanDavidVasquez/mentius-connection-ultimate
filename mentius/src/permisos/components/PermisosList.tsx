import React from 'react';
import { TableGeneral } from '../../utils/tables/TableGeneral';
import { useDispatch, useSelector } from 'react-redux';


// Definir la interfaz para los permisos
interface Permission {
  name: string;
  description: string;
}

export const PermisosList = () => {
  const headers = ['name', 'description'];

  const dispatch = useDispatch();
 
  const permisos = useSelector((state: { permisos: { permisos: Permission[] } }) => state.permisos.permisos); 

  const handleEdit = (item: Permission) => {
    console.log('Edit:', item);
  };

  // Función para manejar la eliminación
  const handleDelete = (item: Permission) => {
    console.log('Delete:', item);
  };

  const renderActions = (item: Permission) => (
    <div>
      <button style={{margin:".5rem"}} className='btn' onClick={() => handleEdit(item)}>Edit</button>
      <button style={{margin:".5rem"}} className='btn cancelar' onClick={() => handleDelete(item)}>Delete</button>
    </div>
  );

  return (
    <div>
      <h1>Permisos List</h1>
      <TableGeneral headers={headers} data={permisos} actions={renderActions} />
    </div>
  );
};
