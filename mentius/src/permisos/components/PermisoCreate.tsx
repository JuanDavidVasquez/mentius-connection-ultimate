import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/forms";
import { useDispatch } from "react-redux";
import { createNewPermiso } from "../../store/permisos/thunk";
import { toastActive } from "../../store/hooks/toastSlice";


export const PermisoCreate = () => {

    const dispatch = useDispatch();

  return (
    <div className="createPermission">
      <h1>Create Permission</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(55, "Must be 55 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(55, "Must be 55 characters or less")
            .required("Required"),
        })}
        onSubmit={(values) => {
            dispatch(createNewPermiso(values));
            dispatch(toastActive({ message: 'Role created successfully!' }));
        }}
      >
        {() => (
          <Form>
            <div className="form-group">
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Permission name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-group">
              <MyTextInput
                label="Description"
                name="description"
                type="text"
                placeholder="Permission description"
              />
              <ErrorMessage name="description" component="div" className="error" />
            </div>
            <div className="button-group">
              <button type="submit" className="btn success">
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
