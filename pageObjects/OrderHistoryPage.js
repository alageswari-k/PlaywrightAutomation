class OrderHistoryPage {
    constructor(page){
        this.page = page;
        this.orderHistoryLink = page.locator('.btn-custom[routerlink*="myorders"]');
        this.orderHistorySection = page.locator('.table-bordered');
        this.orderList = page.locator('tr.ng-star-inserted');        
    }

    async orderHistory_Navigation(){
        await this.orderHistoryLink.click();
        await this.orderHistorySection.waitFor();

    }

    async viewOrderItem(order_num){    
        const OrderList = this.orderList;
        const orderItem_Count = await this.orderList.count();
        //console.log(orderItem_Count);
        for (let i=0; i<orderItem_Count; i++){
            //Match and find the exact OrderID
            const OrderNum = await this.orderList.nth(i).locator('th').textContent();
            if (OrderNum === order_num){
                //Select "View" option of the matched OrderID
                await this.orderList.nth(i).locator('.btn-primary').click();
                //await page.pause();
                break;
            }
        }
    }
}

module.exports = {OrderHistoryPage};