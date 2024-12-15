import { test, expect, Page } from '@playwright/test';

// Configuration
const baseURL = 'https://onlinelibrary.wiley.com/';
const loginURL = 'https://wiley.scienceconnect.io/login/';
const email = process.env.EMAIL || 'csl211005@gmail.com';
const password = process.env.PASSWORD || '5ri !ankA';

// Helper function for login
async function login(page: Page) {
    console.log('Starting login...');
    await page.goto(loginURL);
    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Enter Password').fill(password);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForNavigation();
    console.log('succesfully logged.');
}

// Test setup
test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running test: ${testInfo.title}`);
    await page.goto(baseURL);
});

test.describe('Login Functionality Test', () => {

    test('TC0030: Verify Individual login', async ({ page }) => {
        console.log('Verifying Individual login...');

        await page.goto(loginURL);
        await page.getByLabel('Email').fill(email);
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByLabel('Enter Password').fill(password);
        await page.getByRole('button', { name: 'Continue' }).click();

        await page.waitForNavigation();

        // Verify dashboard view
        await expect(page.getByText(email)).toBeVisible();
        await expect(page).toHaveURL('https://wiley.scienceconnect.io/dashboard');

        console.log('Individual login verified.');
    });

    test.skip('TC0031: Verify Institutional login', async ({ page }) => {
        // No credentials to test
    });

});

test.describe('Register Functionality Test', () => {

    test.skip('TC0032: Verify Register', async ({ page }) => {
        // Difficult to automate - need email otp verification
    });

});