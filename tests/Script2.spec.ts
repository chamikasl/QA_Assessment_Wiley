import { test, expect } from '@playwright/test';

test('has a title', async ({ page }) => {
    await page.goto('https://onlinelibrary.wiley.com');
    expect(await page.title()).toBe("Wiley Online Library | Scientific research articles, journals, books, and reference works");
});