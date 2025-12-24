import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly sweetsMenu: Locator;
    readonly addToBasketBtn: Locator;
    readonly basketIcon: Locator;
    readonly checkoutBtn: Locator;
    readonly firstNameInput: Locator;
    readonly continueCheckoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sweetsMenu = page.locator('a[href="/sweets"]');
        this.addToBasketBtn = page.locator('.card-footer .btn').first();
        this.basketIcon = page.locator('a[href="/basket"]');
        this.checkoutBtn = page.locator('a[href="/checkout"]');
        this.firstNameInput = page.locator('#firstName');
        this.continueCheckoutBtn = page.locator('.btn-primary.btn-lg');
    }

    async navigateToSweets() {
        await this.sweetsMenu.click();
    }

    async addItemToBasket() {
        await this.addToBasketBtn.click();
    }

    async goToCheckout() {
        await this.basketIcon.click();
        await this.checkoutBtn.click();
    }
}