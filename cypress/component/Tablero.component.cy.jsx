import React from "react";
import App from "../../src/App";
import {
  HOME_ROUTE,
  MEMORY_CARDS_ROUTE,
} from "../../src/interfaz/navegacion/routes";
import {
  buscarCartaCorrecta,
  buscarCartaIncorrecta,
  cambiarDificultadCombo,
  comprobarCardBackVisible,
  comprobarCardFrontVisible,
  comprobarPuntosUsuario,
  accederUsuarioTest,
  clickBotonIniciarPartida,
} from "../support/MemoryCards.helper";

describe("Inicio juego", () => {
  it("El primer acceso del usuario muestra un botón para comenzar la partida", () => {
    cy.mount(<App />);
    accederUsuarioTest();
    cy.get("[data-testid='componente-tablero']").should("exist");
    cy.get("[data-testid='componente-tablero-boton']").should("exist");
    cy.get("[data-testid='componente-tablero-container']").should("not.exist");
  });
  it("Al pulsar el botón de Comenzar se muestran las 12 cartas con los números a la vista", () => {
    cy.mount(<App />);
    accederUsuarioTest();
    cy.get("[data-testid='componente-tablero']").should("exist");
    cy.get("[data-testid='componente-tablero-boton']").should("exist").click();
    cy.get("[data-testid='componente-tablero-container']").should("exist");
    cy.get("[data-testid='componente-tablero-container']>div").should(
      "have.length",
      12
    );
    comprobarCardFrontVisible();
    window.history.pushState({}, null, HOME_ROUTE);
  });
});
context("Dificultad juego", () => {
  describe("Dificultad fácil", () => {
    it("Las cartas están durante 10segs a la vista antes de darse la vuelta", () => {
      cy.mount(<App />);

      cy.get("[data-testid='componente-cabecera-dificultad-combo'] span:first")
        .should("exist")
        .then((el) => {
          expect(el.get(0).textContent).to.equal("Fácil");
        });
      clickBotonIniciarPartida();
      comprobarCardFrontVisible();
      cy.wait(10000);

      comprobarCardBackVisible();
    });
    it("Si se selecciona la carta correcta: el color de la carta es verde y se suman 10 puntos al usuario. A continuación, continúa el juego. Si se selecciona una carta incorrecta el color es rojo y se termina el juego", () => {
      cy.mount(<App />);
      clickBotonIniciarPartida();
      comprobarCardFrontVisible();
      cy.wait(10000);

      comprobarCardBackVisible();

      buscarCartaCorrecta();

      comprobarPuntosUsuario(10);

      comprobarCardFrontVisible();

      cy.wait(10000);

      comprobarCardBackVisible();

      buscarCartaIncorrecta();
      cy.get("[data-testid='componente-tablero-boton']").should("exist");
    });
  });
  describe("Dificultad media", () => {
    it("Las cartas están durante 5segs a la vista antes de darse la vuelta", () => {
      cy.mount(<App />);
      cambiarDificultadCombo("Medio");

      clickBotonIniciarPartida();
      comprobarCardFrontVisible();
      cy.wait(5000);

      comprobarCardBackVisible();
    });
    it("Si se selecciona la carta correcta: el color de la carta es verde y se suman 20 puntos al usuario. A continuación, continúa el juego. Si se selecciona una carta incorrecta el color es rojo y se termina el juego", () => {
      cy.mount(<App />);
      cambiarDificultadCombo("Medio");
      clickBotonIniciarPartida();
      comprobarCardFrontVisible();
      cy.wait(5000);

      comprobarCardBackVisible();

      buscarCartaCorrecta();

      comprobarPuntosUsuario(20);

      comprobarCardFrontVisible();

      cy.wait(5000);

      comprobarCardBackVisible();

      buscarCartaIncorrecta();
      cy.get("[data-testid='componente-tablero-boton']").should("exist");
    });
  });
  describe("Dificultad difícil", () => {
    it("Las cartas están durante 2segs a la vista antes de darse la vuelta", () => {
      cy.mount(<App />);
      cambiarDificultadCombo("Difícil");

      clickBotonIniciarPartida();
      comprobarCardFrontVisible();
      cy.wait(2000);

      comprobarCardBackVisible();
    });
    it("Si se selecciona la carta correcta: el color de la carta es verde y se suman 10 puntos al usuario. A continuación, continúa el juego. Si se selecciona una carta incorrecta el color es rojo y se termina el juego", () => {
      cy.mount(<App />);
      cambiarDificultadCombo("Difícil");
      clickBotonIniciarPartida();
      comprobarCardFrontVisible();
      cy.wait(2000);
      comprobarCardBackVisible();
      buscarCartaCorrecta();
      comprobarPuntosUsuario(30);
      comprobarCardFrontVisible();

      cy.wait(2000);

      comprobarCardBackVisible();

      buscarCartaIncorrecta();
      cy.get("[data-testid='componente-tablero-boton']").should("exist");
    });
  });
});
