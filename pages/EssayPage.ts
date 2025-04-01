import { expect, Page } from "@playwright/test";

export class EssayPage {
  constructor(private page: Page) {}
  //Method to Validate that each option under "Please select the essay types you want to write about” shows an essay box and add essay for Amnimals and School
  async essayPageDetails() {
    await this.page.getByLabel("Cars").check();
    await this.page.getByLabel("Animals").check();
    await this.page.getByLabel("School").check();
    await this.page.getByLabel("Other").check();
    await expect(this.page.getByText("Essay about Cars")).toBeVisible();
    await expect(this.page.getByText("Essay about Animals")).toBeVisible();
    await expect(this.page.getByText("Essay about School")).toBeVisible();
    await expect(
      this.page.getByText("Provide an essay about any topic")
    ).toBeVisible();
    await this.page.getByLabel("Cars").first().uncheck();
    await this.page.getByLabel("Other").first().uncheck();
    await this.page
      .locator('[name="3kQsIdx5-JQCId_AOoSOB"]')
      .fill("cow is a holy animal");
    await this.page
      .locator('[name="oSl-QCyps8HnGHKUtIFw3"]')
      .fill("My school is in India");
    await this.page.getByRole("button", { name: "Next Page" }).click();
    await this.page
      .getByText("Review Your Application")
      .waitFor({ state: "visible", timeout: 5000 })
      .catch(async () => {
        console.warn("First attempt to Click failed, retrying...");
        await this.page.getByRole("button", { name: "Next Page" }).click();
      });
  }
}
