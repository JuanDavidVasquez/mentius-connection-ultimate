import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { MySelect, MyTextInput } from "../../utils/forms";
import { toastActive } from "../../store/hooks/toastSlice";
import { createPersona } from "../../store/personas/thunk";
import { useEffect } from "react";
import { getUsers } from "../../store/users/thunk";

// Define la interfaz para los valores del formulario
interface ColaboradorValues {
  cedula: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  genero: string;
  fecha_nacimiento: string;
  edad: string;
  estado_civil: string;
  estado_empresa: string;
  id_user: string;
}

export const CreateColaborador = () => {
  const dispatch = useDispatch();

  // Accede al estado de los usuarios en Redux
  const users = useSelector((state: any) => state.users.users); // Asegúrate de acceder correctamente

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Valores iniciales para el formulario
  const initialValues: ColaboradorValues = {
    cedula: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    genero: "",
    fecha_nacimiento: "",
    edad: "",
    estado_civil: "",
    estado_empresa: "",
    id_user: "", // Inicializa el id del usuario
  };

  // Definimos los campos del formulario
  const formFields: Array<{
    name: keyof ColaboradorValues;
    label: string;
    type: "text" | "date" | "number" | "select";
    options?: string[];
  }> = [
    { name: "cedula", label: "Cédula", type: "number" },
    { name: "primer_nombre", label: "Primer Nombre", type: "text" },
    { name: "segundo_nombre", label: "Segundo Nombre", type: "text" },
    { name: "primer_apellido", label: "Primer Apellido", type: "text" },
    { name: "segundo_apellido", label: "Segundo Apellido", type: "text" },
    { name: "genero", label: "Género", type: "select", options: ["", "masculino", "femenino", "otro"] },
    { name: "fecha_nacimiento", label: "Fecha de Nacimiento", type: "date" },
    { name: "edad", label: "Edad", type: "number" },
    { name: "estado_civil", label: "Estado Civil", type: "select", options: ["", "soltero", "union libre", "casado", "divorciado"] },
    { name: "estado_empresa", label: "Estado en la Empresa", type: "select", options: ["", "activo", "inactivo"] },
  ];

  return (
    <div className="container-create-colaborador">
      <h2>Crear Colaborador</h2>
      <div style={{ width: "100%" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            // Convertir 'edad' a string
            const dataToSubmit = {
              ...values,
              edad: values.edad.toString(), // Asegúrate de que 'edad' sea un string
              estado_en_la_empresa: values.estado_empresa, // Verifica que este campo se esté enviando correctamente
            };
          
            console.log(dataToSubmit); // Log para verificar los datos que se enviarán
          
            const response = await dispatch(createPersona(dataToSubmit));
          
                  // Verificar si la respuesta tiene la propiedad error
                  if (response && response.error) {
                    dispatch(toastActive({ message: response.error, type: 'error' }));
                  } else if (response && response.success) {
                    dispatch(toastActive({ message: response.message, type: 'success' }));
                  } else {
                    dispatch(toastActive({ message: "Operación no reconocida", type: 'error' }));
                  }
                }}
          
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="formulario-persona">
                {formFields.map((field) => (
                  field.type === "select" ? (
                    <MySelect label={field.label} name={field.name} key={field.name} onChange={handleChange} value={values[field.name]}>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option || "Seleccione una opción"}</option>
                      ))}
                    </MySelect>
                  ) : (
                    <MyTextInput
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      onChange={handleChange}
                      value={values[field.name]}
                    />
                  )
                ))}

                {/* Select para elegir el usuario */}
                <MySelect label="Seleccionar Usuario" name="id_user" onChange={handleChange} value={values.id_user}>
                  <option value="">Seleccione un usuario</option>
                  {Array.isArray(users) && users.map((user) => (
                    <option key={user.id} value={user.id}>{user.user_name}</option>
                  ))}
                </MySelect>

                <button type="submit" className="btn success">
                  Crear Colaborador
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
