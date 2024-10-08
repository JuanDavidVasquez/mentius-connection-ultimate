import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getPermisos } from "../../store/permisos/thunk";
import { PermisosList } from "../components/PermisosList";
import { PermisoCreate } from "../components/PermisoCreate";
import { animateOpenClose } from "../../utils/animations/animationOpenClose";

export const Permisos = () => {
  const [toggleCreate, setToggleCreate] = useState(false);
  const dispatch = useDispatch();

  // Referencia al elemento de `PermisoCreate` para aplicar la animación
  const createRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getPermisos());
  }, []);

  const handleToggleCreate = () => {
    animateOpenClose(createRef.current, setToggleCreate, toggleCreate);
  };

  return (
    <div className="container-permisos">
      <h1>Permisos</h1>
      <button className="btn info" onClick={handleToggleCreate}>
        Create Permission
      </button>

      {/* Usar referencia y condicional para mostrar el componente */}
      <div ref={createRef} className="container-create">
        {toggleCreate && <PermisoCreate />}
      </div>

      <PermisosList />
    </div>
  );
};

export default Permisos;
