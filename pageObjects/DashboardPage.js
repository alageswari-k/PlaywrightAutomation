class DashboardPage {

    constructor(page){
        this.page = page;
        this.product_section = page.locator('.card-body');
        this.cartLink = page.locator('[routerlink*="cart"]');

    }

    async searchProduct_AddtoCart(product_name){
        await this.product_section.first().waitFor();
        //Find the total count of products present in the page
        const product_count = await this.product_section.count();
        for (let i=0; i<product_count; i++){
            //If the product name matches the name "ZARA COAT 3",
            if ((await this.product_section.nth(i).locator('b').textContent()) === product_name){
                //Select the "Add to cart" option of that specific child item
                await this.product_section.nth(i).locator("text = Add To Cart").click();
                break;
            }
    
        }

    }

    async cartPage_Navigation(){
        await this.cartLink.click();

    }

}

module.exports = {DashboardPage};