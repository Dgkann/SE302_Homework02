import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#exampleInputEmail'); 
        this.passwordInput = page.locator('#exampleInputPassword');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async navigate() {
        await this.page.goto('https://sweetshop.netlify.app/login');
    }

    async login(email: string, pass: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }
}