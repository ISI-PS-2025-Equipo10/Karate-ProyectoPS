@parabank_login
Feature: Login to Parabank

  Background:
    * url baseUrl
    * header Accept = 'application/json'

  Scenario: Customer Login
    Given path 'login'
    And path 'juan' //userName
    And path 'caca' //password
    When method GET
    Then status 200
    And match response contains { id: '#number', firstName: '#string', lastName: '#string',address:{street: '#string', city: '#string', state: '#string', zipCode: '#string'}, phoneNumber: '#string', ssn: '#string' }
    And match header Cf-Ray != null
