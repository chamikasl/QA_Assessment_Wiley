import { test, expect, Page } from '@playwright/test';

// Configuration
const baseURL = 'https://onlinelibrary.wiley.com/';
const loginURL = 'https://wiley.scienceconnect.io/login/';
const email = process.env.EMAIL || 'your-email@example.com';
const password = process.env.PASSWORD || 'your-password';

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

test.describe('Header Navigation Test', () => {

    test('TC0028: Verify main logo functionality', async ({ page }) => {
        console.log('Verifying main logo functionality...');

        // Check visibility and click the main logo
        const mainLogo = page.locator('#mainLogo');
        await expect(mainLogo).toBeVisible();
        await mainLogo.click();

        // Verify redirection to the main page
        await expect(page).toHaveURL(baseURL);
        console.log('Main logo functionality verified.');
    });

    test('TC0029: Verify "Login / Register" button functionality', async ({ page }) => {
        console.log('Verifying "Login / Register" button functionality...');

        // Locate and click on "Login / Register"
        const loginRegisterButton = page.getByLabel('Log in or Register');
        await expect(loginRegisterButton).toBeVisible();
        await loginRegisterButton.click();

        // Verify dropdown container visibility
        const loginDropdown = page.locator('.navigation-login-dropdown-container');
        await expect(loginDropdown).toBeVisible();

        // Verify presence of individual links
        await expect(page.getByRole('link', { name: 'Individual login' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Institutional login' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'REGISTER', exact: true })).toBeVisible();

        console.log('"Login / Register" button functionality verified.');
    });

    test.skip('TC0030: Individual login link navigation', async ({ page }) => {  // need human verification there
        console.log('Verifying Individual login link navigation...');

        // Click "Log in or Register"
        await page.getByLabel('Log in or Register').click();

        // Verify and click "Individual login" link
        const individualLoginLink = page.getByRole('link', { name: 'Individual login' });
        await expect(individualLoginLink).toBeVisible();
        await individualLoginLink.click();

        // Verify redirection
        await page.waitForURL(/wiley\.scienceconnect\.io\/login/);
        console.log('Individual login link navigation verified.');
    });

    test('TC0031: Institutional login link navigation', async ({ page }) => {
        console.log('Verifying Institutional login link navigation...');

        // Click "Log in or Register"
        await page.getByLabel('Log in or Register').click();

        // Verify and click "Institutional login" link
        const institutionalLoginLink = page.getByRole('link', { name: 'Institutional login' });
        await expect(institutionalLoginLink).toBeVisible();
        await institutionalLoginLink.click();

        // Verify redirection
        await page.waitForURL(/onlinelibrary\.wiley\.com\/action\/ssostart/);
        console.log('Institutional login link navigation verified.');
    });

    test.skip('TC0032: Register link navigation', async ({ page }) => {  // need human verification there
        console.log('Verifying Register link navigation...');

        // Click "Log in or Register"
        await page.getByLabel('Log in or Register').click();

        // Verify and click "Register" link
        const registerLink = page.getByRole('link', { name: 'REGISTER', exact: true });
        await expect(registerLink).toBeVisible();
        await registerLink.click();

        // Verify redirection
        await page.waitForURL(/wiley\.scienceconnect\.io\/register/);
        console.log('Register link navigation verified.');
    });

});

