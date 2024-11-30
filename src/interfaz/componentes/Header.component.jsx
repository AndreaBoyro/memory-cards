import { Dropdown } from "primereact/dropdown";
import { listaValoresDificultadCombo } from "./utils/memory-cards.utils";

export const Header = ({
  nombreJugador,
  setNivelDificultad,
  nivelDificultad,
  juegoEnCurso,
  esHome,
}) => {
  const handleOnChange = (e) => {
    const nivelDificultad = e.value;
    setNivelDificultad(nivelDificultad);
  };

  return (
    <header className="header-container" data-testid="componente-cabecera">
      <div>
        <div
          className="usuario-wrapper "
          data-testid="componente-cabecera-usuario"
        >
          <span>
            <strong>
              {!esHome
                ? "Hola, " + nombreJugador
                : "Bienvenido/a a Memory Cards"}
            </strong>
          </span>
        </div>
        {!esHome && (
          <div className="dificultad-wrapper">
            <Dropdown
              data-testid="componente-cabecera-dificultad-combo"
              key={"memory_cards_dd"}
              className={"jugador-input"}
              value={nivelDificultad}
              options={listaValoresDificultadCombo}
              onChange={handleOnChange}
              autowidth={"false"}
              placeholder={"Nivel dificultad"}
              optionLabel={"name"}
              tooltipOptions={{ position: "bottom" }}
              disabled={juegoEnCurso}
            />{" "}
          </div>
        )}
      </div>
    </header>
  );
};
