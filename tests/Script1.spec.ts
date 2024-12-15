import { test, expect } from '@playwright/test';

test('TC0028: Verify main logo functionality', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://onlinelibrary.wiley.com');
  
  // Locate and click the main logo
  await expect(page.locator('#mainLogo')).toBeVisible();
  await page.click('#mainLogo');
  
  // Verify the redirection to the homepage
  await expect(page).toHaveURL('https://onlinelibrary.wiley.com');
});

test('TC0029: Verify "Login / Register" button functionality', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://onlinelibrary.wiley.com');
  
  // Click on the "Login / Register" button
  const loginButton = page.locator('.sign-in-label');
  await expect(loginButton).toBeVisible();
  await loginButton.click();
  
  // Verify the dropdown menu is displayed
  const dropdownMenu = page.locator('.navigation-login-dropdown');
  await expect(dropdownMenu).toBeVisible();
  
  // Verify the dropdown options
  await expect(page.locator('text=Individual Login')).toBeVisible();
  await expect(page.locator('a[href="/action/ssostart?redirectUri=%2F"]')).toBeVisible(); // Fixed locator
  await expect(page.locator('text=Register')).toBeVisible();
});

test('TC0030: Verify "Individual Login" navigation', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://onlinelibrary.wiley.com');
  
  // Click on the "Login / Register" button
  const loginButton = page.locator('.sign-in-label');
  await loginButton.click();
  
  // Click on "Individual Login"
  const individualLoginOption = page.locator('text=Individual Login');
  await expect(individualLoginOption).toBeVisible();
  await individualLoginOption.click();
  
  // Wait for a specific element on the "Individual Login" page to ensure redirection
  const loginPageHeader = page.locator('h1'); // Target a unique element to confirm the page
  await expect(loginPageHeader).toBeVisible();
  
  // Verify redirection to the "Individual Login" page
  await expect(page).toHaveURL('https://wiley.scienceconnect.io/login');
});
