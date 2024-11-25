import { type Page } from '@playwright/test';

export class OrderPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get acceptAllCookiesButton() { return this.page.getByRole('button', { name: 'Accept all' }); }
  get appliedCoupon() { return this.page.getByTestId('applied-coupon'); }
  get applyCouponButton() { return this.page.getByTestId('button-apply-coupon'); }
  get buyWithGooglePayButton() { return this.page.locator('#gpay-button-online-api-id'); }
  get cryptocurrencyPaymentMethod() { return this.page.getByTestId('provider-CoinGate'); }
  get completeCryptocurrencyPurchaseButton() { return this.cryptocurrencyPaymentMethod.getByTestId('complete-purchase-button'); }
  get couponInputField() { return this.page.getByTestId('input-coupon').locator('input'); }
  get countryName() { return this.page.getByTestId('country-name'); }
  get countrySelectDropdown() { return this.page.getByTestId('country-select').getByRole('combobox'); }
  get emailInputField() { return this.page.getByTestId('input-email'); }
  get googlePayPaymentMethod() { return this.page.getByTestId('provider-GooglePay'); }
  get loginWithGoogleButton() { return this.page.getByTestId('email-block').getByRole('button', { name: 'Google' }); }
  get priceAmount() { return this.page.getByTestId('summary-price').getByTestId('money').nth(1); }
  get removeCouponButton() { return this.page.getByTestId('remove-coupon-button'); }
  get stateSelectBox() { return this.page.getByTestId('state-select').getByRole('combobox'); }
  get totalAmount() { return this.page.getByTestId('summary-total').getByTestId('money'); }
  get vatLabel() { return this.page.getByTestId('vat-label'); }
  get vatAmount() { return this.page.getByTestId('summary-vat').getByTestId('money'); }

  async goto() {
    await this.page.goto('https://order.surfshark.com/');
  }
}
