const {When, Then, Given} = require('@cucumber/cucumber');
const puppetter = require('puppeteer')

Given('Open the browser', async function(){
    this.browser = await puppetter.launch({headless: true});
    this.page = await this.browser.newPage();
});

When('Navigate to index page', async function(){
    await this.page.goto('http://localhost:1234');
});

Then('You should see at least one post', async function(){
    await this.page.waitForSelector('.linkedin-post');
    let post_count = (await this.page.$$(".linkedin-post")).length;
    await this.page.close();
    await this.browser.close();

    if (post_count < 1) {
        throw new Error("Wrong count");
    }
});