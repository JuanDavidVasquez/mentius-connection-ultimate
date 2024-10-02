import { ErrorMessage, useField } from "formik";

interface Props {
  label: string;
  name: string;
  type: "file";
  accept: string;
  [x: string]: any;
}

export const MyImport = ({ label, ...props }: Props) => {
  const [field, , helpers] = useField(props); 

  return (
    <div className="inputs-container">
      <label htmlFor={props.id || props.name}>{label}</label>
      {/* Personalizamos el `onChange` para manejar archivos */}
      <input
        {...props}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          helpers.setValue(file);           
        }}
        className="text-input"
      />

      {/* Mensaje de error en caso de que falle la validación */}
      <ErrorMessage
        name={props.name}
        component="span"
        className="custom-span-error-class"
      />
    </div>
  );
};
