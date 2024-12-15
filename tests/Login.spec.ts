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

    /* The below tests are designed to verify various aspects of login and registration functionality within the application.

    - TC0009 validates the successful login process for individual users using valid credentials, ensuring proper redirection to the user dashboard.
    - TC0010 focuses on error handling for an incorrect email format, verifying that an appropriate error message is displayed to the user.
    - TC0011 (Failed) tests login behavior with non-existent account credentials, ensuring the correct error message appears.
    - TC0015 (skipped for now due to lack of credentials) is intended to validate the institutional login process.

    */

    test('TC0009: Verify with valid individual login credentials', async ({ page }) => {
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

    test('TC0010: Verify with incorrect email', async ({ page }) => {
        console.log('Verifying Individual login...');

        await page.goto(loginURL);
        await page.getByLabel('Email').fill('qwer');
        await page.getByRole('button', { name: 'Continue' }).click();

        await page.waitForTimeout(2000);

        // Wait for the error message to appear
        const errorMessage = page.locator('#email-error-message');
        await expect(errorMessage).toHaveText('Please enter a valid e-mail address.');

        console.log('Individual login with incorrect emaiil verified.');
    });

    test('TC0011: Verify with invalid email', async ({ page }) => {
        console.log('Verifying Individual login with non-existent account email...');
    
        await page.goto(loginURL)
        await page.getByLabel('Email').fill('cslcsl123@gmail.com');
        await page.getByRole('button', { name: 'Continue' }).click();
    
        // Wait for the specific error message to appear
        const errorMessage = page.locator('.MuiTypography');
        await expect(errorMessage).toHaveText('account does not exist');
    
        console.log('Error message for non-existent account email verified successfully.');
    });
        
    test.skip('TC0015: Verify with valid institutional login credentials', async ({ page }) => {
        // No credentials to test
    });
});