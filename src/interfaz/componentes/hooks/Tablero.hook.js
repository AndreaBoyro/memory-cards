import { valoresCartas } from '../utils/memory-cards.utils';

const obtenerNuevaTirada = () => {
  const nuevaTiradaCartas = valoresCartas
    .map((card) => ({
      ...card,
      order: Math.floor(Math.random() * 12),
      isFlipped: true,
      selected: undefined,
    }))
    .sort((a, b) => a.order - b.order);
  return nuevaTiradaCartas;
};

const obtenerCartasFlipped = () => {
  const cartasFlipped = valoresCartas.map((card) => ({
    ...card,
    order: Math.floor(Math.random() * numRegistros()),
    isFlipped: false,
    selected: undefined,
  }));
  return cartasFlipped;
};
const numRegistros = () => valoresCartas.length;

const obtenerNumeroABuscar = () => {
    return Math.floor(Math.random() * numRegistros()) + 1;
};

export const useTableroHook = () => {
  return {
    obtenerNuevaTirada,
    obtenerCartasFlipped,
    obtenerNumeroABuscar,
  };
};
