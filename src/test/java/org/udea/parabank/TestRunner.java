package org.udea.parabank;

import com.intuit.karate.junit5.Karate;

class TestRunner {

  @Karate.Test
  Karate test01_ParabankLogin() {
    return Karate.run("login")
        .relativeTo(getClass())
        .outputCucumberJson(true);
  }

  @Karate.Test
  Karate test02_ParabankAccountInfo() {
    return Karate.run("accountInfo")
        .relativeTo(getClass())
        .outputCucumberJson(true);
  }

  @Karate.Test
  Karate test03_ParabankMoneyTransfer() {
    return Karate.run("moneyTransfer")
        .relativeTo(getClass())
        .outputCucumberJson(true);
  }

  @Karate.Test
  Karate test04_ParabankBillpay() {
    return Karate.run("billpay")
        .relativeTo(getClass())
        .outputCucumberJson(true);
  }

  @Karate.Test
  Karate test05_ParabankLoanSimulation() {
    return Karate.run("loanSimulation")
        .relativeTo(getClass())
        .outputCucumberJson(true);
  }

}
