const {test, expect} = require('@playwright/test');

//To Validate how to navigate to "Google" browser and how to fetch page title
test('Browser context test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});


//To Validate how to do assertion for "Incorrect Username" message in Login Page
test('@Negative Page context test - Incorrect User details', async ({page}) => 
{
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator('#username').fill("rahulshetty");
    await page.locator('[name="password"]').fill("learning");
    await page.locator('[type="submit"]').click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText("Incorrect");

});

//To validate how to get the text content of all elements in the Home Page when there are 
// multiple elements present in the Homepage which have the same CSS properties
test('Login Page - Valid User Details', async ({page}) =>
{
 await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
 console.log(await page.title());
 await page.locator('#username').fill("rahulshettyacademy");
 await page.locator('[name="password"]').fill("Learning@830$3mK2");
 await page.locator('[type="submit"]').click();
 //console.log(await page.locator('.card-body a').nth(0).textContent());
 //console.log(await page.locator('.card-body a').nth(1).textContent());
 //console.log(await page.locator('.card-body a').nth(2).textContent());
 //console.log(await page.locator('.card-body a').nth(3).textContent());
 //console.log(await page.locator('.card-body a').first().textContent());
 //console.log(await page.locator('.card-body a').last().textContent());
 const cardtitles = await page.locator('.card-body a').allTextContents();
 console.log(cardtitles);
 //await page.locator('.card-body a').nth(0).click();
 //console.log(await page.locator('.jumbotron h1').textContent());
}

);

//To Validate how to select the first element in Home Page when there are 
// multiple elements present in the Home Page with same CSS properties
test('Practise Test1', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("test9001@gmail.com");
    await page.locator('[type="password"]').fill("Test@12345");
    await page.locator('#login').click();
    //await page.waitForLoadState("networkidle");
    await page.locator('.card-body b').first().waitFor();
    //console.log(await page.locator('.card-body b').nth(0).textContent());
    console.log(await page.locator('.card-body b').allTextContents());
}

);


//To Validate how to select values from Drop down option and Values from radiobutton option

test('DropDown and RadioButton Selection', async ({page}) =>
{
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    await page.locator('select.form-control').selectOption("teach");
    await page.pause();
    await page.locator('.radiotextsty').nth(1).click();
    await page.pause();
    await page.locator('#okayBtn').click();
}

);

//To Validate if a radiobutton is selected correctly and checkbox is checked correctly
test('Assertion for radiobutton', async ({page}) =>
{
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#usertype').nth(1).click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('#usertype').nth(1).isChecked());
    //assertion to verify if the radiobutton is selected or not
    await expect(page.locator('#usertype').nth(1)).toBeChecked();
    //How to select a checkbox
    await page.locator('#terms').check();
    //assertion to verify of the checkbox is checked
    await expect(page.locator('#terms')).toBeChecked();
    //How to uncheck a checkbox
    await page.locator('#terms').uncheck();
    console.log(await page.locator('#terms').isChecked());
    //assertion to verify if the checkbox is unchecked
    expect(await page.locator('#terms').isChecked()).toBeFalsy();  

}
);

//To validate a 'Blinking text' in the webpage
test('Blinking text Validation', async ({page}) =>
{
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    await expect(page.locator('[href*="documents-request"]')).toHaveAttribute("class", "blinkingText");
}
);

//To Validate child browser opened in a new web page and fetch the domain value from child browser
//and enter the value in the username field in main browser page

test('Child Browser Validation', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    //Executed asynchronously, until both the conditions are fullfilled. Only then it 
    // proceeds to line# 128
    const [newpage] = await Promise.all(
    [
    context.waitForEvent('page'),
    page.locator('[href*="documents-request"]').click(),
    ])

    const text = await newpage.locator('.red').textContent();
    const text1 = text.split("@");
    const domain = (text1[1].split(" "))[0];
    //page.pause();
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').inputValue());
}

);

//Practise Excercise 1
//In a shoping website, find the product that matches the desired product and Select
//"Add to Cart" option for that product
test.only('E2E Script Dev Practise', async ({page}) =>
{
    //Step1 - Login to the shopping application
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('#userEmail').fill("test9001@gmail.com");
    await page.locator('[type="password"]').fill("Test@12345");
    await page.locator('#login').click();

    //Step 2 - Identify the desired product in the home page and add it to cart
    const product_name = "ZARA COAT 3";
    await page.waitForLoadState("networkidle");
    const product_section = page.locator('.card-body');
    await product_section.first().waitFor();
    //Find the total count of products present in the page
    const product_count = await product_section.count();
    for (let i=0; i<product_count; i++){
        //If the product name matches the name "ZARA COAT 3",
        if ((await product_section.nth(i).locator('b').textContent()) === product_name){
            //Select the "Add to cart" option of that specific child item
            await product_section.nth(i).locator("text = Add To Cart").click();
            break;
        }

    }
    //await page.pause();

    //Step 3 - Validate if the exact product is added in the "Cart" page & Select "Checkout"
    await page.locator('[routerlink*="cart"]').click();
    await page.locator("div li").first().waitFor();
    const ProductExist_Flag = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    await expect(ProductExist_Flag).toBeTruthy();
    await page.locator("text = Checkout").click();

    //Step 4: Enter payment & shipping information in Checkout page
    await page.locator('div.payment__info').waitFor();
    console.log(await page.locator('[type="text"]').first().textContent());
    await page.locator('[type="text"]').nth(0).fill("4542 9931 9292 1121");
    await page.locator('[type="text"]').nth(1).fill("111");
    await page.locator('[type="text"]').nth(2).fill("Test123");
    await page.locator('.input.ddl').first().selectOption("05");
    await page.locator('.input.ddl').last().selectOption("20");
    const useremail = await page.locator('.user__name [type="text"]').first().textContent();
    //console.log(useremail);
    await expect(useremail).toContain("test9001@gmail.com");

    //Enter value and select Country in dynamic dropdown
    await page.locator('[placeholder*="Country"]').pressSequentially("ind", {delay:150});
    await page.locator('.ta-results').waitFor();
    const dropdown = await page.locator('.ta-results');
    const options_Count = await dropdown.locator('[type="button"]').count();
   // console.log(options_Count);
    for (let i = 0; i<options_Count; i++){
        const Country_name = await dropdown.locator('[type="button"]').nth(i).textContent();
        if (Country_name === " India"){
            await dropdown.locator('[type="button"]').nth(i).click();
            break;
        }

    }
    //Select 'Place Order' option
    await page.locator('.action__submit').click();
    //await page.pause(); 

    //Step 5: Validate if "ThankYou for the order" message is displayed
    //Fetch the OrderID from the page

    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    const OrderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const order_num = OrderID.split(" ")[2];
    //console.log(order_num);

    //Step 6: Goto 'Orders' page and find the exact orderID and select 'View' button 
    // for that orderID to View the Order details
    await page.locator('.btn-custom[routerlink*="myorders"]').click();
    await page.locator('.table-bordered').waitFor();
    const OrderList = page.locator('tr.ng-star-inserted');
    const orderItem_Count = await OrderList.count();
    console.log(orderItem_Count);
    for (let i=0; i<orderItem_Count; i++){
        //Match and find the exact OrderID
        const OrderNum = await OrderList.nth(i).locator('th').textContent();
        if (OrderNum === order_num){
            //Select "View" option of the matched OrderID
            await OrderList.nth(i).locator('.btn-primary').click();
            //await page.pause();
            break;
        }
    }

    //Step 7: Select "View" option on the order number and Verify if order deatils 
    // are displayed correctly
    await page.locator('div p.tagline').waitFor();
    const OrderID_Detailspage = await page.locator('.-main').textContent();
    await expect(order_num).toBe(OrderID_Detailspage);
    const billing_address = await page.locator('.address').first();
    const email_Detailspage = await billing_address.locator('.text').first().textContent();
    await expect(email_Detailspage).toContain("test9001@gmail.com");

    
}
);
