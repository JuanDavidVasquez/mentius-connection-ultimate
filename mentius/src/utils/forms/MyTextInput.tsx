import { ErrorMessage, useField } from "formik";

interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "date" | "file" | "number";
  placeholder?: string;
  [x: string]: any;
}

export const MyTextInput = ({ label, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <div className="inputs-container">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />

      <ErrorMessage
        name={props.name}
        component="span"
        className="custom-span-error-class"
      />
    </div>
  );
};

