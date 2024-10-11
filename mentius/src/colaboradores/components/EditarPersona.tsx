import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { MySelect, MyTextInput } from "../../utils/forms";

export const EditarPersona = () => {
  const persona = useSelector((state: any) => state.personas.persona);

  useEffect(() => {
    console.log(persona);
  }, [persona]);

  // Verificar si persona tiene datos
  if (!persona || Object.keys(persona).length === 0) {
    return null; // No mostrar nada si no hay datos
  }

  return (
    <div className="container-editar-persona">
      <h2>Editar datos Personales de: {persona.primer_nombre}</h2>
      <Formik
        initialValues={persona}
        onSubmit={(values) => {
          console.log(values); // Aquí puedes manejar la lógica de envío del formulario
        }}
      >
        {({ values, handleChange, setValues }) => {
          // Efecto para actualizar los valores del formulario cuando cambie persona
          useEffect(() => {
            setValues(persona); // Actualiza los valores del formulario cuando persona cambia
          }, [persona, setValues]);

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
                      value={values[field]}
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
