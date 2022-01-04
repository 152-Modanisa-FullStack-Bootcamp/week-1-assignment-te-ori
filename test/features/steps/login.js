const {When, Then, Given} = require('cucumber');
const puppetter = require('puppeteer')

Given('The browser is open', async function(){
    this.browser = await puppetter.launch({headless: false});
    this.page = await this.browser.newPage();
});

When('Open index page', async function(){
    await this.page.goto('http://localhost:1234');
});

Then('Check inputs', async function(){
    var inputs = await this.page.$$("input");
    console.log(inputs);
    await this.page.close();
    await this.browser.close();
});