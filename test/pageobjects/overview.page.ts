import Page from "./page";

class OverviewPage extends Page {
  public get accounts() {
    return $$("//table//a");
  }

  public async getAccountBalance(accountId: number): Promise<number> {
    const accountExists = await this.accounts.some(
      async (e) => (await e.getText()) === accountId.toString(),
    );

    if (!accountExists) {
      return Promise.reject(`Account ${accountId} does not exist.`);
    }

    const el = await $(
      `//table//tr/td/a[text()='${accountId}']/ancestor::td/following-sibling::td[1]`,
    );

    const balance = await el.getText().then((text) => text.replace("$", ""));
    return parseFloat(balance) ?? Promise.reject("Cant parse text.");
  }

  public async getAccounts(): Promise<number[]> {
    return await this.accounts.map((a) => a.getText().then((t) => parseInt(t)));
  }

  public open() {
    return super.open("overview.htm");
  }
}

export default new OverviewPage();
