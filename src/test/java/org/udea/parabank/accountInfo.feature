@parabank_accountInfo
Feature: Account Information

    Background:
        * url baseUrl
        * header Accept = 'application/json'
        * def login = call read('login.feature')
    
    Scenario: Retrieve account information
        Given path 'customers', login.customerId, 'accounts'
        When method get
        Then status 200
        And match response[*].id != null
        And match response[*].type != null
        And match response[*].balance != null
        And match each response contains { id: '#number', customerId: '#number', type: '#string', balance: '#number' }
