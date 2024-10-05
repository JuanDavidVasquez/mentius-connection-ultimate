import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeRoleThunk } from '../../store/roles/thunk';
import { toastActive } from '../../store/hooks/toastSlice';

interface RoleDeleteProps {
    activeModalDelete: boolean;
    onClose: () => void;
    onConfirmDelete: () => void; 
    confirmarAction: (message: string) => void; // Agregado
}

export const RoleDelete = ({ activeModalDelete, onClose, onConfirmDelete, confirmarAction }: RoleDeleteProps) => {
    const { role } = useSelector((state) => state.roles);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeRoleThunk(role.id)).then(() => { 
            confirmarAction(`Role "${role.name}" deleted successfully!`); 
            onConfirmDelete(); 
            dispatch(toastActive({ message: 'Role deleted successfully!' }));
            onClose();
        });
    }

    return (
        <div className={`modal ${activeModalDelete ? "modal-active" : ""}`}>
            <h2>Confirm Delete {role?.name ? role.name : "Unknown Role"}</h2>
            <p>Are you sure you want to delete this role?</p>
            <div className='buttonsContainer'>
                <button className="btn cancelar" onClick={handleDelete}>Delete</button>
                <button className="btn info" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}
