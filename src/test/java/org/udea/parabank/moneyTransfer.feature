Feature: Money transfer between accounts
    Background:
        * url baseUrl
        * header Accept = 'application/json'
        * def accountInfo = call read('accountInfo.feature')
        * def from = accountInfo.accounts[0].id
        * def to = accountInfo.accounts[1].id
        * assert from != null && to != null
        * print from, to
    
    Scenario: Transfer between accounts
        Given path 'transfer'
        When params ( {fromAccountId: from, toAccountId: to, amount: 100} )
        And method POST
        Then status 200
        And match response contains 'Success'

    Scenario: Validate balance before transfer
        Given path 'transfer'
        And def overAmount = accountInfo.accounts[0].balance + 1000
        When params ( {fromAccountId: from, toAccountId: to, amount: overAmount} )
        And method POST
        Then status == 400 
