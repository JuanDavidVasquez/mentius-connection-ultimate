import { useEffect, useRef, useState } from "react";
import { BiometricoCreate } from "../components/BiometricoCreate";
import { animateOpenClose } from "../../utils/animations/animationOpenClose";
import { useDispatch, useSelector } from "react-redux";
import { getBiometricos } from "../../store/biometricos/thunk";
import { MySearch } from "../../utils/forms";
import { setBiometrico } from "../../store/biometricos/biometricoSlice";
import { BiometricoEdit } from "../components/BiometricoEdit";
import { BiometricoPrestamo } from "../components/BiometricoPrestamo";

interface Biometrico {
    id: number;
    numero: string;
    role_id: number;
    permiso_id: number;
}
export const Biometricos = () => {
  const [isVisible, setIsVisible] = useState(false); // Controla si el componente debe ser visible
  const [shouldRender, setShouldRender] = useState(false); // Controla si el componente debe renderizarse en el DOM
  const createRef = useRef<HTMLDivElement | null>(null);

  const biometricos = useSelector(
    (state: { biometricos: { biometricos: Biometrico[] } }) =>
      state.biometricos.biometricos
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBiometricos());
  }, []);

  const handleToggleBiometricoCreate = () => {
    if (isVisible) {
      // Si está visible, animamos para cerrarlo
      animateOpenClose(createRef.current, setIsVisible, isVisible);
    } else {
      // Si no está visible, primero renderizamos el componente y luego animamos para abrirlo
      setShouldRender(true);
      setTimeout(() => {
        animateOpenClose(createRef.current, setIsVisible, isVisible);
      }, 0); // Aseguramos que se renderice antes de la animación
    }
  };

  const handleSelect = (selectedItem: Biometrico) => {
    dispatch(setBiometrico({ biometrico: selectedItem }));
  };

  return (
    <div className="container-biometricos">
      <h1>Biométricos</h1>
      <button onClick={handleToggleBiometricoCreate} className="btn success">
        Crear Biometrico
      </button>

      {/* Renderiza el componente solo si `shouldRender` es true */}
      {shouldRender && (
        <div ref={createRef}>
          <BiometricoCreate />
        </div>
      )}

      {biometricos && (
        <>
        <h2>Lista de Biometricos</h2>
        <MySearch
          data={biometricos}
          filterFields={["numero"]} 
          onItemSelect={handleSelect} 
        />
        </>
      )}
   

       <BiometricoEdit/>
  
      <div className="container-prestamo">
        <BiometricoPrestamo/>
      </div>

    </div>
  );
};

export default Biometricos;
