import { ColaboradoresSearch } from "../components/ColaboradoresSearch";
import { MyPersonalData } from "../components/MyPersonalData";

import "../assets/colaboradoresStyles.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPersonas } from "../../store/personas/thunk";
import { EditarPersona } from "../components/EditarPersona";

export const Colaboradores = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonas());
  }, []);

  return (
    <div className="container-colaboradores">
      <h1>Colaboradores</h1>
      <hr className="hr" />

      <h2>Buscador de Colaboradores</h2>
      <ColaboradoresSearch />

      <EditarPersona />

      <h2>Información del Colaborador</h2>
      <div className="myPersonalData-container">
        <MyPersonalData />
      </div>
    </div>
  );
};

export default Colaboradores;
