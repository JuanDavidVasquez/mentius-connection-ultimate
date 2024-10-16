import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MySearch, MyTextInput } from "../../utils/forms";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPersonas } from "../../store/personas";
import { createSystemUserThunk } from "../../store/systemUsers";

export const CreateSystemUser = () => {
  const dispatch = useDispatch();
  const personas = useSelector((state: any) => state.personas.personas);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    dispatch(getPersonas());
  }, [dispatch]);


  const validationSchema = Yup.object({
    cedula: Yup.string().required("Cédula es requerida"),
  });

  const inputFields: { label: string; name: string; type?: "text" | "email" | "password" | "date" | "file" | "number"; placeholder?: string }[] = [
    { label: "Cédula", name: "cedula", type: "text", placeholder: "Ingresa tu cédula" },
    { label: "Usuario RED", name: "usuario_RED", type: "text", placeholder: "Ingresa el usuario RED" },
    { label: "ID Walter Bridge", name: "id_walter_bridge", type: "text", placeholder: "Ingresa el ID Walter Bridge" },
    { label: "ID Biométrico", name: "id_biometrico", type: "text", placeholder: "Ingresa el ID Biométrico" },
    { label: "Usuario SAP", name: "usuario_sap", type: "text", placeholder: "Ingresa el usuario de SAP" },
    { label: "Usuario C4C", name: "usuario_c4c", type: "text", placeholder: "Ingresa el usuario de C4C" },
    { label: "RTRWeb", name: "rtrweb", type: "text", placeholder: "Ingresa el usuario de RTRWeb" },
    { label: "S4Hanna", name: "s4hanna", type: "text", placeholder: "Ingresa el usuario de S4Hanna" },
    { label: "Usuario CRM", name: "usuario_crm", type: "text", placeholder: "Ingresa el usuario de CRM" },
    { label: "Correo Mentius", name: "correo_mentius", type: "email", placeholder: "Ingresa el correo Mentius" },
    { label: "Pure Cloud", name: "pure_cloud", type: "text", placeholder: "Ingresa el usuario de Pure Cloud" },
    { label: "Código Vendedor", name: "codigo_vendedor", type: "text", placeholder: "Ingresa el código vendedor" },
    { label: "Usuario Ucontact", name: "usuario_ucontact", type: "text", placeholder: "Ingresa el usuario de Ucontact" },
    { label: "Agent Genesys", name: "agent_genesys", type: "text", placeholder: "Ingresa el usuario de Agent Genesys" },
    { label: "Usuario Confronta", name: "usuario_confronta", type: "text", placeholder: "Ingresa el usuario de Confronta" },
    { label: "Usuario App Times", name: "usuario_app_times", type: "text", placeholder: "Ingresa el usuario de App Times" },
  ];

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <>
      <h2>Create System User</h2>
      <h5>Selecione Colaborador por su cedula</h5>
      <MySearch
        data={personas}
        filterFields={["cedula"]}
        onItemSelect={handleUserSelect} // Callback cuando se selecciona un ítem
      />
      
      {selectedUser && (
        <Formik
          initialValues={{
            cedula: selectedUser.cedula,
            usuario_RED: "",
            id_walter_bridge: "",
            id_biometrico: "",
            correo_mentius: "",
            pure_cloud: "",
            usuario_sap: "",
            usuario_c4c: "",
            rtrweb: "",
            s4hanna: "",
            usuario_crm: "",
            codigo_vendedor: "",
            usuario_ucontact: "",
            agent_genesys: "",
            usuario_confronta: "",
            usuario_app_times: "",
          }}
          enableReinitialize // Esta propiedad permite que el formulario se vuelva a inicializar
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(createSystemUserThunk(values));
        }}
    >
          {() => (
            <Form className="formSystemUsers">
            {inputFields.map((field) => {
              if (field.label === 'Cédula') {
                return (
                  <div className="cedulaSelected" key={field.name}>
                    <p>{field.label}: {selectedUser ? selectedUser.cedula : ""}</p> {/* Muestra la cédula seleccionada */}
                  </div>
                );
              } else {
                return (
                  <MyTextInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                );
              }
            })}
            <button type="submit" className="btn success">Crear Usuario</button>
          </Form>
          
          )}
        </Formik>
      )}
    </>
  );
};
