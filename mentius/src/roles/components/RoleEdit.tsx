import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/forms";

interface RoleEditProps {
    activeModalEdit: boolean;
    onClose: () => void; 
    onConfirmEdit: (values: { roleName: string }) => void; 
}

const RoleEdit = ({ activeModalEdit, onClose, onConfirmEdit }: RoleEditProps) => {
    return (
        <div className={`modal ${activeModalEdit ? "modal-active" : ""}`}>
            <h2>Edit Role</h2>

            <Formik
                initialValues={{ roleName: '' }}
                validationSchema={Yup.object({
                    roleName: Yup.string()
                        .min(2, "Role name must be at least 2 characters")
                        .required("Role name is required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    onConfirmEdit(values);
                    setSubmitting(false);
                    onClose();
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <MyTextInput name="roleName" label="Role Name" type="text" />
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
