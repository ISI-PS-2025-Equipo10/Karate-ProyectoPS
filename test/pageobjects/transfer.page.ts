import Page from "./page.js";

class TransferPage extends Page {
  public get amountInput() {
    return $("//input[@id='amount']");
  }

  public get fromAccoundSelect() {
    return $("//select[@id='fromAccountId']");
  }

  public get toAccountSelect() {
    return $("//select[@id='toAccountId']");
  }

  public get submitBtn() {
    return $("//input[@type='submit']");
  }

  public get successMessage() {
    return $("//body//*[contains(text(), 'Transfer Complete')]");
  }

  public async makeTransfer(amount: number, from: number, to: number) {
    await this.amountInput.setValue(amount);
    await this.fromAccoundSelect.selectByVisibleText(from);
    await this.toAccountSelect.selectByVisibleText(to);
    await this.submitBtn.click();
  }

  public open() {
    return super.open("transfer.htm");
  }
}

export default new TransferPage();
