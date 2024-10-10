import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyTextInput } from "../../utils/forms";
import { updateBiometrico } from "../../store/biometricos/thunk";
import { toastActive } from "../../store/hooks/toastSlice";
import { setBiometrico } from "../../store/biometricos/biometricoSlice";

interface Biometrico {
  id: number;
  numero: string;
}

export const BiometricoEdit = () => {
  const [biometricoActivo, setBiometricoActivo] = useState(false);

  const biometrico = useSelector((state: { biometricos: { biometrico: Biometrico } }) => state.biometricos.biometrico);

    const dispatch = useDispatch();

  useEffect(() => {
    if (biometrico.id) {
      setBiometricoActivo(true);
    }
  }, [biometrico]);

  if (!biometricoActivo) return null; // No renderizar si no hay biométrico activo

  return (
    <div>
      Biometrico Edit: {biometrico.id}
      <Formik
        enableReinitialize // Esto permite que el formulario se reinitialice cuando cambien los valores iniciales
        initialValues={{
            id: biometrico.id,
          numero: biometrico.numero || "",
        }}
        onSubmit={async (values) => {
            try {
              const response = await dispatch<any>(updateBiometrico(values));
              if (response.error) {
                dispatch(toastActive({ message: response.error, type: 'error' }));
              } else {
                dispatch(toastActive({ message: response.message, type: 'success' }));
                dispatch(setBiometrico({ biometrico: { id: 0, numero: "" } }));
              }
            } catch (error) {
              dispatch(toastActive({ message: "Error al editar el biometrico", type: 'error' }));
            }
          }}
          
      >
        {({ setFieldValue }) => (
          <Form>
            <MyTextInput
              label="Numero de serie"
              name="numero"
              type="text"
              placeholder="Numero del biometrico"
            />

            <button type="submit" className="btn success">Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
