const {expect} = require('@playwright/test');

class CheckoutPage {
    constructor(page){
        this.page = page;
        this.paymentInfoHeader = page.locator('div.payment__info');
        this.paymentInfoDetails = page.locator('[type="text"]');
        this.expiryDate = page.locator('.input.ddl');
        this.userEmailDisplayed = page.locator('.user__name [type="text"]');
        this.country = page.locator('[placeholder*="Country"]');
        this.dropdown = page.locator('.ta-results');
        this.placeOrderButton = page.locator('.action__submit');
    }

    async enterCheckOutDetails(creditcardNum, CVV, NameOnCard, expiry1, expiry2, countryName, countryName_Verify, userName){
        await this.paymentInfoHeader.waitFor();
        await this.paymentInfoDetails.nth(0).fill(creditcardNum);
        await this.paymentInfoDetails.nth(1).fill(CVV);
        await this.paymentInfoDetails.nth(2).fill(NameOnCard);
        await this.expiryDate.first().selectOption(expiry1);
        await this.expiryDate.last().selectOption(expiry2);
        const useremail = await this.userEmailDisplayed.first().textContent();
        //console.log(useremail);
        await expect(useremail).toContain(userName);

        //Enter value and select Country in dynamic dropdown
        await this.country.pressSequentially(countryName, {delay:150});
        await this.dropdown.waitFor();
        const dropdown = await this.dropdown;
        const options_Count = await dropdown.locator('[type="button"]').count();
        // console.log(options_Count);
        for (let i = 0; i<options_Count; i++){
            const Country_name = await dropdown.locator('[type="button"]').nth(i).textContent();
            if (Country_name === countryName_Verify){
                await dropdown.locator('[type="button"]').nth(i).click();
                break;
            }

        } 
    }

    async placeOrderOption(){
        await this.placeOrderButton.click();

    }

}

module.exports = {CheckoutPage};