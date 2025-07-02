Feature: Loan Simulation

Background:
  * url baseUrl
  * header Accept = 'application/xml'

Scenario: Valid loan application

  * def customerId = 12656
  * def amount = 200
  * def downPayment = 50
  * def fromAccountId = 13899

  Given path '/requestLoan'
  And param customerId = customerId
  And param amount = amount
  And param downPayment = downPayment
  And param fromAccountId = fromAccountId

  When method POST
  Then status 200

  And match response /loanResponse/approved == 'true'
  And match response /loanResponse/loanProviderName contains 'Jiffy'
  And match response /loanResponse/accountId == '#string'

  * print '✅ Solicitud de préstamo aprobada:', response
