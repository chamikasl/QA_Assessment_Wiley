import { test, expect, Page } from '@playwright/test';

// Configuration
const baseURL = 'https://onlinelibrary.wiley.com/';

// Test setup
test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running test: ${testInfo.title}`);
    await page.goto(baseURL);
});

test.describe('Search Functionality Test', () => {

    test('TC0033: Verify Elements', async ({ page }) => {
        console.log('Verifying elements...');

        const searchBar = page.getByPlaceholder('Search publications, articles');
        const searchIcon = page.getByLabel('Submit Search');
        const AdvancedSearchLink = page.getByRole('link', { name: 'Advanced Search' });

        // Verify search input field & icon visibility
        await expect(searchIcon).toBeVisible();
        await expect(searchBar).toBeVisible();
        await expect(AdvancedSearchLink).toBeVisible();

        console.log('Search elements verified.');
    });

    test('TC0033: Verify submit by pressing enter', async ({ page }) => {
        console.log('Verifying submit by enter...');

        const searchBar = page.getByPlaceholder('Search publications, articles');

        // Verify functionality enter
        await searchBar.fill('test');
        await searchBar.press('Enter');
        await page.waitForNavigation;
        await page.goto('https://onlinelibrary.wiley.com/action/doSearch?AllField=test');

        console.log('Search Verify submit by pressing enter verified.');
    });

    test('TC0033: Verify submit by pressing search icon', async ({ page }) => {
        console.log('Verifying search icon...');

        const searchBar = page.getByPlaceholder('Search publications, articles');
        const searchIcon = page.getByLabel('Submit Search');

        // Verify functionality icon
        await searchBar.fill('test');
        await searchIcon.click();
        await page.waitForNavigation;
        await page.goto('https://onlinelibrary.wiley.com/action/doSearch?AllField=test');

        console.log('Search Verify submit by pressing enter verified.');
    });
    
    test('TC0033: Verify advanced search button', async ({ page }) => {
        console.log('Verifying advanced search button...');

        const AdvancedSearchLink = page.getByRole('link', { name: 'Advanced Search' });

        // Verify functionality icon
        await AdvancedSearchLink.click();
        await page.waitForNavigation;
        await page.goto('https://onlinelibrary.wiley.com/search/advanced');

        console.log('Advanced search button verified.');
    });

    test('TC0034: Verify with a valid keyword', async ({ page }) => {
        console.log('Verifying search functionality...');

        const searchBar = page.getByPlaceholder('Search publications, articles');
        const searchIcon = page.getByLabel('Submit Search');

        // Perform search
        await searchBar.click();
        await searchBar.fill('@%^&*()^%$#');
        await searchIcon.click();

        await page.waitForTimeout(2000);

        // Validate the search results message
        const resultMessage = page.locator('.results-message'); // Replace with the actual selector
        await expect(resultMessage).toHaveText('0 results for "@%^&*()^%$#"'); // Replace with the actual expected text

        await page.screenshot({ path: 'search-result-invalid-input.png' });
        
        console.log('Search functionality with invalid keyword verified.');
    });
});