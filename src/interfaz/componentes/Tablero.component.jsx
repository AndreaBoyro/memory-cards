import { useState } from 'react';
import { Card } from './Card.component';
import { useTableroHook } from './hooks/Tablero.hook';
import { mapRelacionDificultadMilis, MILIS_RESTART } from './utils/memory-cards.utils';

export const Tablero = ({ nivelDificultad, setJuegoEnCurso }) => {
  const { obtenerNuevaTirada, obtenerCartasFlipped, obtenerNumeroABuscar } = useTableroHook();

  const [cardsData, setcardsData] = useState(obtenerNuevaTirada());
  const [numBuscar, setNumBuscar] = useState(undefined);
  const [mostarTablero, setMostrarTablero] = useState(false);
  const [puntosUsuario, setPuntosUsuario] = useState(0);
  const calcularPuntuacionSegunDificultad = () => {
    return nivelDificultad.code * 10;
  };
  const comprobarCartaSeleccionada = (valor) => {
    if (valor === numBuscar) {
      const sumaPuntos = calcularPuntuacionSegunDificultad();
      setPuntosUsuario(puntosUsuario + sumaPuntos);
      mostrarCartaSeleccionada(true, valor);
      setNumBuscar(undefined);
      setTimeout(() => {
        crearNuevoJuego();
      }, MILIS_RESTART);
    } else {
      resetearTablero(valor);
    }
  };

  const mostrarCartaSeleccionada = (esCorrecta, valor) => {
    cardsData.forEach((card) => {
      if (card.id === valor) {
        card.isFlipped = true;
        card.selected = esCorrecta;
      }
    });
    setcardsData([...cardsData]);
  };

  const resetearTablero = (valor) => {
    setJuegoEnCurso(false);
    mostrarCartaSeleccionada(false, valor);
    setTimeout(() => {
      setNumBuscar(undefined);
      setMostrarTablero(false);
      setPuntosUsuario(0);
    }, MILIS_RESTART);
  };

  const onClickJugar = () => {
    if (!mostarTablero) {
      setMostrarTablero(true);
    }
    crearNuevoJuego();
  };

  const crearNuevoJuego = () => {
    setJuegoEnCurso(true);
    const nuevaTirada = obtenerNuevaTirada();
    setcardsData(nuevaTirada);
    flipCartasEnTiempo();
  };

  const flipCartasEnTiempo = () => {
    const duracionTimeout = mapRelacionDificultadMilis[nivelDificultad.code];

    setTimeout(() => {
      const cardsDataFlipped = obtenerCartasFlipped();
      setcardsData(cardsDataFlipped);
      const numBuscar = obtenerNumeroABuscar();
      setNumBuscar(numBuscar);
    }, duracionTimeout);
  };

  return (
    <>
      <div className='tablero-wrapper'>
        {mostarTablero ? (
          <>
            <div className='tablero-cabecera'>
              <div className='puntos-tablero'>
                <span>Puntos obtenidos: {puntosUsuario}</span>
              </div>
              <div className='num-buscar-tablero'>
                {numBuscar !== undefined && (
                  <span>
                    ¿Dónde esta el número <strong>{numBuscar}</strong>?
                  </span>
                )}
              </div>
            </div>
            <div className='tablero-container'>
              {cardsData.map((card) => {
                return <Card key={card.id} card={card} onClick={comprobarCartaSeleccionada} />;
              })}
            </div>
          </>
        ) : (
          <div>
            <button className='boton-generico' onClick={onClickJugar}>
              Comenzar partida
            </button>
          </div>
        )}
      </div>
    </>
  );
};
