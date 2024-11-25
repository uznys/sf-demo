import { expect, type Page } from '@playwright/test';

export class CoingatePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get payWithCryptoOption() { return this.page.getByTestId('Crypto-currency'); }

  async assertUrl() {
    await expect(this.page).toHaveURL(new RegExp('https://pay.coingate.com/'));
  }
}
