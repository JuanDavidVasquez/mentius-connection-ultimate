import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MySelect, MyTextInput } from "../../utils/forms";

// Simulando datos que llegan desde un backend
const getUserDataFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user_name: "john_doe",
        password: "password123",
        role: "admin",
      });
    }, 1000); 
  });
};

export const UserEdit = () => {
  const [initialValues, setInitialValues] = useState({
    user_name: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    // Simulamos la obtención de los datos del backend
    getUserDataFromAPI().then((data: any) => {
      setInitialValues(data);
    });
  }, []);

  return (
    <div>
      <h1>Edit User</h1>

      {/* Verificar si los datos ya han sido cargados */}
      {initialValues.user_name ? (
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log("Updated User Data:", values);
          }}
          validationSchema={Yup.object({
            user_name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            password: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            role: Yup.string().required("Required"),
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

              <button type="submit" className="btn">
                Update User
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
