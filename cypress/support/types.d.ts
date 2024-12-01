// cypress/support/types.d.ts
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to call the Agify API and get an age prediction.
     * @param name - The name for which to fetch the age prediction.
     * @example cy.getAgePrediction('John')
     */
    requestAgifyurl(name: string): Chainable<Cypress.Response<any>>;
    getAgePrediction(name: string): Chainable<Cypress.Response<any>>;
    sendBatchRequest(names: string[]): Chainable<Response>;
    sendIncorrectUrl(): Chainable<Response>;
  }
}