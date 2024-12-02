import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// active subscription -6babfe846558cc2cd6d9536cedd91d2d

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


