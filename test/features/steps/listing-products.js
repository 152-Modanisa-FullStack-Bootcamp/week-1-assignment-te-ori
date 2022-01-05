const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const puppetter = require('puppeteer');

setDefaultTimeout(60 * 1000);

Given('The browser is open', async function () {
    this.browser = await puppetter.launch({ headless: true });
    this.page = await this.browser.newPage();
});

When('Open index page', async function () {
    await this.page.goto('http://localhost:1234');
});

Then('You should see only products which name\'s contain {string}', async function (keyword) {
    await this.page.waitFor(2000);
    const product_boxes_count = (await this.page.$$('.product')).length;
    const product_names = await this.page.evaluate(() =>
        Array.from(
            document.querySelectorAll('.product-name'),
            (element) => element.textContent
        )
    );

    const product_contains_keyword_count = product_names.filter(name => name.includes(keyword)).length;
    
    await this.page.close();
    await this.browser.close();

    if (product_contains_keyword_count < 1 || product_boxes_count != product_contains_keyword_count) {
        throw new Error("failed");
    }
});