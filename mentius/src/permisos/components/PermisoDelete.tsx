import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toastActive } from "../../store/hooks/toastSlice";
import { removePermisoThunk } from "../../store/permisos/thunk";

interface Props {
    id: string;
    name: string;
    description: string;
}

interface PermisoDeleteProps {
    activeModalDelete: boolean;
    onClose: () => void;
    permiso: Props | null;
}

export const PermisoDelete = ({ activeModalDelete, onClose, permiso }: PermisoDeleteProps) => {
    const [isExiting, setIsExiting] = useState(false);
    const dispatch = useDispatch();

    // Resetea el estado de salida al abrir el modal de nuevo
    useEffect(() => {
        if (activeModalDelete) {
            setIsExiting(false);
        }
    }, [activeModalDelete]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 500); // Añade un pequeño delay para animaciones de salida
    };

    const handleDelete = () => {
        if (permiso) {
            dispatch(removePermisoThunk(permiso.id)); // Llama al thunk para eliminar el permiso
            dispatch(toastActive({ message: "Permiso eliminado exitosamente", type: "success" }));
            handleClose();
        }
    };

    // Evita renderizar si el modal no está activo
    if (!activeModalDelete && !isExiting) return null;

    return (
        <div className={`modal ${activeModalDelete ? "modal-active" : ""} ${isExiting ? "modal-exit" : ""}`}>
            <h2>Eliminar Permiso</h2>
            {permiso ? (
                <div>
                    <p>¿Estás seguro de que deseas eliminar el siguiente permiso?</p>
                    <p><strong>ID:</strong> {permiso.id}</p>
                    <p><strong>Nombre:</strong> {permiso.name}</p>
                    <p><strong>Descripción:</strong> {permiso.description}</p>
                </div>
            ) : (
                <p>No se ha seleccionado ningún permiso para eliminar</p>
            )}

            <div className="button-group">
                <button type="button" className="btn cancelar" onClick={handleDelete}>
                    Eliminar
                </button>
                <button type="button" className="btn info" onClick={handleClose}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};
