import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly addItemButtons: Locator;
    readonly emptyBasketLink: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('.navbar-nav .badge-success');
        this.addItemButtons = page.locator('a.addItem');
        this.emptyBasketLink = page.getByRole('link', { name: 'Empty Basket' });
        this.checkoutButton = page.getByRole('button', { name: 'Continue to checkout' });
    }

    async addItemToBasket(index: number = 0) {
        const targetButton = this.addItemButtons.nth(index);
        // Butonun görünür ve tıklanabilir olduğundan emin oluyoruz.
        await targetButton.waitFor({ state: 'visible' });
        await targetButton.click();
    }
    async emptyBasket() {
        await this.emptyBasketLink.click();
    }
}