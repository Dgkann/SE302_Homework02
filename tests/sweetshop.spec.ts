import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';

test.describe('Sweet Shop Functional Tests', () => { 

    // TC_01: Positive Login Test
    test('TC_01: Should login successfully with valid credentials', async ({ page }) => { // 
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('test@example.com', 'password123');
        
        // URL Assertion 
        await expect(page).toHaveURL('https://sweetshop.netlify.app/');
    });

    // TC_02: Negative Login Test 
    test('TC_02: Should show error for invalid email format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('invalid-email', '12345');
        
        // Locator Assertion 
        const isVisible = await page.locator('.invalid-feedback').isVisible();
        expect(isVisible).toBeTruthy();
    });

    // TC_03: Product Navigation Test 
    test('TC_03: Should navigate to Sweets page', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await page.click('a[href="/sweets"]');
        await expect(page).toHaveURL(/.*sweets/);
    });

    // TC_04: Add to Basket Test 
    test('TC_04: Should add item to basket', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/sweets');
        await page.locator('.card-footer .btn').first().click();
        const cartCount = page.locator('.badge-success');
        await expect(cartCount).toHaveText('1');
    });

    // TC_05: Empty Checkout Validation 
    test('TC_05: Should validate mandatory fields on checkout', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/basket');
        await page.click('a[href="/checkout"]');
        await page.click('.btn-primary'); // Submit without filling
        
        const firstNameError = page.locator('text=Valid first name is required');
        await expect(firstNameError).toBeVisible();
    });
    
});
