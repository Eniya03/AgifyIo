import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


let response: Cypress.Response<any>;

Given("the agify.io API is available", () => {
  cy.requestAgifyurl("").then((res) => {
    expect(res.status).to.eq(200);
  });
});

When("I send a request with the name {string}", (name: string) => {
  cy.getAgePrediction(name).as('response'); 
});



Then("the response status should be {int}", (statusCode: number) => {
  cy.get('@response').then((res: any) => {
    expect(res.status).to.eq(statusCode);
  });
});
 
Then("the response should include the name {string}", (name: string) => {
  cy.get('@response').then((res: any) => {
    expect(res.body).to.have.property("name", name);
  });
});

Then("the response should include an age", () => {
  cy.get('@response').then((res: any) => {
    expect(res.body).to.have.property("age");
  });
});


Then("the response should include an age prediction of null", () => {
  cy.get('@response').then((res: any) => {
    expect(res.body).to.have.property("age", null);
  });
});

Then('the response should include a count greater than {int}', (count: number) => {

  cy.get('@response').then((res: any) => {

    expect(res.body.count).to.be.greaterThan(count);

  });
});


Then('the response should include a count of {int}', (count: number) => {

  cy.get('@response').its('body.count').should('eq', count);

});

When('I send a request with the batch of names {string}', (namesString: string) => {
  // const names = JSON.parse(namesString); // Converting the Gherkin string to an array
  // const queryParams = names.map((name) => `name[]=${encodeURIComponent(name)}`).join('&'); // Constructing query parameters
  // const url = `https://api.agify.io/?${queryParams}`; // Constructing the full URL by combining the base URL, query parameters, and API key// Constructing the full URL by combining the base URL and query parameters

  // cy.request({
  //   method: 'GET',
  //   url: url,
  //   timeout: 90000, //Added wait as the response timedout
  // }).
  cy.sendBatchRequest(namesString).as('response').then((res) => {
    cy.wrap(res).as('response'); 
  });
});

Then('the response should include an array of results', () => {
  cy.get('@response').its('body').should('be.an', 'array');
});

Then('each result should include "name", "age", and "count" fields', () => {
  cy.get('@response').its('body').each((result) => {
    expect(result).to.have.all.keys('name', 'age', 'count');
  });
});


Given('I send an incorrect url', () => {
  cy.sendIncorrectUrl().then((res) => {
    response = res; 
  });
});



Then('the response should include an error message {string}', (errorMessage: string) => {
  cy.get('@response').its('body.error').should('eq', errorMessage);
});

Given("the agify.io API is mocked", () => {
  cy.mockRateLimitExceeded(); // calling Mocked API
});

When("I send more than 100 requests", () => {
  cy.request({
    method: "GET",
    url: "https://api.agify.io/?name=test",
    failOnStatusCode: false, // Prevent Cypress from failing the test on 429
  }).as("response");
});




