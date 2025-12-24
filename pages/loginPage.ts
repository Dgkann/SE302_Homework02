import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // Sitedeki gerçek ID'ler kullanıldı
        this.emailInput = page.locator('#exampleInputEmail1');
        this.passwordInput = page.locator('#exampleInputPassword1');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.invalid-feedback');
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