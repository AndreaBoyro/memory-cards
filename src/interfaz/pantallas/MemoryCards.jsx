import { Navigate, useLocation } from "react-router";
import { Tablero } from "../componentes/Tablero.component";
import { Header } from "../componentes/Header.component";
import { useState } from "react";
import { listaValoresDificultadCombo } from "../componentes/utils/memory-cards.utils";
import { HOME_ROUTE } from "../navegacion/routes";
import "../../estilos/index.css";
import { MainTemplate } from "../componentes/Main-template.component";

export function MemoryCards() {
  const { state } = useLocation();
  const estaAutenticado = state && state.nombreJugador;
  const [nivelDificultad, setNivelDificultad] = useState(
    listaValoresDificultadCombo[0]
  );
  const [juegoEnCurso, setJuegoEnCurso] = useState(false);
  return estaAutenticado ? (
    <>
      <Header
        nombreJugador={state.nombreJugador}
        setNivelDificultad={setNivelDificultad}
        nivelDificultad={nivelDificultad}
        juegoEnCurso={juegoEnCurso}
      />
      <MainTemplate>
        <Tablero
          nivelDificultad={nivelDificultad}
          setJuegoEnCurso={setJuegoEnCurso}
        />
      </MainTemplate>
    </>
  ) : (
    <Navigate to={HOME_ROUTE} replace />
  );
}
