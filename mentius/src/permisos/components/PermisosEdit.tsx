import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/forms"; // Asumo que este es un input personalizado
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toastActive } from "../../store/hooks/toastSlice";
import { updatePermisoThunk } from "../../store/permisos/thunk";

interface Props {
    id: string;
    name: string;
    description: string;
}

interface PermisoCreateProps {
    activeModalCreate: boolean;
    onClose: () => void;
    permiso: Props | null;
}

export const PermisosEdit = ({ activeModalCreate, onClose, permiso }: PermisoCreateProps) => {
    const [isExiting, setIsExiting] = useState(false);
    const dispatch = useDispatch();

    // Resetea el estado de salida al abrir el modal de nuevo
    useEffect(() => {
        if (activeModalCreate) {
            setIsExiting(false);
        }
    }, [activeModalCreate]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 500); // Añade un pequeño delay para animaciones de salida
    };

    // Validación con Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .required("El nombre es requerido"),
        description: Yup.string()
            .min(5, "La descripción debe tener al menos 5 caracteres")
            .required("La descripción es requerida"),
    });

    const handleSubmit = (values: Props) => {
        
        console.log(values);
        dispatch(updatePermisoThunk(values));
        dispatch(toastActive({ message: "Permiso actualizado exitosamente", type: "success" }));
        handleClose(); // Cierra el modal después de actualizar
    };

    // Evita renderizar si el modal no está activo
    if (!activeModalCreate && !isExiting) return null;

    return (
        <div className={`modal ${activeModalCreate ? "modal-active" : ""} ${isExiting ? "modal-exit" : ""}`}>
            <h2>Editando Permiso</h2>
            {permiso ? (
                <Formik
                    initialValues={{
                        id: permiso.id || "",
                        name: permiso.name || "",
                        description: permiso.description || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <MyTextInput
                                label="Nombre"
                                name="name"
                                type="text"
                                placeholder="Ingresa el nombre del permiso"
                            />
                            <MyTextInput
                                label="Descripción"
                                name="description"
                                type="text"
                                placeholder="Ingresa la descripción"
                            />

                            <div className="button-group">
                                <button type="submit" className="btn" disabled={isSubmitting}>
                                    {isSubmitting ? "Guardando..." : "Guardar"}
                                </button>
                                <button type="button" className="btn cancelar" onClick={handleClose}>
                                    Cancelar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <p>No se ha seleccionado ningún permiso</p>
            )}
        </div>
    );
};
