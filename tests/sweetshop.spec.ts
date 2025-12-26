import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';

test.describe('Sweet Shop Functional Tests', () => { 

    // TC_01: Positive Login Test
    test('TC_01: Should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('test@user.com', 'qwerty');
        await expect(page).toHaveURL(/.*00efc23d/); 
    });

    // TC_02: Negative Login Test (Invalid Email)
    test('TC_02: Should show error for invalid email format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('invalid-email', '12345');
        await expect(page.locator('.invalid-email')).toBeVisible();
    });

    // TC_03: Navigation Test
    test('TC_03: Should navigate to Sweets page via home button', async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await page.locator('a.sweets').click(); 
        await expect(page).toHaveURL(/.*sweets/);
        await expect(page.locator('h1')).toContainText('Browse sweets');
    });
    
    // TC_04: Basic Add to Cart Test
    test('TC_04: Should add item to basket and update badge', async ({ page }) => {
        const cartPage = new CartPage(page);
        await page.goto('https://sweetshop.netlify.app/sweets');
        await cartPage.addItemToBasket(0);
        await expect(cartPage.cartBadge).toHaveText('1');
    });

    // TC_05: Checkout Form Validation (Handles duplicate ID #name bug)
    test('TC_05: Should validate mandatory fields on checkout', async ({ page }) => {
        const cartPage = new CartPage(page);
        await page.goto('https://sweetshop.netlify.app/sweets');
        await cartPage.addItemToBasket(0);
        await page.goto('https://sweetshop.netlify.app/basket');
        
        await page.getByRole('button', { name: 'Continue to checkout' }).click();
        
        await expect(page.locator('text=Valid first name is required.')).toBeVisible();
        await expect(page.locator('text=Credit card number is required')).toBeVisible();
    });

    // TC_06: Empty Basket (Handles JS Confirm Dialog)
    test('TC_06: Should empty the basket successfully', async ({ page }) => {
        const cartPage = new CartPage(page);
        await page.goto('https://sweetshop.netlify.app/sweets');
        await cartPage.addItemToBasket(0);

        await page.goto('https://sweetshop.netlify.app/basket');
        
        // Handle the "Are you sure?" browser dialog
        page.once('dialog', dialog => dialog.accept());
        
        await cartPage.emptyBasketLink.click();
        await expect(cartPage.cartBadge).toHaveText('0');
    });

    // TC_07: Badge Persistence (Bypasses 'bout' link typo bug)
    test('TC_07: Should maintain basket count after navigation', async ({ page }) => {
        const cartPage = new CartPage(page);
        await page.goto('https://sweetshop.netlify.app/sweets');
        await cartPage.addItemToBasket(0);
        
        await expect(cartPage.cartBadge).toHaveText('1');

        // Navigate via Navbar to avoid the broken 'bout' link on the page
        await page.locator('.navbar-nav').getByRole('link', { name: 'About' }).click();
        
        await page.waitForLoadState('networkidle');
        await expect(cartPage.cartBadge).toHaveText('1');
    });

    // TC_08: Multiple Items Counter Test
    test('TC_08: Should correctly count multiple different items', async ({ page }) => {
        const cartPage = new CartPage(page);
        await page.goto('https://sweetshop.netlify.app/sweets');
        
        await cartPage.addItemToBasket(0);
        await expect(cartPage.cartBadge).toHaveText('1');
        
        await cartPage.addItemToBasket(1);
        await expect(cartPage.cartBadge).toHaveText('2');
    });
});