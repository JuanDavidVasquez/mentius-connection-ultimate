import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/forms";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateRoleThunk } from "../../store/roles/thunk";
import { toastActive } from "../../store/hooks/toastSlice";


interface RoleEditProps {
    activeModalEdit: boolean;
    onClose: () => void; 
    onConfirmEdit: (values: { roleName: string }) => void; 
}

const RoleEdit = ({ activeModalEdit, onClose, onConfirmEdit }: RoleEditProps) => {

    const { role } = useSelector((state) => state.roles);
    const dispatch = useDispatch();

    const [initialValues, setInitialValues] = useState({
        id: "",
        name: "",
        description: ""
    });

    useEffect(() => {
        if (role) {
            setInitialValues({
                id: role.id || "",
                name: role.name || "",
                description: role.description || ""
            });
        }
        console.log(role, "desde edit role");
    }, [role]);

    if (!role) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`modal ${activeModalEdit ? "modal-active" : ""}`}>
            <h2>Edit Role</h2>

            <Formik
                enableReinitialize={true} // Habilitamos la reinitialización
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, "Role name must be at least 2 characters")
                        .required("Role name is required"),
                    description: Yup.string()
                        .min(5, "Description must be at least 5 characters")
                })}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(updateRoleThunk(values));
                    onConfirmEdit(values);
                    setSubmitting(false);
                    dispatch(toastActive({ message: 'Role edit successfully!' }));
                    onClose();
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <MyTextInput name="name" label="Role Name" type="text" />
                        <MyTextInput name="description" label="Description" type="text" />

                        <div className='buttonsContainer'>
                            <button type="submit" className="btn info" disabled={isSubmitting}>
                                Save Changes
                            </button>
                            <button type="button" className="btn cancelar" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RoleEdit;
