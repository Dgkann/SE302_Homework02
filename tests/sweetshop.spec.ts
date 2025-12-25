import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';

test.describe('Sweet Shop Functional Tests', () => { 

    // TC_01: Positive Login Test
    test('TC_01: Should login successfully with valid credentials', async ({ page }) => { // 
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('dogukanyurtturkk@gmail.com','Dogu1234');
        
        // URL Assertion 
        await expect(page).toHaveURL('https://sweetshop.netlify.app/');
    });

    // TC_02: Negative Login Test 
    test('TC_02: Should show error for invalid email format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('dogukanyurtturk', '12345');
        
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
    // TC_06: Remove Item from Basket
    test('TC_06: Should remove an item from the basket successfully', async ({ page }) => {
        const cart = new CartPage(page);
        
        // Setup: Add an item first
        await page.goto('https://sweetshop.netlify.app/sweets');
        await cart.addItemToBasket();
        
        // Action: Go to basket and delete
        await page.goto('https://sweetshop.netlify.app/basket');
        await page.click('text=Delete'); // Standard delete button interaction
        
        // Assertion: Check if the basket is empty or total is 0
        const total = page.locator('h4:has-text("Total")');
        await expect(total).toContainText('£0.00');
    });

    // TC_07: Basket Badge Persistence
    test('TC_07: Should maintain basket count after navigating away', async ({ page }) => {
        const cart = new CartPage(page);
        
        await page.goto('https://sweetshop.netlify.app/sweets');
        await cart.addItemToBasket();
        
        // Navigate to About page
        await page.click('a[href="/about"]');
        
        // Assertion: Cart count should still be 1 [cite: 52]
        const badge = page.locator('.badge-success');
        await expect(badge).toHaveText('1');
    });

    // TC_08: Multiple Items in Basket
    test('TC_08: Should correctly count multiple different items', async ({ page }) => {
        const cart = new CartPage(page);
        await page.goto('https://sweetshop.netlify.app/sweets');
        
        // Add the first and second item
        await page.locator('.card-footer .btn').nth(0).click();
        await page.locator('.card-footer .btn').nth(1).click();
        
        // Assertion: Badge should show 2
        const badge = page.locator('.badge-success');
        await expect(badge).toHaveText('2');
    });
    
});
