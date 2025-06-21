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

}
