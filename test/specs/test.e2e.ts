import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import SecurePage from "../pageobjects/secure.page.js";
import OverviewPage from "../pageobjects/overview.page.js";
import TransferPage from "../pageobjects/transfer.page.js";

describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("john", "demo");
    await expect(SecurePage.welcomeMessage).toBeExisting();
    await expect(SecurePage.welcomeMessage).toHaveText(
      expect.stringContaining("Welcome"),
    );
  });
});

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

  it("should allow entering payment details and show confirmation", async () => {
    await TransferPage.open();

    const amount = 100;
    const from = accounts[0];
    const to = accounts[1];

    await TransferPage.amountInput.waitForDisplayed({ timeout: 5000 });
    await TransferPage.makeTransfer(amount, from, to);

    await expect(TransferPage.successMessage).toBeDisplayed();

    await expect(await TransferPage.amountResult.getText()).toBe(`$${amount.toFixed(2)}`);
    await expect(await TransferPage.fromAccountIdResult.getText()).toBe(from.toString());
    await expect(await TransferPage.toAccountIdResult.getText()).toBe(to.toString());
  });

  it("should show error message on invalid transfer", async () => {
    await TransferPage.open();

    await TransferPage.amountInput.waitForDisplayed({ timeout: 5000 });
    await TransferPage.amountInput.setValue("");
    await TransferPage.submitBtn.click();

    await expect(TransferPage.errorMessage).toBeDisplayed();
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
    await expect(msg).toContain('We cannot grant a loan in that amount with your available funds and down payment.');
  });
});




