import { $ } from '@wdio/globals';
import Page from './page.js';

class PaymentsPage extends Page {

  public get nameInput() {
    return $("//input[@name='payee.name']");
  }

  public get addressInput() {
    return $("//input[@name='payee.address.street']");
  }

  public get cityInput() {
    return $("//input[@name='payee.address.city']");
  }

  public get stateInput() {
    return $("//input[@name='payee.address.state']");
  }

  public get zipCodeInput() {
    return $("//input[@name='payee.address.zipCode']");
  }

  public get phoneInput() {
    return $("//input[@name='payee.phoneNumber']");
  }

  public get accountInput() {
    return $("//input[@name='payee.accountNumber']");
  }

  public get verifyAccountInput() {
    return $("//input[@name='verifyAccount']");
  }

  public get amountInput() {
    return $("//input[@name='amount']");
  }

  public get fromAccountSelect() {
    return $("//select[@name='fromAccountId']");
  }

  public get sendPaymentButton() {
    return $("//input[@type='button' and @value='Send Payment']");
  }

  public get resultPanel() {
    return $("//div[@id='billpayResult']");
  }

  public get resultPayeeName() {
    return $("//span[@id='payeeName']");
  }

  public get resultAmount() {
    return $("//span[@id='amount']");
  }

  public get resultAccountId() {
    return $("//span[@id='fromAccountId']");
  }

  public get errorAccountEmpty() {
    return $("//span[@id='validationModel-account-empty']");
  }

  public get errorAmountInvalid() {
    return $("//span[@id='validationModel-amount-invalid']");
  }

  public get errorVerifyAccountMismatch() {
    return $("//span[@id='validationModel-verifyAccount-mismatch']");
  }

  public async fillPaymentForm({
    name,
    address,
    city,
    state,
    zipCode,
    phone,
    account,
    verifyAccount,
    amount,
    fromIndex = 0,
  }: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    account: string;
    verifyAccount: string;
    amount: string;
    fromIndex?: number;
  }) {
    await this.nameInput.setValue(name);
    await this.addressInput.setValue(address);
    await this.cityInput.setValue(city);
    await this.stateInput.setValue(state);
    await this.zipCodeInput.setValue(zipCode);
    await this.phoneInput.setValue(phone);
    await this.accountInput.setValue(account);
    await this.verifyAccountInput.setValue(verifyAccount);
    await this.amountInput.setValue(amount);
    await this.fromAccountSelect.selectByIndex(fromIndex);
  }

  public async submitPayment() {
    await this.sendPaymentButton.click();
  }

  public open() {
    return super.open('billpay.htm');
  }
}

export default new PaymentsPage();
