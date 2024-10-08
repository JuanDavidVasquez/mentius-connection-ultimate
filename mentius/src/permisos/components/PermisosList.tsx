import React, { useState } from 'react';
import { TableGeneral } from '../../utils/tables/TableGeneral';
import { useDispatch, useSelector } from 'react-redux';
import { PermisosEdit } from './PermisosEdit';
import { PermisoDelete } from './PermisoDelete'; // Importa el nuevo componente

interface Permission {
  id: string;
  name: string;
  description: string;
}

export const PermisosList = () => {
  const headers = ['name', 'description'];
  const dispatch = useDispatch();
  
  const permisos = useSelector((state: { permisos: { permisos: Permission[] } }) => state.permisos.permisos); 

  const [activeModalCreate, setActiveModalCreate] = useState(false); // Estado para controlar el modal de edición
  const [activeModalDelete, setActiveModalDelete] = useState(false); // Estado para controlar el modal de eliminación
  const [selectedPermiso, setSelectedPermiso] = useState<Permission | null>(null); // Estado para el permiso seleccionado

  // Manejo de edición
  const handleEdit = (item: Permission) => {
    setSelectedPermiso(item);  // Selecciona el permiso a editar
    setActiveModalCreate(true); // Activa el modal de edición
  };

  // Manejo de eliminación
  const handleDelete = (item: Permission) => {
    setSelectedPermiso(item);  // Selecciona el permiso a eliminar
    setActiveModalDelete(true); // Activa el modal de eliminación
  };

  const handleCloseModal = () => {
    setActiveModalCreate(false); // Cierra el modal de edición
    setSelectedPermiso(null);    // Limpia el permiso seleccionado
  };

  const handleCloseDeleteModal = () => {
    setActiveModalDelete(false); // Cierra el modal de eliminación
    setSelectedPermiso(null);    // Limpia el permiso seleccionado
  };

  const handleDeleteConfirm = () => {
    if (selectedPermiso) {
      console.log('Deleting:', selectedPermiso);
      // Aquí puedes implementar la lógica de eliminación, como una llamada a la API o actualización del estado
      dispatch({ type: 'DELETE_PERMISSION', payload: selectedPermiso.id });
      handleCloseDeleteModal(); // Cierra el modal tras eliminar
    }
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
      
      {/* Modal para editar permiso */}
      <PermisosEdit
        activeModalCreate={activeModalCreate}
        onClose={handleCloseModal}
        permiso={selectedPermiso} 
      />

      {/* Modal para eliminar permiso */}
      <PermisoDelete
        activeModalDelete={activeModalDelete}
        onClose={handleCloseDeleteModal}
        permiso={selectedPermiso}
        onDeleteConfirm={handleDeleteConfirm} 
      />
    </div>
  );
};
