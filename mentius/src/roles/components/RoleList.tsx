import { useState } from "react";
import { RoleDelete } from "./RoleDelete";
import RoleEdit from "./RoleEdit";

const roles = [
  { id: 1, name: "Admin", description: "Administrator with full access" },
  { id: 2, name: "Editor", description: "Can edit content" },
  { id: 3, name: "Viewer", description: "Can view content only" },
  { id: 4, name: "Manager", description: "Can manage users and content" },
];

export const RoleList = () => {
  const [activeModalDelete, setActiveModalDelete] = useState(false);
  const [activeModalEdit, setActiveModalEdit] = useState(false);

  // Función para manejar la confirmación de eliminación
  const handleConfirmDelete = () => {
    console.log("Role deleted!");
    setActiveModalDelete(false);
  };
  const handleEditRole = () => {
    console.log("Role edited!");
    setActiveModalEdit(false);
  };

  return (
    <div className="role-list">
      <h2>Role List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td style={{ margin: "0px 10px" }}>
                <button 
                  style={{ margin: "0px 10px" }} 
                  className="btn edit"
                  onClick={() => setActiveModalEdit(true)}
                  >
                  Edit
                </button>
                <button
                  style={{ margin: "0px 10px" }}
                  className="btn cancelar"
                  onClick={() => setActiveModalDelete(true)}
                >
                  Delete Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {activeModalDelete && (
        <RoleDelete
          activeModalDelete={activeModalDelete}
          onClose={() => setActiveModalDelete(false)}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
      {activeModalEdit && (
        <RoleEdit
          activeModalEdit={activeModalEdit}
          onClose={() => setActiveModalEdit(false)}
          onConfirmEdit={handleEditRole}
        />
      )}
    </div>
  );
};
