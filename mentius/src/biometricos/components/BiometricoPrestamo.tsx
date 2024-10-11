import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyTextInput } from "../../utils/forms";
import { prestamoBiometrico } from "../../store/biometricos/thunk";
import { toastActive } from "../../store/hooks/toastSlice";

interface Biometrico {
  id: number;
  numero: string;
}

export const BiometricoPrestamo = () => {
  const [biometricoActivo, setBiometricoActivo] = useState(false);

  const biometrico = useSelector(
    (state: { biometricos: { biometrico: Biometrico } }) =>
      state.biometricos.biometrico
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (biometrico.id) {
      setBiometricoActivo(true);
    }
  }, [biometrico]);

  if (!biometricoActivo) return null;

  return (
    <>
      <h1>Biometrico Prestamo: {biometrico.numero}</h1>
      <Formik
        enableReinitialize
        initialValues={{
          cedula: "",
          biometrico_id: biometrico.id || "",
        }}
        onSubmit={async (values) => {
          try {
            const response = await dispatch<any>(prestamoBiometrico(values));
            console.log(response);
            if (response.error) {
                dispatch(toastActive({ message: response.error, type: 'error' }));
            } else {
                dispatch(toastActive({ message: response.message, type: 'success' }));
            }
          } catch (error) {
            
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form>          
            <MyTextInput
              label="cedula"
              name="cedula"
              type="text"
              placeholder="Cedula del usuario"
            />
            <button type="submit" className="btn success">
              Asignar
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
