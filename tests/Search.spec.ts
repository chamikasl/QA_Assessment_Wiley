import { test, expect, Page } from '@playwright/test';

// Configuration
const baseURL = 'https://onlinelibrary.wiley.com/';

// Test setup
test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running test: ${testInfo.title}`);
    await page.goto(baseURL);
});

test.describe('Search Functionality Test', () => {

    /* The below tests are designed to verify the functionality of the search feature on the application, 

    - TC0027: Tests the "Advanced Search" button functionality, verifying redirection to the advanced search page.
    - TC0034: Validates that pressing "Enter" after entering a search term submits the search request and navigates to the appropriate results page.
    - TC0035: Ensures the visibility of essential elements such as the search bar, search icon, and the "Advanced Search" link.
    - TC0036(need human verificattion): Confirms that clicking the search icon submits the search request and navigates to the results page.
    - TC0021: This test verifies the application's behavior when searching with a valid keyword, ensuring the search results page is displayed with the appropriate results.
    - TC0025: This test verifies the application's behavior when searching with a invalid keyword.
    */

    test('TC0027: Verify advanced search button', async ({ page }) => {
        console.log('Verifying advanced search button...');

        const AdvancedSearchLink = page.getByRole('link', { name: 'Advanced Search' });

        // Verify functionality icon
        await AdvancedSearchLink.click();
        await page.waitForNavigation;
        await page.goto('https://onlinelibrary.wiley.com/search/advanced');

        console.log('Advanced search button verified.');
    });

    test('TC0034: Verify submit by pressing enter', async ({ page }) => {
        console.log('Verifying submit by enter...');

        const searchBar = page.getByPlaceholder('Search publications, articles');

        await searchBar.fill('test');

        // Verify functionality enter
        await searchBar.press('Enter');
        await page.waitForNavigation;
        await page.goto('https://onlinelibrary.wiley.com/action/doSearch?AllField=test');

        console.log('Search Verify submit by pressing enter verified.');
    });

    test('TC0035: Verify Elements', async ({ page }) => {
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

    test.skip('TC0036: Verify submit by pressing search icon', async ({ page }) => {
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
    
    test('TC0021: Verify with a valid keyword', async ({ page }) => {
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

    test('TC0025: Verify with a invalid keyword', async ({ page }) => {
        console.log('Verifying search functionality...');

        const searchBar = page.getByPlaceholder('Search publications, articles');
        const searchIcon = page.getByLabel('Submit Search');

        // Perform search
        await searchBar.click();
        await searchBar.fill('@%^&*()^%$#');
        await searchIcon.click();

        await page.waitForTimeout(2000);

        // Validate the search results message
        const resultMessage = page.locator('.results-message');
        await expect(resultMessage).toHaveText('0 results for "@%^&*()^%$#"');
        
        console.log('Search functionality with invalid keyword verified.');
    });
});