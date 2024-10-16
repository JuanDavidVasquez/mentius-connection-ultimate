import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/forms";
import { useEffect, useState } from "react";
import { updateSystemUserThunk } from "../../store/systemUsers/thunk";

// Definir las claves que deseas incluir en la validación
const validationKeys = [
  "cedula",
  "usuario_RED",
  "id_walter_bridge",
  "correo_mentius",
  "pure_cloud",
  "usuario_sap",
  "usuario_c4c",
  "rtrweb",
  "s4hanna",
  "usuario_crm",
  "codigo_vendedor",
  "usuario_ucontact",
  "agent_genesys",
  "usuario_confronta",
  "usuario_app_times",
];

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  cedula: Yup.string().required("Cédula es requerida"),
  // Puedes agregar validaciones adicionales para otros campos aquí
});

export const EditSystemUsers = () => {
  const dispatch = useDispatch();
  const systemUser = useSelector((state) => state.systemUsers.systemUser);

  // Estado local para los valores iniciales
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    // Crear valores iniciales a partir de systemUser
    const values = validationKeys.reduce((acc, key) => {
      acc[key] = systemUser[key] || "";
      return acc;
    }, {});

    setInitialValues(values);
  }, [systemUser]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        dispatch(updateSystemUserThunk(values));
      }}
      enableReinitialize // Habilita la re-inicialización de valores
    >
      {({  }) => (
        <Form className="formSystemUsers">
          {validationKeys.map((key) => (
            <MyTextInput key={key} name={key} label={key.replace("_", " ").toUpperCase()} />
          ))}
          <button type="submit" className="btn success">
            Guardar Cambios
          </button>
        </Form>
      )}
    </Formik>
  );
};
