import React from "react";
import App from "../../src/App";
import {
  HOME_ROUTE,
  MEMORY_CARDS_ROUTE,
} from "../../src/interfaz/navegacion/routes";
import * as serviceWorkerRegistration from "../../src/serviceWorkerRegistration";
import {
  accederUsuarioTest,
  comprobarLocationCorrecta,
} from "../support/MemoryCards.helper";
describe("App: Carga ruta home por defecto", () => {
  it("La primera vez que se accede se muestra la ruta /home", () => {
    cy.mount(<App />);
    comprobarLocationCorrecta(HOME_ROUTE);

    cy.get("[data-testid='pantalla_home']").should("exist");
  });
  it("Si se intenta acceder desde otra ruta, navega a /home", () => {
    cy.mount(<App />);

    window.history.pushState({}, null, "/otra-ruta");
    cy.wait(100);
    comprobarLocationCorrecta(HOME_ROUTE);

    cy.get("[data-testid='pantalla_home']").should("exist");
  });
  it("Si se intenta acceder a la ruta /memory-cards sin estar autenticado, navega a /home", () => {
    cy.mount(<App />);

    window.history.pushState({}, null, MEMORY_CARDS_ROUTE);
    cy.wait(100);
    comprobarLocationCorrecta(HOME_ROUTE);

    cy.get("[data-testid='pantalla_home']").should("exist");
  });
});

describe("App: Es funcional offline", () => {
  const goOffline = () => {
    cy.log("**go offline**")
      .then(() => {
        return Cypress.automation("remote:debugger:protocol", {
          command: "Network.enable",
        });
      })
      .then(() => {
        return Cypress.automation("remote:debugger:protocol", {
          command: "Network.emulateNetworkConditions",
          params: {
            offline: true,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        });
      });
  };
  const goOnline = () => {
    cy.log("**go online**")
      .then(() => {
        // https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
        return Cypress.automation("remote:debugger:protocol", {
          command: "Network.emulateNetworkConditions",
          params: {
            offline: false,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        });
      })
      .then(() => {
        return Cypress.automation("remote:debugger:protocol", {
          command: "Network.disable",
        });
      });
  };
  it("Modo avión y probar que funciona la aplicación", () => {
    serviceWorkerRegistration.register();
    goOffline();
    cy.mount(<App />);
    accederUsuarioTest();
    cy.get("[data-testid='componente-tablero']").should("exist");
    cy.get("[data-testid='componente-tablero-boton']").should("exist");
    cy.get("[data-testid='componente-tablero-container']").should("not.exist");
    goOnline();
  });
});
