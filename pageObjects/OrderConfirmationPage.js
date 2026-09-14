const {expect} = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page){
        this.page = page;
        this.orderConfirmationMsg = page.locator('.hero-primary');
        this.OrderNum = page.locator('.em-spacer-1 .ng-star-inserted');

    }

    async verifyOrderConfirmation(){
        await expect(this.orderConfirmationMsg).toHaveText(" Thankyou for the order. ");
        const OrderID = await this.OrderNum.textContent();
        const order_num = OrderID.split(" ")[2];
        return order_num;

    }
}

module.exports = {OrderConfirmationPage};