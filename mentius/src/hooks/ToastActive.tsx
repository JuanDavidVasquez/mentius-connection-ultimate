import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import { useDispatch, useSelector } from "react-redux";
import { toastInactive } from "../store/hooks/toastSlice";



export const ToastActive = () => {
    const dispatch = useDispatch();
    const isToastActive = useSelector((state: any) => state.toastActive.active); 
    const message = useSelector((state: any) => state.toastActive.message); 


    useEffect(() => {
        if (isToastActive) {
            toast.success(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Desactiva el toast después de que se muestre
            const timer = setTimeout(() => {
                dispatch(toastInactive());
            }, 5000); // Tiempo igual al autoClose del toast

            return () => clearTimeout(timer); // Limpiar el timer en la limpieza del efecto
        }
    }, [isToastActive, message, dispatch]);

    return <ToastContainer />;
};
