import React from "react";
import App from "../../src/App";
import { MEMORY_CARDS_ROUTE } from "../../src/interfaz/navegacion/routes";
import { Home } from "../../src/interfaz/pantallas/Home";
import {
  accederUsuarioTest,
  comprobarLocationCorrecta,
} from "../support/MemoryCards.helper";

describe("Home", () => {
  it("Avisa de que el campo nombre es obligatorio", () => {
    cy.mountComponent(<Home />);

    cy.get("[data-testid='pantalla_home']").should("exist");
    cy.get("[data-testid='pantalla_home_input']")
      .should("exist")
      .should("have.attr", "required");
    cy.get("[data-testid='pantalla_home_input']")
      .should("exist")
      .should("have.attr", "required");
    cy.get(".i-help").should("exist");
  });

  it("Si el usuario no introduce números/letras en el campo, se mantiene el error y el botón de comenzar está deshabilitado", () => {
    cy.mountComponent(<Home />);
    cy.get("[data-testid='pantalla_home']").should("exist");

    cy.get("[data-testid='pantalla_home_input']").type("     ");
    cy.get(".i-help").should("exist");
    cy.get("[data-testid='pantalla_home_boton']").should("be.disabled");
  });

  it("Si el usuario introduce algún carácter alfanumérico se habilita el botón de Comenzar y no se muestra error", () => {
    cy.mountComponent(<Home />);

    cy.get("[data-testid='pantalla_home']").should("exist");

    cy.get("[data-testid='pantalla_home_input']").type("Test");
    cy.get(".i-help").should("not.exist");
    cy.get("[data-testid='pantalla_home_boton']").should("not.be.disabled");
  });

  it("El botón de Comenzar navega a la ruta /memory-cards", () => {
    cy.mount(<App />);

    cy.get("[data-testid='pantalla_home']").should("exist");

    accederUsuarioTest();

    comprobarLocationCorrecta(MEMORY_CARDS_ROUTE);
  });
});
