const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
const testdata = JSON.parse(JSON.stringify(require('../testdata/Testdata_FirstTest.json')));

//Practise Excercise 1
//In a shoping website, find the product that matches the desired product and Select
//"Add to Cart" option for that product
test.only('E2E Script Dev Practise', async ({page}) =>
{
    //create object for POManager class
    const POManager_obj = new POManager(page);

    //Step1 - Login to the shopping application by entering valid user credentials
    //Create object for LoginPage Class and call methdods
    const loginPage_obj = POManager_obj.getLoginPage();
    await loginPage_obj.launchBrowser(testdata.url);
    await loginPage_obj.validLogin(testdata.userName, testdata.password);

    //Step 2 - Identify the desired product in the home page and add it to cart 
    const dashboardPage_obj = POManager_obj.getDashboardPage(); 
    await dashboardPage_obj.searchProduct_AddtoCart(testdata.product_name);
    await dashboardPage_obj.cartPage_Navigation();

    //Step 3 - Validate if the exact product is added in the "Cart" page & Select "Checkout"
    const cartPage_obj = POManager_obj.getCartPage();
    await cartPage_obj.verifyProductInCart(testdata.product_name);
    await cartPage_obj.checkout_Navigation();
    
    //Step 4: Enter payment & shipping information in Checkout page
    const checkoutPage_obj = POManager_obj.getCheckoutPage();
    await checkoutPage_obj.enterCheckOutDetails(testdata.creditcardNum, testdata.CVV, testdata.NameOnCard, testdata.expiry1, testdata.expiry2, testdata.countryName, testdata.countryName_Verify, testdata.userName);
    await checkoutPage_obj.placeOrderOption();
   
    //Step 5: Validate if "ThankYou for the order" message is displayed
    //Fetch the OrderID from the page
    const orderConfirmation_obj = POManager_obj.getOrderConfirmationPage();
    const order_num = await orderConfirmation_obj.verifyOrderConfirmation();
    //console.log(order_num);

    //Step 6: Goto 'Orders' page and find the exact orderID and select 'View' button 
    // for that orderID to View the Order details
    const OrderHistoryPage_obj = POManager_obj.getOrderHistoryPage();
    await OrderHistoryPage_obj.orderHistory_Navigation();
    await OrderHistoryPage_obj.viewOrderItem(order_num);   

    //Step 7: Select "View" option on the order number and Verify if order deatils 
    // are displayed correctly
    const view_OrderSummaryPage_obj = POManager_obj.getView_OrderSummaryPage();
    await view_OrderSummaryPage_obj.verifyOrderSummary(order_num, testdata.userName);   
    
}
);
