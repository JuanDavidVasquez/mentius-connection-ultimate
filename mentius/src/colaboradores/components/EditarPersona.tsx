import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { MySelect, MyTextInput } from "../../utils/forms";
import { updatePersona } from "../../store/personas/thunk";
import { toastActive } from "../../store/hooks/toastSlice";

export const EditarPersona = () => {
  const persona = useSelector((state: any) => state.personas.persona);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
const dispatch = useDispatch();

  useEffect(() => {
    if (persona) {
      setFormValues(persona);
    }
  }, [persona]);

  // Verificar si persona tiene datos
  if (!persona || Object.keys(persona).length === 0) {
    return null; // No mostrar nada si no hay datos
  }

  return (
    <div className="container-editar-persona">
      <h2>Editar datos Personales de: {formValues.primer_nombre || ""}</h2>
      <Formik
        initialValues={formValues}
        enableReinitialize 
        onSubmit={async (values) => {
            console.log(values); 
            const response = await dispatch(updatePersona(values));
          
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
        {({ values, handleChange }) => {
          return (
            <Form>
              <div className="formulario-persona">
                {Object.keys(values)
                  .filter(
                    (field) =>
                      field !== "id_user" &&
                      field !== "id" &&
                      field !== "genero"
                  )
                  .map((field: string) => (
                    <MyTextInput
                      key={field}
                      label={field.replace("_", " ")}
                      name={field}
                      type={
                        field === "fecha_nacimiento"
                          ? "date"
                          : field === "cedula" || field === "edad"
                          ? "number"
                          : "text"
                      }
                      onChange={handleChange}
                      value={values[field] !== null && values[field] !== "" ? values[field] : ""}
                    />
                  ))}

                <MySelect label="Género" name="genero">
                  <option value="">Seleccione una opción</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </MySelect>

                <button type="submit" className="btn success">
                  Guardar cambios
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
