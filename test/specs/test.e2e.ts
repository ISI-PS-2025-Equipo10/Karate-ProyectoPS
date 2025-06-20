import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        await LoginPage.login('john', 'demo')
        await expect(SecurePage.welcomeMessage).toBeExisting()
        await expect(SecurePage.welcomeMessage).toHaveText(
            expect.stringContaining('Welcome'))
    })
})

