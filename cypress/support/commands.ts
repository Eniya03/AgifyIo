/// <reference types="cypress" />

Cypress.Commands.add("getAgePrediction", (name: string) => {
    return cy.request({
      method: "GET",
      url: `https://api.agify.io/?name=${name}`,
    });
  });

  Cypress.Commands.add('sendBatchRequest', (names: string[]) => {
    const API_ENDPOINT = 'https://api.agify.io/';
    return cy.request({
      method: 'GET',
      url: API_ENDPOINT,
      qs: { 'name[]': names }, 
    });
  });

  Cypress.Commands.add('sendIncorrectUrl', () => {
    const incorrectUrl = 'https://api.agify.io/?'; 
    return cy.request({
      method: 'GET',
      url: incorrectUrl,
      failOnStatusCode: false, 
    }).then((res) => {
      cy.wrap(res).as('response'); // Alias the response
    });
  });