import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/forms";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toastActive } from "../../store/hooks/toastSlice";
import { createNewRole } from "../../store/roles/thunk";


interface RoleCreateProps {
    activeModalCreate: boolean;
    onClose: () => void;
}

export const RoleCreate = ({ activeModalCreate, onClose }: RoleCreateProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 500); 
  };

  const dispatch = useDispatch();



  return (
    <div className={`modal ${activeModalCreate ? "modal-active" : ""} ${isExiting ? "modal-exit" : ""}`}>
        <h2>Role Create</h2>

        <Formik
            initialValues={{
                name: "",
                description: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                description: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
            })}
            onSubmit={(values) => {
                console.log(values);
                dispatch(createNewRole(values));
                dispatch(toastActive({ message: 'Role created successfully!' }));
                handleClose(); 
            }}
        >
            {(formik) => (
                <Form>
                    <MyTextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Role name"
                    />
                    <MyTextInput
                        label="Description"
                        name="description"
                        type="text"
                        placeholder="Role description"
                    />
                    <div className="buttons">
                        <button type="submit" className="btn success">Submit</button>
                        <button type="button" className="btn cancelar" onClick={handleClose}>Cancel</button>
                    </div>
                    
                </Form>
            )}
        </Formik>
    </div>
  );
}
