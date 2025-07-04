import { $ } from '@wdio/globals';
import Page from './page.js';

class SecurePage extends Page {
  public get welcomeMessage() {
    return $('//html/body/div[1]/div[3]/div[1]/p/b');
  }
  
  public get inputLoanAmount() { 
    return $("//input[@id='amount']"); 
  } 
  
  public get inputDownPayment() { 
    return $("//input[@id='downPayment']"); 
  }
  
  public get loanAccountSelect() { 
    return $("//select[@id='fromAccountId']"); 
  }
  
  public get applyLoanButton() { 
    return $("//input[@type='button' and @value='Apply Now']"); 
  }
  
  public get loanApprovedMsg() { 
    return $("//div[@id='loanRequestApproved']/p"); 
  }
  
  public get loanDeniedMsg() { 
    return $("//div[@id='loanRequestDenied']/p[@class='error']"); 
  }

  public get loanStatus() {
    return $("//span[@id='loanStatus']");
  }
  
  public get loanErrorPanel() { 
    return $("//div[@id='requestLoanError']"); 
  }
  
  public async requestLoan(loanAmount: number, downPayment: number, accountId: number) {
    await this.inputLoanAmount.setValue(loanAmount.toString());
    await this.inputDownPayment.setValue(downPayment.toString());
    await this.loanAccountSelect.selectByVisibleText(accountId.toString());
    await this.applyLoanButton.click(); 
  }

  public open() {
    return super.open('requestloan.htm');
  }
}

export default new SecurePage();
