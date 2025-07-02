Feature: Billpay

Background:
  * url baseUrl
  * header Accept = 'application/json'

Scenario: Pay bill with insufficient funds
  * def accountId = 18117
  * def montoInsuficiente = 1000 

  Given path '/billpay'
  And param accountId = accountId
  And param amount = montoInsuficiente
  And request
  """
  {
    "name": "Juan Pérez",
    "address": {
      "street": "Calle 123",
      "city": "Bogotá",
      "state": "Cundinamarca",
      "zipCode": "110111"
    },
    "phoneNumber": "3001234567",
    "accountNumber": 12345
  }
  """
  When method POST
  Then status 400
  And match response.message contains 'insuficiente'
