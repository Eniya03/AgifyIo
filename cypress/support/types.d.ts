// cypress/support/types.d.ts
declare namespace Cypress {
  interface Chainable {
    
     //Custom commands to call the Agify API and get an age prediction.
    
  
    requestAgifyurl(name: string): Chainable<Cypress.Response<any>>;
    getAgePrediction(name: string): Chainable<Cypress.Response<any>>;
    sendBatchRequest(namesString: string): Chainable<Response>;
    sendIncorrectUrl(): Chainable<Response>;
    mockRateLimitExceeded(): Chainable<void>;
    mockBatchRequest(): Chainable<void>;
  }
}