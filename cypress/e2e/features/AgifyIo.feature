Feature: Agify API

@regression
  Scenario: User to be able to get age prediction for a valid name 
    Given the agify.io API is available
    When I send a request with the name "<name>"
    Then the response status should be 200
    And the response should include the name "<name>"
    And the response should include an age 
    And the response should include a count greater than 0

    Examples:
      | name  |
      | eniya |
      | ENIYA |
 @regression     
  Scenario: User should not be able to get age when nam is alphanumeric
    Given the agify.io API is available
    When I send a request with the name "Eniya@123"
    Then the response status should be 200
    And the response should include the name "Eniya@123"
    And the response should include an age prediction of null
    And the response should include a count of 0
@regression
  Scenario: User should not be able to get age when name is not a string
    Given the agify.io API is available
    When I send a request with the name "3344!!"
    Then the response status should be 200
    And the response should include the name "3344!!"
    And the response should include an age prediction of null
    And the response should include a count of 0

@regression
    Scenario: User should not  be able to see age prediction when name is not in database
    Given the agify.io API is available
    When I send a request with the name "<name>"
    Then the response status should be 200
    And the response should include an age prediction of null
    And the response should include a count of 0

    Examples:
     Examples:
      | name    |
      | Eniyyy  |
      | Davittt |
@regression
  Scenario: User should be able to get age prediction for names with spaces and diacritics
  Given the agify.io API is available
  When I send a request with the name "<name>"
  Then the response status should be 200
  And the response should include the name "<name>"
  And the response should include an age
  And the response should include a count greater than 0

  Examples:
    | name       |
    | John Doe   |
    | José       |   
@regression
    Scenario: User should get error message on incorrect url
    Given I send an incorrect url
    Then the response status should be 422
    And the response should include an error message "Missing 'name' parameter"
@regression 
    Scenario: User should be able to get age prediction for a batch of 10 names
    Given the agify.io API is available
    When I send a request with the batch of names "[\"Annie\", \"Jerry\", \"Mickey\", \"Tom\", \"Jane\", \"Emily\", \"Chris\", \"John\", \"eniya\", \"stuart\"]"
    Then the response status should be 200
    And the response should include an array of results
    And each result should include "name", "age", and "count" fields
 