const {When, Then, Given} = require('cucumber');
const puppetter = require('puppeteer')

Given('The browser is open', async function(){
    this.browser = await puppetter.launch({headless: false});
    this.page = await this.browser.newPage();
});

When('Open index page', async function(){
    await this.page.goto('http://localhost:1234');
});

Then('Check post', async function(){
    let post_count = (await this.page.$$(".linkedin-post")).length;
    await this.page.close();
    await this.browser.close();

    if (post_count !== 2) {
        throw new Error("Wrong count");
    }
});