import { ColaboradoresSearch } from "../components/ColaboradoresSearch";
import { MyPersonalData } from "../components/MyPersonalData";

import "../assets/colaboradoresStyles.css";

export const Colaboradores = () => {
  return (
    <div className="container-colaboradores">
      <h1>Colaboradores</h1>
      <hr className="hr" />

      <h2>Buscador de Colaboradores</h2>
      <ColaboradoresSearch />

      <h2>Información del Colaborador</h2>
      <div className="myPersonalData-container">
        <MyPersonalData />
      </div>
    </div>
  );
};

export default Colaboradores;
