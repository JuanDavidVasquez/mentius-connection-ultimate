import { ColaboradoresSearch } from "../components/ColaboradoresSearch";
import { MyPersonalData } from "../components/MyPersonalData";

import "../assets/colaboradoresStyles.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPersonas } from "../../store/personas/thunk";
import { EditarPersona } from "../components/EditarPersona";
import { CreateColaborador } from "../components/CreateColaborador";

export const Colaboradores = () => {
  const dispatch = useDispatch();
  const [toggleCreate, setToggleCreate] = useState(false);

  useEffect(() => {
    dispatch(getPersonas());
  }, []);

  const handleToggleCreate = () => {
    setToggleCreate(!toggleCreate);
  };

  return (
    <div className="container-colaboradores">
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h1>Colaboradores</h1>
        <button
          className="btn success"
          style={{ fontSize: "12px" }}
          onClick={handleToggleCreate}
        >
          Asignar datos al Colaborador
        </button>
      </div>

      <hr className="hr" />

      {toggleCreate && <CreateColaborador />}

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
