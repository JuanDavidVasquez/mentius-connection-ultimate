import { useEffect, useState } from "react";
import { RoleDelete } from "./RoleDelete";
import RoleEdit from "./RoleEdit";
import { useDispatch, useSelector } from "react-redux";
import { selectedRole } from "../../store/roles/roleSlice"; 
import { getRoles } from "../../store/roles/thunk";


export const RoleList = () => {
  const [activeModalDelete, setActiveModalDelete] = useState(false);
  const [activeModalEdit, setActiveModalEdit] = useState(false);
  
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roles); 
  const roleSelect = useSelector((state) => state.roles.role); 

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const handleConfirmDelete = (role) => {
    dispatch(selectedRole({ role })); 
    setActiveModalDelete(true);
  };

  const handleEditRole = () => {
    setActiveModalEdit(false);
  };

  const handleRoleSelect = (role) => {
    dispatch(selectedRole({ role })); 
    setActiveModalEdit(true); 
  };

  const confirmarAction = (message) => {
    console.log(message);
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
          {roles && roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td style={{ margin: "0px 10px" }}>
                  <button
                    style={{ margin: "0px 10px" }}
                    className="btn edit"
                    onClick={() => handleRoleSelect(role)} 
                  >
                    Edit
                  </button>
                  <button
                    style={{ margin: "0px 10px" }}
                    className="btn cancelar"
                    onClick={() => {
                      handleConfirmDelete(role);
                    }}
                  >
                    Delete Role
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No roles found.</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {activeModalDelete && (
        <RoleDelete
          activeModalDelete={activeModalDelete}
          onClose={() => setActiveModalDelete(false)}
          onConfirmDelete={handleConfirmDelete}
          confirmarAction={confirmarAction} 
        />
      )}
      
      {activeModalEdit && roleSelect && (
        <RoleEdit
          activeModalEdit={activeModalEdit}         
          onClose={() => setActiveModalEdit(false)}
          onConfirmEdit={handleEditRole}
        />
      )}
    </div>
  );
};
