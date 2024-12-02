**Agifyio API Testing Framework**
---

This repository contains a Cypress-based test framework written in TypeScript and Cucumber to test the functionality of the Agify.io API. The framework implements BDD (Behavior-Driven Development) using Gherkin syntax, enabling a comprehensive and modular testing structure.The purpose of this test is to ensure that the API functions as expected.

---

## **Features**

1.API testing for the Agify.io API
2.Cucumber integration for BDD
3.Parameterized test cases for flexibility
4.Mocking capabilities for rate limits and batch requests
5.Scenarios for edge cases like names with diacritics, spaces, and invalid inputs
6.Fully compatible with CI/CD pipelines

---
## **Prerequisites**

Please make sure you have the following are installed on your system before running the test:

1. **Visual Studio Code**: or any IDE of your preferance.

2. **Node.js**: Version 14 or later(I have used v22.11.0). [Download Node.js here](https://nodejs.org/).

3. **npm**: Comes with Node.js, used for managing dependencies.

4. **Git**: To clone the repository. 

---

## **Instructions to run the test in your local machine**

1.Clone the repository:

      git clone https://github.com/Eniya03/Agifyio.git

2.Install the dependencies:

      npm install

 ### Using the API Key

I have added open API key inside cofig file for testing purpose as the 100 rate limit exhausted easily while testing.The key is hardcoded in the project for convenience of running in your local machine.
     
    
---
## **How to Run Tests**

**1\. Running Cypress Tests via the Test Runner**

Open the Cypress Test Runner to manually execute the tests:

    npx cypress open

This will launches the Cypress GUI, where you can select and run the test files, Select Browser as Chrome and select test to run.

**2\. Running Cypress Tests in Headless Mode**

Tests can be directly executed in the terminal (for CI/CD or faster testing):

    npx cypress run
    
 This will run the test in terminal and in case of error, console the error and stop the test.( press ^ + C ).

**3\. Running particular tests with Tags**

 I have seperated test cases as Regression, Batchlimit and Ratelimit to differentiate the purpose of the tests.Regression test will cover scenarios to test valid, invalid edgecase and speacial inputs. Response of Batchlimit and Ratelimit are mocked and tagged separately to test the API bahaviour and not to exhaust the rate limit at the same time.These tests can be run when needed and are a part of regression suite or need not be intergrated to CI/CD pipeline.

These tests can be ran on Test Runner or on Headless mode by using following commands:

To run tests with specific tag in Headless mode:
           
    npx cypress run --env TAGS='@batch'

example: npx cypress run --envTAGS='@ratelimit'   to run ratelimit scenario

To run tests with specific tag on Cypress Runner:

    npx cypress open --env TAGS='@batch'

example: npx cypress open --envTAGS='@ratelimit'

this command will enable us to run our desired test on Cypress Runner while skipping other tests

  
---
## **Test Scenarios**

The following scenarios are covered to test Agify.io API based on the inputs from this documentation( https://agify.io/documentation)

*1.Valid Inputs:* API should return 200 with guestimated age and a count on valid name including upper and lower case.

*2.Invalid Inputs:* API should still return 200 without age guestimation or count when input is not a string, Alphanumerics,empty names and names not present in database.

*3.Edge Cases:*  API should follow fall back approach and give age guestimation for names with diacritics and space(first and last name).

*4.Batch Requests:* API should give valid response for request with batch for inputs until 10 and fail for more than 10 inputs.

*5.Rate Limit:*  API has only a limit of 100 request per day for free users and it should fail on any request more than 100 on the same day.

*6.Incorrect Url:* API should fail gracefully with right error handling in place and meaningful error message.

*Scenarios not Scoped:* I have not automated to test countryid as country specific will also give guestimated response and it didnt seem to add more value to the test suite.
Tests to check authorization(Invalid API and expired API key)  can be scoped for future.

**Example Scenario in Gherkin Format**

       Scenario: User should get age prediction for a valid name
         Given the agify.io API is available
         When I send a request with the name "<name>"
         Then the response status should be 200
         And the response should include the name "<name>"
         And the response should include an age
         And the response should include a count greater than 0
---
## **Mocking**
  The framework uses cy.intercept() to mock:

     1.Rate limit responses (429 Too Many Requests)
     2.Batch requests with more than 10 names (422 Invalid 'name' parameter)
---
## **Directory Structure**

Here‚is a brief overview of the folder structure:

Agifyio/
├── cypress/
│   ├── e2e/               # Feature files and step definitions
│   ├── support/           # Custom commands, utilities and type configuration
│
├── .env                   # Environment variables
├── cypress.config.ts      # Cypress configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── README.md              # Documentation

---

## **Debugging and Logs**

1. **Interactive Mode**: Run npx cypress open for detailed logs during execution.
2. **Headless Mode Logs**:
    - Test logs are saved in the console.
    - Screenshots of failed tests are saved under cypress/screenshots.(this can also be pointed and stored in Azure Blobs)
    
---
## **CI/CD Integration**

Inorder to integrate Cypress tests into CI/CD pipeline:

1. Please add the following command to pipeline script:


       npx cypress run

2. Also kindly check the pipeline installs dependencies by including:


       npm install

---
## **Future Enhancements**

1. **mochawesome-report** : to generate test reports
2. **Allure reporting** : For enhanced test reports
3. **CI/CD Integration** :To streamline Automation tests with development workflows and make the process faster
4. **Plugin for Accessibility Testing** : Plugins like Applitools, Cypress-Axe enables us to perform Accessibility tests along with Functional Automation.

---
## **Test Results**

**Results of Testing Live API**

![Result 1](<Screenshot 2024-12-02 at 19.54.57.png>)

**Results of Testing Mocked API**

![Result 2](<Screenshot 2024-12-02 at 19.56.20.png>)

---
## **Test Summary**

The Functionality of the API is behaving as expected but there are minor defects which could be potentially correctled like giving an empty name/name not present in database gives a 200 response with age null, which could be handled better with error response codes and error messages.Sending a batch request of 10 names timed out and started working fine after a adding wait time , this indicates a potential Performance Issue (might be Higher Response Time issue) which can be investigated further by API performance testing.

---
## **Feedback** 

Any Feedbacks or suggestions are welcome and kindly let me know for any corrections or improvements!!

---
## **License**

This project is licensed under the MIT License.

---
## **Contact**

*Name:* Eniya Sundaram
*Email:* eniya.sundaram40@gmail.com

wishing to hear back from you!

---
