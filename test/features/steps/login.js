const {When, Then, Given} = require('@cucumber/cucumber');
const puppetter = require('puppeteer')

Given('The browser is open', async function(){
    this.browser = await puppetter.launch({headless: true});
    this.page = await this.browser.newPage();
});

When('Open index page', async function(){
    await this.page.goto('http://localhost:1234');
});

Then('You should see login form', async function(){
    await this.page.waitForSelector('#login-card')
    var inputs_count = (await this.page.$$(".input, .forgot, .submit, .signup")).length;
    await this.page.close();
    await this.browser.close();

    if (inputs_count !== 5) {
        throw new Error("failed");
    }
});