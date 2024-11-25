import { expect, type Page } from '@playwright/test';

export class GoogleAccountsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertLoginScreenIsLoaded() {
    await expect(this.page).toHaveURL(new RegExp('https://accounts.google.com/'));
    await expect(this.page.getByText('Sign in', { exact: true })).toBeVisible();
  }
}
