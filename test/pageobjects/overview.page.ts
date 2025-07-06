import Page from "./page";

class OverviewPage extends Page {
  public get accounts() {
    return $$("//table//a");
  }
  public async logout() {
    const logoutButton= await $("/html/body/div[1]/div[3]/div[1]/ul/li[8]/a")
    return logoutButton.click();
  }

  public async getAccountBalance(accountId: number): Promise<number> {
    const accountsArray = await this.accounts;
    const accountTexts: string[] = [];
    
    for (const account of accountsArray) {
      const text = await account.getText();
      accountTexts.push(text);
    }
    
    const accountExists = accountTexts.includes(accountId.toString());

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
  public async openAccout(accountId: number) {
    const accountsArray = await this.accounts;
    const accountTexts: string[] = [];
    
    for (const account of accountsArray) {
      const text = await account.getText();
      accountTexts.push(text);
    }
    
    const accountExists = accountTexts.includes(accountId.toString());

    if (!accountExists) {
      return Promise.reject(`Account ${accountId} does not exist.`);
    }

    const el = await $(`//table//a[text()='${accountId}']`);
    return el.click();
  }

  public open() {
    return super.open("overview.htm");
  }
}

export default new OverviewPage();
