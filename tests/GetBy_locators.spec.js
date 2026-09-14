const {test, expect} = require('@playwright/test');

//Includes GetByRole, GetByPlaceHolder, GetByLabel, GetByText, 
// Expect timeout configuration settings - Test level & Step Level

test('GetBy locators practise', async ({page}) =>
{
    //test level - 'Test' timeout setting
    test.setTimeout(60_000);
    //test level - 'Expect' timeout setting
    const newexpect = expect.configure({timeout : 9000});
    //Test Level - 'Actions' timeout setting
    page.setDefaultTimeout(9000);
    //Test Level - 'Navigations' timeout setting
    page.setDefaultNavigationTimeout(8000);

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.locator('div h1').waitFor();
    await page.locator('[name="name"]').first().fill("test");
    await page.locator('[name="email"]').fill("test@gmail.com");
    await page.getByPlaceholder("Password").fill("test@123");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.locator('#inlineRadio2').click();
    //await page.locator('[name="bday"]').fill("12/12/1990");

    //Actions timeput setting in Step Level
    await page.getByRole("button", {name: 'submit'}).click({timeout: 12_000});
    await page.waitForLoadState("networkidle");
    //const flag = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //console.log(flag);

    //step level - 'Expect' timeout setting
   // await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout : 10_000});

   //Using newexpect - new timeout for expect configured at test level
    await newexpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

    await page.getByRole('link', {name:"shop"}).click();

    //step level - 'Expect' timeout setting
    //await expect(page.locator('.my-4').first()).toHaveText("Shop Name", {timeout: 9000});

    //Using newexpect - new timeout for expect configured at test level
    await newexpect(page.locator('.my-4').first()).toHaveText("Shop Name");


    //await page.locator('app-card').first().waitFor();
    await page.locator('app-card').filter({hasText: 'Blackberry'}).getByRole('button').click();


}

);

//Practise Excercise 2 - GetBy & Filters, assertions method
//In a shoping website, find the product that matches the desired product and Select
//"Add to Cart" option for that product

test("Practise Ex2 - GetBy_Filters", async ({page})=>
{
    //Step1 - Navigate to the website url, login with valid userid and password to the website
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page.getByText("Log in")).toBeVisible({timeout:8_000});
    await page.getByPlaceholder("email@example.com").fill("test9001@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Test@12345");
    await page.getByRole("button",{name : 'login'}).click();

    //verify if home page is reached
    await expect(page.getByText(" Home | ").last()).toBeVisible({timeout: 8_000});

    //Step 2: Validate the desired product from the prodcut list and select "Add to Cart"
    //option of that product
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    const product = await page.locator('.col-md-6').filter({hasText: 'ZARA COAT 3'});
    await product.getByRole("button", {name:' Add To Cart'}).click();
    //await page.pause();

    //Step 3: Navigate to 'Cart' page to verify if the product is added
    await page.locator('[routerlink*="cart"]').click();
    await expect(page.getByText("My Cart")).toBeVisible();
    await page.locator('.infoWrap').filter({hasText: 'ZARA COAT 3'}).getByRole("button", {name:'Buy Now'}).click();

    //Step 4: Enter all payment information & select 'Place Order' option
    await expect(page.getByText(" Payment Method ")).toBeVisible();
    await page.locator('[type="text"]').nth(0).fill("4400 9000 8000 1000");
    await page.locator('select.ddl').first().selectOption("02");
    await page.locator('select.ddl').last().selectOption("10");
    await page.locator('[type="text"]').nth(1).fill("678");
    await page.locator('[type="text"]').nth(2).fill("TEST123");
    //await page.pause();
    await expect(page.locator('label[type="text"]')).toHaveText("test9001@gmail.com");
    await page.getByPlaceholder("Select Country").pressSequentially("ind", {dealy:150});
    await page.locator('.list-group').waitFor();
    const country_list = await page.locator('.list-group');
    const item_count = await country_list.locator('.list-group-item').count();
    //console.log(item_count);
    for (let i=0; i<item_count; i++){
        const Country_name = await country_list.locator('.list-group-item').nth(i).textContent();
       // console.log(Country_name);
        if (Country_name === " India")
        {
            await country_list.locator('.list-group-item').nth(i).click();
            break;

        }

    }
   // await page.pause();
    await page.locator('a.action__submit').click();

//Step 5: Verify if order number is displayed in Confirmation page and fetch the Order Number
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();
const Order_num1 = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
const Order_num = Order_num1.split(" ")[2];
//console.log(Order_num);


//Step 6: Goto "orders" page and verify if the order_num is present in the Orders page
//Select 'View Order' button of the specifc order_num
await page.getByRole("button", {name:"  ORDERS"}).click();
await page.locator('.table-bordered').waitFor();
const order_result = await page.locator('.table-bordered tr').filter({hasText: String(Order_num)});
await order_result.getByRole("button", {name:"View"}).click();
await page.pause();


}
);


test.only("@Regression Event Booking practise", async ({page}) =>
{
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await expect(page.getByText("Sign in to EventHub")).toBeVisible();

    //Enter valid login credentials and Sign In
    await page.getByPlaceholder("you@email.com").fill("test9001@gmail.com");
    await page.getByLabel("password").fill("Test@12345");
    await page.locator('#login-btn').click();
    await expect(page.getByText("Browse Events →")).toBeVisible();

    //Step 2 — Create a new event
    await page.getByRole("button", {name: "Admin"}).click();
    await page.getByText("Manage Events").nth(0).click();
    await expect(page.getByText("+ New Event")).toBeVisible();
    //Fill in all the details
    await page.locator('#event-title-input').fill("Practise Event");
    await page.getByPlaceholder("Describe the event…").fill("this is my practise event");
    await page.getByLabel("category").selectOption("Concert");
    await page.getByLabel("city").fill("Chennai");
    await page.getByLabel("venue").fill("Solomon Street");
    await page.getByLabel("Event Date & Time").click();
    await page.getByLabel("Event Date & Time").fill("2026-12-31T13:06");
    //await page.getByLabel("Event Date & Time").
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator('#add-event-btn').click();
    await expect(page.getByText("Event Created")).toBeVisible();

    //Step 3 - Find the event card and capture seats
    await page.locator('[data-testid="nav-events"]').click();
    await expect(page.getByText("Upcoming Events")).toBeVisible();
    await page.locator('[data-testid="event-card"]').first().waitFor();
    await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible();
    await expect(page.locator('.grid-cols-1').filter({hasText:"Practise Event"})).toBeVisible();
    const seats = await page.locator('.flex-col').filter({hasText:"Practise Event"}).locator('span.text-xs').last().textContent();
    const seatsBeforeBooking = seats.split(" ")[0];
    console.log(seatsBeforeBooking);
    console.log(seatsBeforeBooking, typeof seatsBeforeBooking);

    //Step 4 — Start booking
    await page.locator('.flex-col').filter({hasText: "Practise Event"}).locator('[data-testid="book-now-btn"]').click();

    //Step 5 — Fill booking form
    await expect(page.getByText("Book Tickets")).toBeVisible();
    await expect(page.locator('#ticket-count')).toHaveText("1");
    await page.getByLabel("Full Name").fill("Test123");
    await page.locator("#customer-email").fill("test123@getMaxListeners.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
    await page.locator('.confirm-booking-btn').click();

    //Step 6 — Verify booking confirmation
    await expect(page.locator('.booking-ref')).toBeVisible();
    const bookingRef = await page.locator('.booking-ref').textContent();
    //console.log(bookingRef);

    //Step 7 — Verify in My Bookings
    await page.getByRole("button", {name: "View My Bookings"}).click();
    await page.locator('#booking-card').first().waitFor();
    await expect(page.locator('#booking-card').first()).toBeVisible();
    await expect(page.url()).toContain("https://eventhub.rahulshettyacademy.com/bookings");    
    await expect(page.locator('#booking-card').filter({hasText:bookingRef})).toBeVisible();
    const Title = await page.locator('#booking-card').filter({hasText:bookingRef}).locator('.text-base').textContent();
    console.log(Title);
    await expect(Title).toContain("Practise Event");

    //Step 8 — Verify seat reduction
    await page.locator('#nav-events').click();
    await page.getByText("Upcoming Events").waitFor();
    await expect(page.getByText("Upcoming Events")).toBeVisible();
    await page.locator('.flex-col').first().waitFor();
    await expect(page.locator('.flex-col').first()).toBeVisible();
    //await page.pause();
    const seatsAfterBooking1 = await page.locator('.flex-col').filter({hasText : "Practise Event"}).locator('.text-xs').last().textContent();
    //const seatsAfterBooking = Number(seatsAfterBooking1.split(" ")[0]);
    const seatsAfterBooking = seatsAfterBooking1.split(" ")[0];
    console.log(seatsAfterBooking);
    console.log(seatsAfterBooking, typeof seatsAfterBooking);
    //let seatsBeforeBooking = seatsBeforeBooking -1;
    //console.log(seatsBeforeBooking);
    if (Number(seatsAfterBooking) === (seatsBeforeBooking-1)){
        console.log("Passed. Seats count reduced as expected");
    }
    else{
        console.log("Failed. Seats count not reduced as expected");
    }
    //await expect(seatsAfterBooking).toContain(seatsBeforeBooking -1);
    await expect(Number(seatsAfterBooking)).toBe(seatsBeforeBooking-1);

}
);


