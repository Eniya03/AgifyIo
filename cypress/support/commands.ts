/// <reference types="cypress" />
//const apiKey = Cypress.env("apikey")
const apiKey = Cypress.env("API_KEY");

//Custom Command to check if the URL is available
Cypress.Commands.add('requestAgifyurl', (name) => {
  cy.request(`https://api.agify.io/?name=${name}&apikey=${apiKey}`);
});

//Custom Command to request for age prediction with Valid String as Name
Cypress.Commands.add("getAgePrediction", (name: string) => {
  const encodedName = encodeURIComponent(name); //encodeURI to handle diacritics and spaces
  ; //API Key
    return cy.request({
      method: "GET",
      url: `https://api.agify.io/?name=${encodedName}&apikey=${apiKey}`,
      failOnStatusCode: false,
    });
  });

  //Custom Command to send a request with a batch of names(edge case 10, negative scenario >10)
  Cypress.Commands.add('sendBatchRequest', (namesString: string) => {
    const names = JSON.parse(namesString); // Converting the Gherkin string to an array
    const queryParams = names.map((name) => `name[]=${encodeURIComponent(name)}`).join('&'); 
    const url = `https://api.agify.io/?${queryParams}&apikey=${apiKey}`; // Constructing the full URL by combining the base URL, query parameters, and API key
  
    cy.request({
      method: 'GET',
      url: url,
      timeout: 90000, //Added wait as the response timedout
    }).then((res) => {
      cy.wrap(res).as('response'); 
    });
  });

  //Custom Command to a send a incorrect request (to check error handling)

  Cypress.Commands.add('sendIncorrectUrl', () => {
    const incorrectUrl = 'https://api.agify.io/?'; 
    return cy.request({
      method: 'GET',
      url: incorrectUrl,
      failOnStatusCode: false, 
    }).then((res) => {
      cy.wrap(res).as('response'); 
    });
  });
//Command to simulate rate limit exceeded by making x-rate-limit-remaining 0 & intercepting the request
  Cypress.Commands.add("mockRateLimitExceeded", () => {
    cy.intercept("GET", 'https://api.agify.io/?name=test', {
      statusCode: 429,
      body: {
        error: "Too Many Requests",
      },
      headers: {
        "x-rate-limit-limit": "100", // Total limit
        "x-rate-limit-remaining": "0", // Intercepted Remaining requests
      },
    }).as("rateLimitExceeded");
  });
  

  
  //Command to mock the batch request with more than 10 names

Cypress.Commands.add("mockBatchRequest", () => {
  cy.intercept("GET", "https://api.agify.io/*", (req) => {
    const reqParam = new URLSearchParams (req.url.split("?")[1]);
    const names = reqParam.getAll("name[]");
    if (names.length > 10) {
      req.reply({
        statusCode: 422,
        body: {
          error: "Invalid 'name' parameter",
        },
      });
    }
   }).as("mockBatchRequest");
});



