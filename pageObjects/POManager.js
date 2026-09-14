const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderConfirmationPage} = require('./OrderConfirmationPage');
const {OrderHistoryPage} = require('./OrderHistoryPage');
const {View_OrderSummaryPage} = require('./ViewOrderSummary');


class POManager{

    constructor(page){
        this.page = page;
        this.LoginPage = new LoginPage(page);
        this.DashboardPage = new DashboardPage(page);
        this.CartPage = new CartPage(page);
        this.CheckoutPage = new CheckoutPage(page);
        this.OrderConfirmationPage = new OrderConfirmationPage(page);
        this.OrderHistoryPage = new OrderHistoryPage(page);
        this.View_OrderSummaryPage = new View_OrderSummaryPage(page);
    }

    getLoginPage(){
        return this.LoginPage;
    }

    getDashboardPage(){
        return this.DashboardPage;
    }

    getCartPage(){
        return this.CartPage;
    }

    getCheckoutPage(){
        return this.CheckoutPage;
    }

    getOrderConfirmationPage(){
        return this.OrderConfirmationPage;

    }

    getOrderHistoryPage(){
        return this.OrderHistoryPage;
    }
     
    getView_OrderSummaryPage(){
        return this.View_OrderSummaryPage;
    }
}

module.exports = {POManager};