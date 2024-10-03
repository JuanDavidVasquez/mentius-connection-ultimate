import { MyImport } from "../../utils/forms/MyImport";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/forms";

// Esquema de validación para el archivo
const validationSchema = Yup.object({
  file: Yup.mixed()
    .required("Se requiere un archivo")
    .test(
      "fileFormat",
      "Solo se permiten archivos CSV",
      (value) => value instanceof File && value.type === "text/csv"
    ),
});

export const AsistenciaImports = () => {
  const [importSelected, setImportSelected] = useState("");

  const importsNav = ["Torniquetes", "Genesys", "uContact"];

  return (
    <>
      <h1>Asistencia Imports</h1>
      <div className="menu-imports">
        {importsNav.map((importNav) => (
          <button
            key={importNav}
            onClick={() => setImportSelected(importNav)}
            className={`btn info ${
              importSelected === importNav ? "selected" : ""
            }`}
          >
            {importNav}
          </button>
        ))}
      </div>
      <div style={{ margin: "10px 0px", width:"250px" }}>

        {importSelected && <h3>Import {importSelected}</h3>}

        <Formik
          initialValues={{ file: null }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values.file);
          }}
        >
          {(formik) => (
            <Form>
              <MyImport
                label="Importar archivo"
                name="file"
                type="file"
                accept=".csv"
                placeholder="Selecciona un archivo"
              />
              <MyTextInput
                label="Fecha"
                name="date"
                type="date"
                placeholder="Selecciona una fecha"
              />
              <button type="submit" className="submit">
                Importar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
