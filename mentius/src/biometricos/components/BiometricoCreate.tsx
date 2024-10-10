import { Formik,Form } from "formik"
import { MyTextInput } from "../../utils/forms";
import { useDispatch } from "react-redux";
import { createBiometrico } from "../../store/biometricos/thunk";
import { toastActive } from "../../store/hooks/toastSlice";


export const BiometricoCreate = () => {

    const dispatch = useDispatch();

  return (
    <div className="biomtricoCreate">
        <h2>Crear Biometrico</h2>
        <Formik
            initialValues={{
                numero:""
            }}
            onSubmit={(values) => {
                console.log(values);
                dispatch(createBiometrico(values))
                .then(response => {
                    if (response.error) {
                      dispatch(toastActive({ message: response.error, type: 'error' }));
                    } else {
                      dispatch(toastActive({ message: response.message, type: 'success' }));
                    }
                  })
                  .catch(() => {
                    dispatch(toastActive({ message: "Error al crear biometrico", type: 'error' }));
                  });
            }}
        >
            {() => (
                <Form>
                    <MyTextInput
                        label="Numero de serie"
                        name="numero"
                        type="text"
                        placeholder="Numero del biometrico"
                    />
                    <div className="button-group">
                        <button type="submit" className="btn success">
                            Crear
                        </button>
                    </div>
                </Form>
            )}

        </Formik>
    </div>
  )
}
