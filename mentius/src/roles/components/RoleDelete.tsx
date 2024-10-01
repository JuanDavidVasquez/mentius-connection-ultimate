import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface RoleDeleteProps {
    activeModalDelete: boolean;
    onClose: () => void; // Función para cerrar el modal
    onConfirmDelete: () => void; // Función para confirmar la eliminación
}

export const RoleDelete = ({ activeModalDelete, onClose, onConfirmDelete }: RoleDeleteProps) => {
  return (
    <div className={`modal ${activeModalDelete ? "modal-active" : ""}`}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this role?</p>

        <div className='buttonsContainer'>
            <button className="btn cancelar" onClick={onConfirmDelete}>Delete</button>
            <button className="btn info" onClick={onClose}>Cancel</button>
        </div>
    </div>
  );
}
