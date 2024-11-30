import { timeout } from "workbox-core/_private";

export const cambiarDificultadCombo = (dificultad) => {
  cy.get(".p-dropdown-trigger").should("exist").click();
  cy.get(".p-dropdown-items-wrapper")
    .children("ul")
    .children("li")
    .each((li) => {
      if (li[0].textContent == dificultad) {
        cy.wrap(li[0]).click();
      }
    });
};
export const comprobarCardFrontVisible = () => {
  cy.get("[data-testid='componente-tablero-container']>div").then((cards) => {
    for (const card of cards) {
      cy.get(card).get(".card-front").should("exist");
    }
  });
};
export const comprobarCardBackVisible = () => {
  cy.get("[data-testid='componente-tablero-container']>div").then((cards) => {
    for (const card of cards) {
      cy.get(card).get(".card-back").should("exist");
    }
  });
};
export const buscarCartaCorrecta = () => {
  cy.get("[data-testid='componente-tablero-numero-buscar']>span>strong")
    .invoke("text")
    .then((el) => {
      const numBuscar = el;
      cy.get(
        "[data-testid='componente-tablero-card_" + numBuscar + "']>div"
      ).click();
      cy.get("[data-testid='componente-tablero-card_" + numBuscar + "']", {
        timeout: 250,
      }).should("have.css", "background-color", "rgb(47, 139, 60)");
    });
};

export const buscarCartaIncorrecta = () => {
  cy.get("[data-testid='componente-tablero-numero-buscar']>span>strong")
    .invoke("text")
    .then((el) => {
      const numBuscarIncorrecto = +el !== 12 ? +el + 1 : +el - 1;
      cy.get(
        "[data-testid='componente-tablero-card_" +
          numBuscarIncorrecto +
          "']>div"
      ).click();

      cy.get(
        "[data-testid='componente-tablero-card_" + numBuscarIncorrecto + "']",
        { timeout: 250 }
      ).should("have.css", "background-color", "rgb(210, 10, 17)");
    });
};

export const comprobarPuntosUsuario = (puntos) => {
  cy.get("[data-testid='componente-tablero-puntos-usuario']").should(
    "have.text",
    "Puntos obtenidos: " + puntos
  );
};

export const accederUsuarioTest = () => {
  cy.get("[data-testid='pantalla_home']").should("exist");

  cy.get("[data-testid='pantalla_home_input']").type("Test");
  cy.get(".i-help").should("not.exist");
  cy.get("[data-testid='pantalla_home_boton']")
    .should("not.be.disabled")
    .click();
};

export const clickBotonIniciarPartida = () => {
  cy.get("[data-testid='componente-tablero-boton']").should("exist").click();
};

export const comprobarLocationCorrecta = (rutaEsperada) => {
  cy.location().should((location) => {
    expect(location.pathname).to.eq(rutaEsperada);
  });
};
