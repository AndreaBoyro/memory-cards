import React from "react";
import App from "../../src/App";
import {
  HOME_ROUTE,
  MEMORY_CARDS_ROUTE,
} from "../../src/interfaz/navegacion/routes";
import { comprobarLocationCorrecta } from "../support/MemoryCards.helper";

describe("Memory cards", () => {
  it("Si se intenta acceder a la ruta /memory-cards sin estar autenticado, navega a /home", () => {
    cy.mount(<App />);

    window.history.pushState({}, null, MEMORY_CARDS_ROUTE);
    cy.wait(100);
    comprobarLocationCorrecta(HOME_ROUTE);

    cy.get("[data-testid='pantalla_home']").should("exist");
  });
});
