import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1000 * 2);
const baseURL = 'https://passport.yandex.ru/auth';

Given('I am on the Yandex login page', async function () {
    await pageFixture.page.goto(baseURL);
});

When('I fill in the email field with {string}', async (email) => {
  await pageFixture.page.waitForSelector('#passp-field-login');
  await pageFixture.page.fill('#passp-field-login', email);
});

When('I fill in the {string} phone field with {string}', async (country, phoneNumber) => {
   const countryField = `//*[@name="country"]` 
   await pageFixture.page.locator('.IntPhoneInput-countryButton').click();
   await pageFixture.page.waitForSelector(countryField);
   await pageFixture.page.locator(countryField).fill(country);
   await pageFixture.page.getByText(country).click();
   await pageFixture.page.locator('#passp-field-phone').fill(phoneNumber);
});

When('I click the {string} button', async (buttonName) => {
  await pageFixture.page.getByRole('button', { name: buttonName }).click();
});

When('I fill in the password field with {string}', async (password) => {
  await pageFixture.page.getByPlaceholder('Введите пароль').fill(password);
});

Then('I see the error message {string}', async (expectedErrorMessage) => {
    const errorElement = await pageFixture.page.locator(`//*[@id[starts-with(., 'field:input')]]`);
    const actualText = await errorElement.textContent();    
    const regex = new RegExp(expectedErrorMessage.replace(/ /g, '\\s*'));
    expect(actualText).toMatch(regex);
});

Then('I see the message {string}',async (expectedMessage) => {
    const messageLocator = await pageFixture.page.waitForSelector(`//*[contains(text(), "${expectedMessage}")]`)
    const isVisible = !!await messageLocator.isVisible();
    expect(isVisible).toBe(true);
});
