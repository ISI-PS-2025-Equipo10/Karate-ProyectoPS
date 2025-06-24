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
