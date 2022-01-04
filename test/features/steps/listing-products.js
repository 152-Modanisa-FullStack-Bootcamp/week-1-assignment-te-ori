const { Given, When, Then } = require('cucumber');
const puppetter = require('puppeteer');
var { setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);

Given('The browser is open', async function () {
    this.browser = await puppetter.launch({ headless: false });
    this.page = await this.browser.newPage();
});

When('Open index page', async function () {
    await this.page.goto('http://localhost:1234');
});

Then('See products which name\'s contain \'Şal\'', async function () {
    await this.page.waitFor(2000);
    const product_boxes_count = (await this.page.$$('.product')).length;
    const product_names = await this.page.evaluate(() =>
        Array.from(
            document.querySelectorAll('.product-name'),
            (element) => element.textContent
        )
    );
    const product_names_sal_count = product_names.filter(name => name.includes('Şal')).length;
    
    await this.page.close();
    await this.browser.close();

    if (product_boxes_count != product_names_sal_count) {
        throw new Error("failed");
    }
});