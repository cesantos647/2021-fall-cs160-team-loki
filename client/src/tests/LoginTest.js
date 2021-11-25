// set up and build selenium driver obj
const {Builder, By, Key, util } = require('selenium-webdriver');
const assert = require("assert");

const EMAIL = "savnac1@gmail.com"
const PW = "123123"

async function loginTest() {
    // open browser
    let driver = await new Builder().forBrowser('chrome').build();

    // navigate to and from register page.
    await driver.get("http://localhost:3000/");
    await driver.findElement(By.linkText("Register")).sendKeys(Key.RETURN);
    await sleep(500);
    await testUrl(driver, "http://localhost:3000/register");
    await sleep(500);
    await driver.findElement(By.linkText("Back to login")).sendKeys(Key.RETURN);
    await sleep(500);
    await testUrl(driver, "http://localhost:3000/");
    await sleep(500);

    // insert information and login
    testLogin(driver, EMAIL, PW, 1);
}

async function testLogin(driver, email, pw, expectedResult) {
    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys(pw, Key.RETURN);
    if (expectedResult == -1) {
        testUrl(driver, "http://localhost:3000/");
    }
    else if (expectedResult == 1) {
        testUrl(driver, "http://localhost:3000/dashboard");
    }
}

async function testUrl(driver, url) {
    // Set a timeout so that the page has time to load before we grab the newUrl
    setTimeout(async function() {
        let newUrl = await driver.getCurrentUrl();
        assert.strictEqual(newUrl, url);
    }, 2000);
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

loginTest();