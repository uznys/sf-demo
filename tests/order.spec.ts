import { expect, test } from '@playwright/test';
import { OrderPage } from './page-objects/order-page';
import { CoingatePage } from './page-objects/coingate-page';
import { GoogleAccountsPage } from './page-objects/google-accounts-page';

test.describe('Order', () => {
  let orderPage: OrderPage;

  test.beforeEach(async ({ page }) => {
    orderPage = new OrderPage(page);
    await orderPage.goto();
  });

  test('Change tax country to United States, state Alaska and assert there is no sales tax', async () => {
    await test.step('Select country and state', async () => {
      await orderPage.countryName.click();
      await orderPage.countrySelectDropdown.selectOption('United States');
      await orderPage.stateSelectBox.selectOption('Alaska');
    });

    await expect(orderPage.vatLabel).toHaveText('No VAT/Sales Tax');
    await expect(orderPage.vatAmount).toHaveText('0.00');
  });

  test('Apply and remove coupon', async () => {
    const couponCode = 'CYBERGUY';

    const initialPriceAmount = await orderPage.priceAmount.textContent();
    const initialTotalAmount = await orderPage.totalAmount.textContent();

    await test.step('Add coupon', async () => {
      await orderPage.couponInputField.fill(couponCode);
      await orderPage.applyCouponButton.click();
    });

    await test.step('Assert discount is applied', async () => {
      await expect(orderPage.appliedCoupon).toHaveText(couponCode);
      const priceAmountWithDiscount = await orderPage.priceAmount.textContent();
      const totalAmountWithDiscount = await orderPage.totalAmount.textContent();
      expect(parseFloat(priceAmountWithDiscount!)).toBeLessThan(parseFloat(initialPriceAmount!));
      expect(parseFloat(totalAmountWithDiscount!)).toBeLessThan(parseFloat(initialTotalAmount!));
    });

    await test.step('Remove coupon', async () => {
      await orderPage.removeCouponButton.click();
    });

    await test.step('Assert discount is removed', async () => {
      await expect(orderPage.couponInputField).toBeVisible();
      await expect(orderPage.priceAmount).toHaveText(initialPriceAmount!);
      await expect(orderPage.totalAmount).toHaveText(initialTotalAmount!);
    });
  });

  test('Login with Google', async ({ page }) => {
    await orderPage.loginWithGoogleButton.click();

    const googleAccountsPage = new GoogleAccountsPage(page);
    await googleAccountsPage.assertLoginScreenIsLoaded();
  });

  test('Paying with GooglePay directs to Google login', async ({ page }) => {
    await orderPage.acceptAllCookiesButton.click();

    await orderPage.emailInputField.fill('donatas.uznys@gmail.com');
    await orderPage.googlePayPaymentMethod.click();
    const popupPromise = page.waitForEvent('popup');
    await orderPage.buyWithGooglePayButton.click();

    const googleAccountsPage = new GoogleAccountsPage(await popupPromise);
    await googleAccountsPage.assertLoginScreenIsLoaded();
  });

  // TODO: Solve Cloudflare blocking crypto and PayPal payments.
  test.skip('Pay with cryptocurrency', async ({ page }) => {
    const totalAmount = await orderPage.totalAmount.textContent();
    await orderPage.acceptAllCookiesButton.click();

    await orderPage.emailInputField.fill('donatas.uznys@gmail.com');
    await orderPage.cryptocurrencyPaymentMethod.click();
    await orderPage.completeCryptocurrencyPurchaseButton.click();

    const coingatePage = new CoingatePage(page);
    await coingatePage.assertUrl();
    await expect(coingatePage.payWithCryptoOption).toContainText(totalAmount!);
  });
});
