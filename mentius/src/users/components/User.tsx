import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MySelect, MyTextInput } from "../../utils/forms";

export const User = () => {
  return (
    <div>
        <h1>Create User</h1>

        <Formik
            initialValues={{
                user_name: "",
                password: "",
                role: "",
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
            validationSchema={Yup.object({
                user_name: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                password: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
                role: Yup.string()
                    .required("Required"),
              })}
        >

              {(formik) => (
                <Form>
                    <MyTextInput
                        label="User Name"
                        name="user_name"
                        type="text"
                        placeholder="User Name"
                    />
                    <MyTextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <MySelect label="Role" name="role">
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </MySelect>
                </Form>
              )}

        </Formik>
    </div>
  )
}
