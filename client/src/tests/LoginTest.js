// set up and build selenium driver obj
const {Builder, By, Key, util } = require('selenium-webdriver');
const assert = require("assert");

async function loginTest() {
    // open browser
    let driver = await new Builder().forBrowser('chrome').build();

    // insert information and login
    await driver.get("http://localhost:3000/");
    await driver.findElement(By.id("email")).sendKeys("<insert your email here>");
    await driver.findElement(By.id("password")).sendKeys("<insert your pass here>", Key.RETURN);

    // Set a timeout so that the page has time to load before we grab the newUrl
    setTimeout(async function() {
        let newUrl = await driver.getCurrentUrl();
        assert.strictEqual(newUrl, "http://localhost:3000/dashboard");
        await driver.quit();
    }, 2000);
}

loginTest();