import { type Locator, type Page } from "@playwright/test";

export class HomePage {
    // Variables
    readonly page: Page;

    // Constructor
    constructor(page: Page) {
        this.page = page;
    }

}

export default HomePage;