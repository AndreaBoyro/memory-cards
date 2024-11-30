import React from "react";
import App from "../../src/App";
import { MEMORY_CARDS_ROUTE } from "../../src/interfaz/navegacion/routes";
import { comprobarLocationCorrecta } from "../support/MemoryCards.helper";

describe("Header", () => {
  beforeEach(() => {
    cy.mount(<App />);
  });
  it("En ruta /home la cabecera muestra el texto de bienvenida", () => {
    cy.get("[data-testid='componente-cabecera-usuario']").should(
      "have.text",
      "Bienvenido/a a Memory Cards"
    );
    cy.get('[data-testid="componente-cabecera-dificultad-combo"').should(
      "not.exist"
    );
  });
  it("En ruta /memory-cards la cabecera muestra el nombre de usuario y el dropdown de dificultad", () => {
    cy.get("[data-testid='pantalla_home_input']").type("Test");
    cy.get(".i-help").should("not.exist");
    cy.get("[data-testid='pantalla_home_boton']")
      .should("not.be.disabled")
      .click();

    comprobarLocationCorrecta(MEMORY_CARDS_ROUTE);
    cy.get("[data-testid='componente-cabecera-usuario']").should(
      "have.text",
      "Hola, Test"
    );
    cy.get('[data-testid="componente-cabecera-dificultad-combo"').should(
      "exist"
    );
  });
});
