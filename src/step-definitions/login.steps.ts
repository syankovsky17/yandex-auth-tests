import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';

setDefaultTimeout(60 * 1000 * 2);
const baseURL = 'https://passport.yandex.ru/auth';

Given('I am on the Yandex login page', async function () {
    await pageFixture.page.goto(baseURL);
});

When('I fill in the email field with {string}', async function (email) {
  await pageFixture.page.waitForSelector('#passp-field-login');
  await pageFixture.page.fill('#passp-field-login', "email");
});


When('I fill in the "{string}" phone field with "{string}"', async (country: string, { page }) => {
   await pageFixture.page.getByPlaceholder('Страна или код').fill('{country}}');
   await pageFixture.page.getByText('country +').click();
   await pageFixture.page.locator('#passp-field-phone').fill('{string}');
});

When('I click the "{string}" button', async (buttonName: string, { page }) => {
  await pageFixture.page.getByRole('button', { name: buttonName }).click();
});

When('I fill in the password field with "{string}"', async (password: string, { page }) => {
  await pageFixture.page.getByPlaceholder('Введите пароль').fill(password);
});

When('I press Enter', async ({ page }) => {
  await pageFixture.page.press('Enter');
});

Then('I see the error message "{string}"', async (expectedErrorMessage: string, { page }) => {
  await pageFixture.page.waitForSelector('[id="field:input-passwd:hint"]');
  const errorMessage = await pageFixture.page.textContent('[id="field:input-passwd:hint"]');
  expect(errorMessage).toContain(expectedErrorMessage);
});
