Feature: Agify API

As a User
I should not be able to hit more than 100 requests or more than 10 names in a batch
so that I can confirm API rate limit and batch limit

@batchlimit 
    Scenario: User should be able to get age prediction for a batch of more than 10 names
    Given the agify.io API is mocked with batch request
    When I send a mock request with the batch of names "[\"Annie\", \"Jerry\", \"Mickey\", \"Tom\", \"Jane\", \"Emily\", \"eniya\", \"stuart\", \"jeeva\", \"sirpi\", \"divya\", \"manoj\"]"
    Then the mocked response status should be 422
    And the mocked response should include an error message "Invalid 'name' parameter"

@ratelimit
    Scenario: User should get error message when rate limit is exceeded
    Given the agify.io API is mocked with request limit 0
    When I send another mock request
    Then the response status should be 429
    And the mocked response should include an error message "Request limit reached"