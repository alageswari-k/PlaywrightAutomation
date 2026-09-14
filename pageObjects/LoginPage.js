
class LoginPage {
    constructor(page){
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('[type="password"]');
        this.loginButton = page.locator('#login');

    }

    //launchBrowser method to launch the desired browser url
    async launchBrowser(url){
        await this.page.goto(url);
    }

    //validLogin method to enter valid user credentials and login to the browser
    async validLogin(userName, password){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}

module.exports = {LoginPage};