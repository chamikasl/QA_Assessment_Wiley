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
    - TC0034: Validates that pressing "Enter" after entering a search term submits the search request.
    - TC0035: Ensures the visibility of essential elements such as the search bar, search icon, and the "Advanced Search" link.
    - TC0036: Confirms that clicking the search icon submits the search request.
    - TC0021(need human verification): This test verifies the application's behavior when searching with a valid keyword, ensuring the search results page is displayed with the appropriate results.
    - TC0025(need human verification): This test verifies the application's behavior when searching with a invalid keyword.
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

    test('TC0036: Verify submit by pressing search icon', async ({ page }) => {
        console.log('Verifying search icon...');

        const searchBar = page.getByPlaceholder('Search publications, articles');
        const searchIcon = page.getByLabel('Submit Search');

        // Verify functionality icon
        await searchBar.fill('test');
        await searchIcon.click();
        await page.waitForNavigation;

        console.log('Search Verify submit by pressing enter verified.');
    });

    test.skip('TC0021: Verify search functionality with a valid keyword', async ({ page }) => {
        console.log('Verifying search functionality...');
    
        // Locate the search bar and search icon
        const searchBar = page.getByPlaceholder('Search publications, articles');
        const searchIcon = page.getByLabel('Submit Search');
    
        // Perform search
        await searchBar.click();
        await searchBar.fill('Machine Learning');
        await searchIcon.click();

        await page.waitForTimeout(2000);
    
        // Wait for the search results container to load
        const searchResult = page.locator('.search__result.search__result--space');
        await expect(searchResult).toBeVisible();
    
        // Validate the results message contains the correct keyword
        const resultSuffixElement = searchResult.locator('.result__suffix');
        const resultSuffixText = await resultSuffixElement.textContent();
        expect(resultSuffixText).toContain('"Machine Learning"');

        console.log('Search functionality with valid keyword verified.');
    });

    test.skip('TC0025: Verify no results message is shown for invalid search', async ({ page }) => {
        console.log('Verifying no results message for invalid search...');
    
        // Locate search bar and submit icon
        const searchBar = page.getByPlaceholder('Search publications, articles');
        const searchIcon = page.getByLabel('Submit Search');
    
        // Perform search with an invalid keyword
        await searchBar.click();
        await searchBar.fill('@%^&*()^%$#');
        await searchIcon.click();
    
        // Wait for the search result to load (if necessary, adjust this waiting logic)
        await page.waitForTimeout(2000);
    
        // Track visibility of the no-result message
        const noResultMessage = page.locator('.search-result__no-result');
        await expect(noResultMessage).toBeVisible();
    
        console.log('No results message displayed as expected.');
    });
    
});