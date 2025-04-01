import { expect, Page } from "@playwright/test";

export class ReviewPage {
  constructor(private page: Page) {}
  //Method to Review Application
  async reviewApplication(pageTitle: string[]) {
    for (let i = 0; i < pageTitle.length; i++) {
      const pageeTitles = await this.page.getByText(pageTitle[i]).first();
      await expect(pageeTitles).toBeVisible();
    }
  }
}
