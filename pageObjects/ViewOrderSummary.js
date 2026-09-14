const {expect} = require('@playwright/test');

    class View_OrderSummaryPage{
        constructor(page){
            this.page = page;
            this.orderSummarySection = page.locator('div p.tagline');
            this.orderID = page.locator('.-main');
            this.billingAddress = page.locator('.address');
        }

        async verifyOrderSummary(order_num, userName){
                await this.orderSummarySection.waitFor();
                const OrderID_Detailspage = await this.orderID.textContent();
                await expect(order_num).toBe(OrderID_Detailspage);
                const billing_address = await this.billingAddress.first();
                const email_Detailspage = await billing_address.locator('.text').first().textContent();
                await expect(email_Detailspage).toContain(userName);
        }

}

module.exports = {View_OrderSummaryPage};