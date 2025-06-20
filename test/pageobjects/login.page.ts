import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('/html/body/div[1]/div[3]/div[1]/div/form/div[1]/input');
    }

    public get inputPassword () {
        return $('/html/body/div[1]/div[3]/div[1]/div/form/div[2]/input');
    }

    public get btnSubmit () {
        return $('/html/body/div[1]/div[3]/div[1]/div/form/div[3]/input');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('index.htm');
    }
}

export default new LoginPage();
