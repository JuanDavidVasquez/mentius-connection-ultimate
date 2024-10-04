import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux'; 
import { MySelect, MyTextInput } from "../../utils/forms";
import { updateUser } from "../../store/users";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

export const UserEdit = () => {
  const { user } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    id: "",
    user_name: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
        setInitialValues({
            id: user.id || "", 
            user_name: user.user_name || "",
            password: user.password || "", 
            role: user.role || "", 
        });
    }
}, [user]);


  return (
    <div>
      <h1>Edit user: {user.user_name}</h1>

      {user ? (
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => { 
            console.log("Updated User Data:", values);
            dispatch(updateUser(values));
            toast.success("User Updated successfully!"); 
            resetForm(); 
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
                      type="number"
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
       <ToastContainer />
    </div>
  );
};
