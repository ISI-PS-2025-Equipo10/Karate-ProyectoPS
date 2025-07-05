import Page from "./page";
class AccountDetailsPage extends Page {
    public get accountId() {
        return $("/html/body/div[1]/div[3]/div[2]/div/div[1]/table/tbody/tr[1]/td[2]");
    }
}
export default new AccountDetailsPage();