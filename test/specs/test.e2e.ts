import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import SecurePage from "../pageobjects/secure.page.js";
import OverviewPage from "../pageobjects/overview.page.js";
import TransferPage from "../pageobjects/transfer.page.js";
import accountDetailsPage from "../pageobjects/accountDetails.page.js";
import overviewPage from "../pageobjects/overview.page.js";
import PaymentsPage from '../pageobjects/payments.page.ts';


describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("john", "demo");
    await expect(SecurePage.welcomeMessage).toBeExisting();
    await expect(SecurePage.welcomeMessage).toHaveText(
      expect.stringContaining("Welcome"),
    );
  });
  it("should not login with invalid credentials", async () => {
    await overviewPage.logout();
    await LoginPage.open();
    await LoginPage.login("invalidUser", "invalidPassword");
    await expect(LoginPage.errorMessage).toBeExisting();
    await expect(LoginPage.errorMessage).toHaveText(
      expect.stringContaining("The username and password could not be verified."),
    );
  });
});


describe("Account consultation", () => {
  let accounts: number[];

  before(async () => {
    await LoginPage.open();
    const notLoggedIn = await LoginPage.btnSubmit.isExisting();
    if (notLoggedIn) {
      await LoginPage.login("john", "demo");
    }

    await OverviewPage.open();
    console.log(OverviewPage.accounts);

    await expect(await OverviewPage.accounts[1]).toBeExisting();
    accounts = await OverviewPage.getAccounts();
  });
  it("should display accounts", async () => {
    await OverviewPage.open();
    await expect(OverviewPage.accounts[0]).toBeExisting();
    await expect(accounts.length).toBeGreaterThanOrEqual(2);
  });
  it("should display account balance", async () => {
    await OverviewPage.open();
    await expect(OverviewPage.accounts[0]).toBeExisting();

    const balance = await OverviewPage.getAccountBalance(accounts[0]);
    console.log(`Account ${accounts[0]} balance: $${balance}`);
    await expect(typeof balance).toBe('number');
  });
  it("should open account details", async () => {
    await OverviewPage.open();
    await expect(OverviewPage.accounts[0]).toBeExisting();
    await OverviewPage.openAccout(accounts[0]);
    await expect(accountDetailsPage.accountId).toBeExisting();
    await expect(accountDetailsPage.accountId).toHaveText(
      expect.stringContaining(accounts[0].toString()),
    );
  });
})


describe("Account transfer", () => {
  let accounts: number[];

  before(async () => {
    await LoginPage.open();
    const notLoggedIn = await LoginPage.btnSubmit.isExisting();
    if (notLoggedIn) {
      await LoginPage.login("john", "demo");
    }

    await OverviewPage.open();
    console.log(OverviewPage.accounts);

    await expect(await OverviewPage.accounts[0]).toBeExisting();
    accounts = await OverviewPage.getAccounts();
    await expect(accounts.length).toBeGreaterThanOrEqual(2);
  });

  it("should transfer between my accounts", async () => {
    await TransferPage.open();
    await TransferPage.makeTransfer(69, accounts[0], accounts[1]);
    await expect(TransferPage.successMessage).toBeExisting();
  });

  it("should validate balance before transfer", async () => {
    await OverviewPage.open();
    await expect(OverviewPage.accounts[0]).toBeExisting();

    const overAmount =
      (await OverviewPage.getAccountBalance(accounts[1])) + 100;

    await TransferPage.open();
    await TransferPage.makeTransfer(overAmount, accounts[1], accounts[0]);
    await expect(TransferPage.successMessage).not.toBeExisting({ wait: 1000 });
  });
});


describe("Payments", () => {
  before(async () => {
    await LoginPage.open();
    const notLoggedIn = await LoginPage.btnSubmit.isExisting();
    if (notLoggedIn) {
      await LoginPage.login("john", "demo");
    }
  });

  it("should allow entering beneficiary account and payment amount", async () => {
    await PaymentsPage.open();

    await PaymentsPage.fillPaymentForm({
      name: "Carlos Pérez",
      address: "Cra 45 #123",
      city: "Bogotá",
      state: "Cundinamarca",
      zipCode: "110111",
      phone: "3114567890",
      account: "12345",
      verifyAccount: "12345",
      amount: "50000"
    });

    console.log("Confirmación de datos antes de enviar:");
    console.log("Cuenta beneficiario:", await PaymentsPage.accountInput.getValue());
    console.log("Monto:", await PaymentsPage.amountInput.getValue());

    await PaymentsPage.submitPayment();

    await PaymentsPage.resultPanel.waitForDisplayed({ timeout: 5000 });
    await expect(PaymentsPage.resultPanel).toBeDisplayed();
    await expect(PaymentsPage.resultPayeeName).toHaveText("Carlos Pérez");
    await expect(PaymentsPage.resultAmount).toHaveText("$50000.00");
  });

  it("should show error if account number is missing", async () => {
    await PaymentsPage.open();

    await PaymentsPage.fillPaymentForm({
      name: "Carlos Pérez",
      address: "Calle 10",
      city: "Medellín",
      state: "Antioquia",
      zipCode: "050001",
      phone: "3121234567",
      account: "",
      verifyAccount: "12345",
      amount: "10000"
    });

    await PaymentsPage.submitPayment();

    await expect(PaymentsPage.errorAccountEmpty).toBeDisplayed();
  });

  it("should show error if amount is invalid", async () => {
    await PaymentsPage.open();

    await PaymentsPage.fillPaymentForm({
      name: "Carlos Pérez",
      address: "Calle 10",
      city: "Medellín",
      state: "Antioquia",
      zipCode: "050001",
      phone: "3121234567",
      account: "12345",
      verifyAccount: "12345",
      amount: "abc"
    });

    await PaymentsPage.submitPayment();

    await expect(PaymentsPage.errorAmountInvalid).toBeDisplayed();
  });

  it("should show error if account verification fails", async () => {
    await PaymentsPage.open();

    await PaymentsPage.fillPaymentForm({
      name: "Carlos Pérez",
      address: "Calle 10",
      city: "Cali",
      state: "Valle",
      zipCode: "760001",
      phone: "3109999999",
      account: "12345",
      verifyAccount: "54321",
      amount: "30000"
    });

    await PaymentsPage.submitPayment();

    await expect(PaymentsPage.errorVerifyAccountMismatch).toBeDisplayed();
  });
});


  describe("Loan request", () => {
  let accounts: number[];

  before(async () => {
    await LoginPage.open();
    if (await LoginPage.btnSubmit.isExisting()) {
      await LoginPage.login("john", "demo");
    }


    await OverviewPage.open();
    console.log(OverviewPage.accounts);

    await expect(await OverviewPage.accounts[0]).toBeExisting();
    accounts = await OverviewPage.getAccounts();
    await expect(accounts.length).toBeGreaterThanOrEqual(2);
  });

  it("should approve loan with valid loanAmount and down payment", async () => {
    const fromAccount = accounts[0];
    await SecurePage.open();
    await SecurePage.requestLoan(1000, 100, fromAccount);

    await browser.waitUntil(
      async () =>
        (await SecurePage.loanApprovedMsg.isDisplayed()) ||
        (await SecurePage.loanDeniedMsg.isDisplayed()) ||
        (await SecurePage.loanErrorPanel.isDisplayed()),
      {
        timeout: 5000,
        timeoutMsg: "Expected result message to appear",
      }
    );

    await expect(SecurePage.loanApprovedMsg).toBeDisplayed();
    const msg = await SecurePage.loanApprovedMsg.getText();
    await expect(msg).toContain("Congratulations");
  });

  it("should deny loan: insufficient funds for the given down payment", async () => {
    const fromAccount = accounts[0];
    await SecurePage.open();
    await SecurePage.requestLoan(1000, 999999, fromAccount); 

    await browser.waitUntil(
      async () => (await $('#loanRequestDenied')).isDisplayed(),
      { timeout: 5000, timeoutMsg: "Expected denial message to appear" }
    );

    const msg = await $('#loanRequestDenied p.error').getText();
    await expect(msg).toContain('You do not have sufficient funds for the given down payment.');
  });

  it("should deny loan: insufficient funds and down payment", async () => {
    const fromAccount = accounts[0];
    await SecurePage.open();
    await SecurePage.requestLoan(999999, 10, fromAccount);

    await browser.waitUntil(
      async () => (await $('#loanRequestDenied')).isDisplayed(),
      { timeout: 5000, timeoutMsg: "Expected denial message to appear" }
    );

    const msg = await $('#loanRequestDenied p.error').getText();
    await expect(msg).toContain('We cannot grant a loan in that amount with your available funds.');
  });
});




