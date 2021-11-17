// set up and build selenium driver obj
const { Builder, By, Key, WebElement, util } = require('selenium-webdriver');
const assert = require("assert");
const { SSL_OP_EPHEMERAL_RSA } = require('constants');

// Possible Login Parameters
const NAME = "Test Name"
const PW = "testpassword";
const NO_INPUT = "";
const SHORT_WORD = "a";
const LONG_WORD = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRXTUVWXYZ"
const DUPE_EMAIL = "dupeemail@gmail.com"
const UNREGISTERED_EMAIL = "void@gmail.com"
const EMAIL_NO_DOMAIN = "testemail.com";
const LONG_EMAIL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRXTUVWXYZthisismorethan65characters@yahoo.com"
const WORD_WITH_SYMBOLS = `<div class="h-full"/>`

async function registerTest(driver) {
    try {
        await sleep(300); await driver.findElement(By.linkText("Register")).sendKeys(Key.RETURN);

        // Test that we are on registration page.
        await sleep(300); await testUrl(driver, "http://localhost:3000/register")

        // Attempt to add an account to the database, regardless of whether it already exists.
        await sleep(1000); await testRegister(driver, NAME, DUPE_EMAIL, PW, PW, 0);
        // On a failure, we stay on registration page.
        // On a success, we return to login page, but want to go back to registration page. 
        await sleep(1000);
        if ((await driver.getCurrentUrl()) == "http://localhost:3000/") {
            await sleep(1000);
            await driver.findElement(By.linkText("Register")).sendKeys(Key.RETURN);
        }

        // Test all expected registration failure edge cases.
        await sleep(300);
        await testRegister(driver, NAME, NO_INPUT, PW, PW, -1);                           // No email input
        await testRegister(driver, NAME, UNREGISTERED_EMAIL, NO_INPUT, NO_INPUT, -1);     // No password input
        await testRegister(driver, NO_INPUT, UNREGISTERED_EMAIL, PW, PW, -1);             // No name input
        await testRegister(driver, SHORT_WORD, UNREGISTERED_EMAIL, PW, PW, -1);           // Short name input
        await testRegister(driver, LONG_WORD, UNREGISTERED_EMAIL, PW, PW, -1);            // Long name input
        await testRegister(driver, WORD_WITH_SYMBOLS, UNREGISTERED_EMAIL, PW, PW, -1);    // Name input with symbols
        await testRegister(driver, NAME, DUPE_EMAIL, PW, PW, -1);                         // Email input that already exists
        await testRegister(driver, NAME, EMAIL_NO_DOMAIN, PW, PW, -1);                    // Email input with no domain name
        await testRegister(driver, NAME, LONG_EMAIL, PW, PW, -1);                         // Excessively long email input
        await testRegister(driver, NAME, UNREGISTERED_EMAIL, PW, PW + "a", -1);           // Non-matching passwords input
        await testRegister(driver, NAME, UNREGISTERED_EMAIL, PW + "a", PW, -1);           // Non-matching passwords input (swapped)
        await testRegister(driver, NAME, UNREGISTERED_EMAIL, SHORT_WORD, SHORT_WORD, -1); // Short password input

        // Test that we can return to signup page.
        await sleep(1000); await driver.findElement(By.linkText("Back to login")).sendKeys(Key.RETURN);
        await sleep(300); await testUrl(driver, "http://localhost:3000/")
    }
    catch (err) {
        console.log("Registration tests failed!");
    }
}

async function loginTest(driver) {
    try {
        // Test all expected login failure edge cases.
        await sleep(300);
        await testLogin(driver, NO_INPUT, PW, -1);                    // No email input
        await testLogin(driver, DUPE_EMAIL, NO_INPUT, -1);            // No password input
        await testLogin(driver, UNREGISTERED_EMAIL, NO_INPUT, -1);    // Non-existing email input
        await testLogin(driver, DUPE_EMAIL, UNREGISTERED_EMAIL, -1);  // Non-existing password input

        // Test a successful login.
        await sleep(1000);
        await testLogin(driver, DUPE_EMAIL, PW, 1);
    }
    catch (err) {
        console.log("Login tests failed!");
    }
}

async function testUrl(driver, url) {
    try {
        // Set a timeout so that the page has time to load before we grab the newUrl
        setTimeout(async function () {
            let newUrl = await driver.getCurrentUrl();
            assert.strictEqual(newUrl, url);
        }, 1000);
    }

    catch (err) {
        console.log("Url incorrect: expected " + url + ", got " + newUrl);
    }
}

// Attempt to register on the registration page.
// If expectedResult is 1, success asserted.
// If expectedResult is -1, failure asserted.
// Otherwise, register but don't assert anything.
async function testRegister(driver, name, email, pw, pwverify, expectedResult) {
    try {
        await sleep(300); let e_name = await driver.findElement(By.id("name"));
        await sleep(300); let e_email = await driver.findElement(By.id("email"));
        await sleep(300); let e_password = await driver.findElement(By.id("password"));
        await sleep(300); let e_password2 = await driver.findElement(By.id("password2"));
        await sleep(300); await replaceField(driver, e_name, name, false);
        await sleep(300); await replaceField(driver, e_email, email, false);
        await sleep(300); await replaceField(driver, e_password, pw, false);
        await sleep(300); await replaceField(driver, e_password2, pwverify, true);
        if (expectedResult == -1) {
            testUrl(driver, "http://localhost:3000/register");
        }
        else if (expectedResult == 1) {
            testUrl(driver, "http://localhost:3000/");
        }
    }
    catch (err) {
        console.log("Registration test for (" + name + " | " + email + " | " + pw + " | " + pwverify + ") failed!");
        console.log(err.name);
        console.log(err.message);
    }
}

async function testLogin(driver, email, pw, expectedResult) {
    try {
        await sleep(300); let e_email = await driver.findElement(By.id("email"));
        await sleep(300); let e_password = await driver.findElement(By.id("password"));
        await sleep(300); await replaceField(driver, e_email, email, false);
        await sleep(300); await replaceField(driver, e_password, pw, true);
        if (expectedResult == -1) {
            testUrl(driver, "http://localhost:3000/");
        }
        else if (expectedResult == 1) {
            testUrl(driver, "http://localhost:3000/dashboard");
        }
    }
    catch (err) {
        console.log("Login test for (" + email + " | " + pw + ") failed!");
        console.log(err.name);
        console.log(err.message);
    }
}

async function test() {
    try {
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get("http://localhost:3000/");
        await registerTest(driver);
        await loginTest(driver);
        // Wait 60 seconds before quitting driver.
        setTimeout(async function () {
            await driver.quit();
        }, 60000);
    }
    catch (err) {
        console.log("Tests failed!");
    }
}

async function replaceField(driver, webElem, input, doSubmit) {
    await driver.executeScript(elem => elem.select(), webElem);
    await webElem.sendKeys(Key.BACK_SPACE);
    if (doSubmit) {
        await webElem.sendKeys(input, Key.RETURN);
    }
    else {
        await webElem.sendKeys(input);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test().catch(error => alert(error.message));