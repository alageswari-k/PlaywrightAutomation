const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageObjects/LoginPage');
const {DashboardPage} = require('../pageObjects/DashboardPage');
const {CartPage} = require('../pageObjects/CartPage');
const {CheckoutPage} = require('../pageObjects/CheckoutPage');
const {OrderConfirmationPage} = require('../pageObjects/OrderConfirmationPage');
const {OrderHistoryPage} = require('../pageObjects/OrderHistoryPage');
const {View_OrderSummaryPage} = require('../pageObjects/ViewOrderSummary');

//Practise Excercise 1
//In a shoping website, find the product that matches the desired product and Select
//"Add to Cart" option for that product
test.only('E2E Script Dev Practise', async ({page}) =>
{
    
    const url = "https://rahulshettyacademy.com/client/";
    const userName = "test9001@gmail.com";
    const password = "Test@12345";
    const product_name = "ZARA COAT 3";
    const creditcardNum = "4542 9931 9292 1121";
    const CVV = "111";
    const NameOnCard = "Test123";
    const expiry1 = "05";
    const expiry2 = "20";
    const countryName = "ind";
    const countryName_Verify = " India";

    //Step1 - Login to the shopping application by entering valid user credentials
    //Create object for LoginPage Class and call methdods
    const loginPage_obj = new LoginPage(page);
    await loginPage_obj.launchBrowser(url);
    await loginPage_obj.validLogin(userName, password);

    //Step 2 - Identify the desired product in the home page and add it to cart 
    const dashboardPage_obj = new DashboardPage(page); 
    await dashboardPage_obj.searchProduct_AddtoCart(product_name);
    await dashboardPage_obj.cartPage_Navigation();

    //Step 3 - Validate if the exact product is added in the "Cart" page & Select "Checkout"
    const cartPage_obj = new CartPage(page);
    await cartPage_obj.verifyProductInCart(product_name);
    await cartPage_obj.checkout_Navigation();
    
    //Step 4: Enter payment & shipping information in Checkout page
    const checkoutPage_obj = new CheckoutPage(page);
    await checkoutPage_obj.enterCheckOutDetails(creditcardNum, CVV, NameOnCard, expiry1, expiry2, countryName, countryName_Verify, userName);
    await checkoutPage_obj.placeOrderOption();
   
    //Step 5: Validate if "ThankYou for the order" message is displayed
    //Fetch the OrderID from the page
    const orderConfirmation_obj = new OrderConfirmationPage(page);
    const order_num = await orderConfirmation_obj.verifyOrderConfirmation();
    //console.log(order_num);

    //Step 6: Goto 'Orders' page and find the exact orderID and select 'View' button 
    // for that orderID to View the Order details
    const OrderHistoryPage_obj = new OrderHistoryPage(page);
    await OrderHistoryPage_obj.orderHistory_Navigation();
    await OrderHistoryPage_obj.viewOrderItem(order_num);   

    //Step 7: Select "View" option on the order number and Verify if order deatils 
    // are displayed correctly
    const view_OrderSummaryPage_obj = new View_OrderSummaryPage(page);
    await view_OrderSummaryPage_obj.verifyOrderSummary(order_num, userName);   
    
}
);
