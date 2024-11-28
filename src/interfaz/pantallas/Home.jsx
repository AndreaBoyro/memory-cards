import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/index.css";
import { MEMORY_CARDS_ROUTE } from "../navegacion/routes";
import { Header } from "../componentes/Header.component";
import { MainTemplate } from "../componentes/Main-template.component";

export const Home = () => {
  const navigate = useNavigate();
  const [nombreJugador, setNombreJugador] = useState();

  const handleOnChange = (e) => {
    const valorNombre = e.target.value;
    setNombreJugador(valorNombre);
  };

  const esNombreCorrecto = () => {
    return nombreJugador !== undefined && nombreJugador.trim() !== "";
  };

  const handleOnClick = (e) => {
    if (!esNombreCorrecto()) {
      e.preventDefault();
    } else {
      navigate(MEMORY_CARDS_ROUTE, { state: { nombreJugador } });
    }
  };

  return (
    <>
      <Header esHome />
      <MainTemplate>
        <div className="home-wrapper">
          <div className="jugador-input-wrapper">
            <div className="input-label">
              <label htmlFor="jugador">Introduce tu nombre:</label>
            </div>
            <input
              id="jugador"
              className="jugador-input"
              onChange={handleOnChange}
            ></input>
            {!esNombreCorrecto() && (
              <span role="alert" className="i-help">
                Debes rellenar los datos
              </span>
            )}
          </div>
          <div>
            <button className="boton-generico" onClick={handleOnClick}>
              Comenzar
            </button>
          </div>
        </div>
      </MainTemplate>
    </>
  );
};
