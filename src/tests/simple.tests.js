const { expect } = require("chai");

describe('Steam page', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
        await browser.url('https://store.steampowered.com/');
    });

    it('Check page title', async () => {
        const title = await browser.getTitle()
        expect(title).to.be.equal('Добро пожаловать в Steam');
    });

    it('Login', async () => {
        const loginLink = await $('//a[contains(@class,"link")][contains(@href,"login")]');
        const loginInput = await $('//input[@type="text"][contains(@class,"newlogin")]');
        const passInput = await $('//input[@type="password"]');
        const rememberCheckbox = await $('//div[@tabindex]');
        const loginBtn = await $('//button[@type="submit"]');
        const errorText = 'Пожалуйста, проверьте свой пароль и имя аккаунта и попробуйте снова.';
        await loginLink.click();
        await loginInput.waitForDisplayed();
        await loginInput.setValue('Gamer-1');
        await passInput.setValue('123456');
        await rememberCheckbox.click();
        const errorMsg = await $('//div[contains(@class,"FormError")]');
        await loginBtn.click();
        const loginBtnOn = await $('//button[@type="submit" and not(@disabled)]');
        const loginBtnOff = await $('//button[@type="submit" and @disabled]');
        await loginBtnOff.waitForDisplayed();
        await loginBtnOn.waitForDisplayed();
        expect(await errorMsg.getText()).to.be.equal(errorText);
    });

    it('Search a game', async () => {
        const gameName = 'Jagged Alliance 3';
        const searchInput = await $('#store_nav_search_term');
        const searchBtn = await $('//a[@id="store_search_link"]/img');
        const searchResults = await $('//div[@id="search_resultsRows"]//div[contains(@class,"search_name")]//span[@class="title"]');
        await searchInput.setValue(gameName);
        await searchBtn.click();
        expect(await searchResults.getText()).to.be.equal(gameName);
    });
});