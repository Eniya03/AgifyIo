import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Mock for Batch Limit Scenario
Given("the agify.io API is mocked with batch request", () => {
  cy.intercept("GET", "**/api*", (req) => {
    const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const names = queryParams.getAll("name[]");

    if (names.length > 10) {
      req.reply({
        statusCode: 422,
        body: { error: "Invalid 'name' parameter" },
      });
    }
  }).as("batchRequestMock");
});

When("I send a mock request with the batch of names {string}", (namesString: string) => {
      const names = JSON.parse(namesString); // Parse names into an array
      const queryParams = names.map((name) => `name[]=${encodeURIComponent(name)}`).join("&");
      cy.request({
        method: "GET",
        url: `https://api.agify.io/?${queryParams}`,
        failOnStatusCode: false, // Allow 422 response
      }).as("response");
    }
  );

Then("the mocked response status should be {int}", (statusCode: number) => {
    cy.get("@response").its("status").should("eq", statusCode);
  });
 

  Then("the mocked response should include an error message {string}", (errorMessage: string) => {
    cy.get('@response').its('body.error').should('eq', errorMessage);
  });

// Mock for Rate Limit Scenario
Given("the agify.io API is mocked with request limit 0", () => {
    cy.mockRateLimitExceeded(); // Mock the rate limit exceeded response
  });
  
  When("I send another mock request", () => {
    cy.request({
      method: "GET",
      url: "https://api.agify.io/?name=test",
      failOnStatusCode: false, // Prevent Cypress from failing the test on 429
    }).as("response");
  });
