// set up and build selenium driver obj
const {Builder, By, Key, util } = require('selenium-webdriver');
const assert = require("assert");

// Possible Login Parameters
const NAME = "Test Name"
const PW = "testpassword";
const NO_INPUT = "";
const SHORT_WORD = "a";
const LONG_WORD = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRXTUVWXYZ"
const DUPE_EMAIL = "dupeemail@gmail.com"
const UNREGISTERED_EMAIL = "void@gmail.com"
const EMAIL_NO_DOMAIN = "testemail.com";
const LONG_EMAIL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRXTUVWXYZ@yahoo.com"
const WORD_WITH_SYMBOLS = `<div class="h-full"/>`



async function registerTest(driver) {
    // Navigate to registration page.
    await driver.get("http://localhost:3000/");
    await driver.findElement(By.linkText("Register").sendKeys(Key.RETURN));

    // Test that we are on registration page.
    testUrl(driver, "http://localhost:3000/register")

    // Attempt to add an account to the database, regardless of whether it already exists.
    testRegister(driver, NAME, DUPE_EMAIL, PW, PW, 0);
    // On a failure, we stay on registration page.
    // On a success, we return to login page, but want to go back to registration page. 
    if ((await driver.getCurrentUrl()) == "http://localhost:3000/") {
        await driver.findElement(By.linkText("Register").sendKeys(Key.RETURN));
    }

    // Test all expected registration failure edge cases.
    testRegister(driver, NAME, NO_INPUT, PW, PW, -1);                           // No email input
    testRegister(driver, NAME, UNREGISTERED_EMAIL, NO_INPUT, NO_INPUT, -1);     // No password input
    testRegister(driver, NO_INPUT, UNREGISTERED_EMAIL, PW, PW, -1);             // No name input
    testRegister(driver, SHORT_WORD, UNREGISTERED_EMAIL, PW, PW, -1);           // Short name input
    testRegister(driver, LONG_WORD, UNREGISTERED_EMAIL, PW, PW, -1);            // Long name input
    testRegister(driver, WORD_WITH_SYMBOLS, UNREGISTERED_EMAIL, PW, PW, -1);    // Name input with symbols
    testRegister(driver, NAME, DUPE_EMAIL, PW, PW, -1);                         // Email input that already exists
    testRegister(driver, NAME, EMAIL_NO_DOMAIN, PW, PW, -1);                    // Email input with no domain name
    testRegister(driver, NAME, LONG_EMAIL, PW, PW, -1);                         // Excessively long email input
    testRegister(driver, NAME, UNREGISTERED_EMAIL, PW, PW + "a", -1);           // Non-matching passwords input
    testRegister(driver, NAME, UNREGISTERED_EMAIL, PW + "a", PW, -1);           // Non-matching passwords input (swapped)
    testRegister(driver, NAME, UNREGISTERED_EMAIL, SHORT_WORD, SHORT_WORD, -1); // Short password input

    // Test that we can return to signup page.
    await driver.findElement(By.linkText("Back to login").sendKeys(Key.RETURN));
    testUrl(driver, "http://localhost:3000/")
}

async function loginTest(driver) {
    // Navigate to login page.
    await driver.get("http://localhost:3000/");

    // Test all expected login failure edge cases.
    testLogin(driver, NO_INPUT, PW, -1);                    // No email input
    testLogin(driver, DUPE_EMAIL, NO_INPUT, -1);            // No password input
    testLogin(driver, UNREGISTERED_EMAIL, NO_INPUT, -1);    // Non-existing email input
    testLogin(driver, DUPE_EMAIL, UNREGISTERED_EMAIL, -1);  // Non-existing password input

    // Test a successful login.
    testLogin(driver, DUPE_EMAIL, PW, 1);
}

async function testUrl(driver, url) {
    // Set a timeout so that the page has time to load before we grab the newUrl
    setTimeout(async function() {
        let newUrl = await driver.getCurrentUrl();
        assert.strictEqual(newUrl, url);
    }, 2000);
}

// Attempt to register on the registration page.
// If expectedResult is 1, success asserted.
// If expectedResult is -1, failure asserted.
// Otherwise, register but don't assert anything.
async function testRegister(driver, name, email, pw, pwverify, expectedResult) {
    await driver.findElement(By.id("name")).sendKeys(name);
    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys(pw);
    await driver.findElement(By.id("password2")).sendKeys(pw, Key.RETURN);
    if (expectedResult == -1) {
        testUrl(driver, "http://localhost:3000/register");
    }
    else if (expectedResult == 1) {
        testUrl(driver, "http://localhost:3000/");
    }
}

async function testLogin(driver, email, pw, expectedResult) {
    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys(pw);
    if (expectedResult == -1) {
        testUrl(driver, "http://localhost:3000/");
    }
    else if (expectedResult == 1) {
        testUrl(driver, "http://localhost:3000/dashboard");
    }
}

// open browser
let driver = await new Builder().forBrowser('chrome').build();
registerTest();
loginTest();
await driver.quit();