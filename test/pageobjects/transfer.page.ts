import Page from "./page.js";

class TransferPage extends Page {
  public get amountInput() {
    return $("//input[@id='amount']");
  }

  public get fromAccountSelect() {
    return $("//select[@id='fromAccountId']");
  }

  public get toAccountSelect() {
    return $("//select[@id='toAccountId']");
  }

  public get submitBtn() {
    return $("//input[@type='submit']");
  }

  public get successMessage() {
    return $("//div[@id='showResult' and not(contains(@style, 'display: none'))]");
  }

  public get errorMessage() {
    return $("//div[@id='showError' and not(contains(@style, 'display: none'))]");
  }

  public get amountResult() {
    return $("//span[@id='amountResult']");
  }

  public get fromAccountIdResult() {
    return $("//span[@id='fromAccountIdResult']");
  }

  public get toAccountIdResult() {
    return $("//span[@id='toAccountIdResult']");
  }

  public async makeTransfer(amount: number, from: number, to: number) {
    await this.amountInput.setValue(amount.toString());
    await this.fromAccountSelect.selectByVisibleText(from.toString());
    await this.toAccountSelect.selectByVisibleText(to.toString());
    await this.submitBtn.click();
  }

  public open() {
    return super.open("transfer.htm");
  }
}

export default new TransferPage();
