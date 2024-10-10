import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { MyCheckbox } from "../../utils/forms";
import { createNewPermisoRole } from "../../store/permisosRole/thunk";
import { toastActive } from "../../store/hooks/toastSlice";

interface Role {
  id: number;
  name: string;
}

interface Permiso {
  id: number;
  name: string;
}

interface PermisoRole {
  id: number;
  role_id: number;
  permisos_id: number;
}

export const PermisoRoleCreate: React.FC = () => {
  const roles = useSelector((state: { roles: { roles: Role[] } }) => state.roles.roles);
  const permisos = useSelector((state: { permisos: { permisos: Permiso[] } }) => state.permisos.permisos);
  const permisosRoles = useSelector((state: { permisosRole: { permisoRole: PermisoRole[] } }) => state.permisosRole.permisoRole);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedPermisos, setSelectedPermisos] = useState<number[]>([]);
  
  const dispatch = useDispatch();

  const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getPermisosForRole = (roleId: number) => {
    const permisosAsociados = permisosRoles
      .filter((permisoRole) => permisoRole.role_id === roleId)
      .map((permisoRole) => {
        return permisos.find((permiso) => permiso.id === permisoRole.permisos_id);
      });

    return permisosAsociados.filter((permiso): permiso is Permiso => !!permiso);
  };

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role);
    setSearchTerm(role.name);
    setShowDropdown(false);
    
    // Cargar los permisos asociados al rol seleccionado
    const permisosAsociados = getPermisosForRole(role.id);
    setSelectedPermisos(permisosAsociados.map(permiso => permiso.id)); // Asignar permisos asociados al estado
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  // Manejar el cambio en los checkboxes
  const handleCheckboxChange = (permisoId: number) => {
    setSelectedPermisos((prevSelected) => {
      if (prevSelected.includes(permisoId)) {
        // Si el permiso ya está seleccionado, lo quitamos
        return prevSelected.filter((id) => id !== permisoId);
      } else {
        // Si el permiso no está seleccionado, lo agregamos
        return [...prevSelected, permisoId];
      }
    });
  };

  const handleMoveToSelected = (permisoId: number) => {
    if (!selectedPermisos.includes(permisoId)) {
      setSelectedPermisos((prevSelected) => [...prevSelected, permisoId]);
    }
  };

  const handleMoveToAvailable = (permisoId: number) => {
    setSelectedPermisos((prevSelected) => prevSelected.filter((id) => id !== permisoId));
  };

  return (
    <>
      <h2>Asignar Permisos a Roles</h2>

      {/* Buscador de roles */}
      <div style={{ position: "relative", width: "300px" }}>
        <input
          type="text"
          placeholder="Buscar rol..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          className="text-input"
        />
        {showDropdown && searchTerm && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              border: "1px solid #ccc",
              borderRadius: "4px",
              position: "absolute",
              width: "100%",
              backgroundColor: "white",
              color: "black",
              zIndex: 1000,
            }}
          >
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => (
                <li
                  key={role.id}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                  }}
                  onClick={() => handleRoleClick(role)}
                >
                  {role.name}
                </li>
              ))
            ) : (
              <li style={{ padding: "10px" }}>No se encontraron roles</li>
            )}
          </ul>
        )}
      </div>

      {/* Mostrar permisos del rol seleccionado */}
      {selectedRole && (
        <div className="permisoRolList" style={{ marginTop: "20px" }}>
          <Formik
            initialValues={{ permisosSeleccionados: [] }}
            onSubmit={(values) => {
                const dataToSend = {
                  role_id: selectedRole.id,
                  permisos_id: selectedPermisos,
                };
              
                dispatch(createNewPermisoRole(dataToSend))
                  .then(response => {
                    if (response.error) {
                      dispatch(toastActive({ message: response.error, type: 'error' }));
                    } else {
                      dispatch(toastActive({ message: response.message, type: 'success' }));
                    }
                  })
                  .catch(() => {
                    dispatch(toastActive({ message: "Error al asignar permisos", type: 'error' }));
                  });
              }}                            
          >
            <Form>
              <h3>Permisos del rol: {selectedRole.name}</h3>

              <div style={{ width: "100%", display: 'flex', gap: '2rem', justifyContent: "space-around" }}>
                {/* Permisos seleccionados */}
                <div>
                  <h4>Permisos Seleccionados</h4>
                  <ul>
                    {selectedPermisos.map((permisoId) => {
                      const permiso = permisos.find(p => p.id === permisoId);
                      return (
                        <li key={permisoId}>
                          <MyCheckbox
                            label={permiso?.name || ""}
                            name={`permiso_${permisoId}`}
                            checked={true}
                            onChange={() => handleMoveToAvailable(permisoId)}
                          />
                          {permiso?.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Permisos disponibles */}
                <div>
                  <h4>Permisos Disponibles</h4>
                  <ul>
                    {permisos
                      .filter((permiso) => !selectedPermisos.includes(permiso.id))
                      .map((permiso) => (
                        <li key={permiso.id}>
                          <MyCheckbox
                            label={permiso.name}
                            name={`permiso_${permiso.id}`}
                            checked={false}
                            onChange={() => handleMoveToSelected(permiso.id)}
                          />
                          {permiso.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <button type="submit" className="btn success">Guardar cambios</button>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};
