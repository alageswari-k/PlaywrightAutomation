const {expect} = require('@playwright/test');

class CartPage {
    constructor(page){
        this.page = page;
        this.cartpageheader = page.locator("div li");
        //this.ProductExist_Flag = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutbutton = page.locator("text = Checkout");

    }

    async verifyProductInCart(product_name){
        await this.cartpageheader.first().waitFor();
        const ProductExist_Flag = await this.page.locator('h3', {hasText: product_name}).isVisible();
        await expect(ProductExist_Flag).toBeTruthy();
        
    }

    async checkout_Navigation(){
        await this.checkoutbutton.click();
    }

}

module.exports = {CartPage};