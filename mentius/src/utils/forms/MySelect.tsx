import { ErrorMessage, useField } from "formik";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  children: React.ReactNode; 
  [x: string]: any;
}

export const MySelect = ({ label, children, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <div className="select">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props}>
      {children}
        </select>

      <ErrorMessage
        name={props.name}
        component="span"
        className="custom-span-error-class"
      />
    </div>
  );
};
