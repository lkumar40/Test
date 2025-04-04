import { expect, Page } from "@playwright/test";

export class ApplicationPage {
  constructor(private page: Page) {}
  //Method to navvigate to scholarshhip application
  async beginApplication() {
    await this.page.waitForURL(
      "https://apply.mykaleidoscope.com/applicant/applications"
    );
    await this.page.goto(
      "https://apply.mykaleidoscope.com/program/sdet-test-scholarship"
    );
    await this.page.getByRole("button", { name: "Begin" }).click();
  }
  //Method to fill details in Page 1
  async fillPage1() {
    await this.page.waitForLoadState();
    await this.page.getByPlaceholder("Enter your street address").fill("ggg");
    await this.page.getByPlaceholder("Enter your state").click();
    await this.page.getByText("Alaska").click();
    await this.page.getByPlaceholder("Enter your city").fill("Dehri");
    await this.page.getByPlaceholder("Enter your zip code").fill("821312");
    await this.page.getByPlaceholder("Enter your country").click();
    await this.page.getByText("Albania").click();

    await this.page.getByText("Next Page").click();
  }

  //Method to add Multiple Entries and validate entries
  async addEntries(
    p0: { name: string; years: string; role: string; description: string }[]
  ) {
    await this.page.waitForLoadState();
    for (let i = 0; i < p0.length; i++) {
      await this.page.getByText("Add Entry").first().click();
      await this.page.getByPlaceholder("Short Input").fill(p0[i].name);
      await this.page.getByPlaceholder("123").fill(p0[i].years);
      await this.page.getByPlaceholder("Long Input").first().fill(p0[i].role);
      await this.page
        .getByPlaceholder("Long Input")
        .last()
        .fill(p0[i].description);
      await this.page.getByRole("button", { name: "Add" }).last().click();
      if (i == 0) {
        await this.page.getByRole("button", { name: "Next Page" }).click();
        await expect(
          this.page.getByText("Please add at least 2 entries")
        ).toBeVisible();
      }
    }
    await this.page.getByRole("button", { name: "Next Page" }).click();
    await this.page
      .getByText("High School Information")
      .waitFor({ state: "visible", timeout: 5000 })
      .catch(async () => {
        console.warn("First attempt to Click failed, retrying...");
        await this.page.getByRole("button", { name: "Next Page" }).click();
        await expect(this.page.getByTestId("page-title")).toHaveText(
          "High School Information"
        );
      });
  }

  //Meethod to add details in Page 3
  async fillPage3() {
    await this.page
      .getByPlaceholder("Please enter the name of your current High School")
      .fill("aa");
    await this.page
      .getByPlaceholder("Enter high school street address")
      .fill("aa");
    await this.page.getByPlaceholder("Enter high school city").fill("aa");
    await this.page.getByPlaceholder("Enter high school state").click();
    await this.page.getByText("Alaska").click();
    await this.page.getByPlaceholder("e.g. 55413").fill("821312");
    await this.page.getByPlaceholder("Enter your current GPA").fill("9");
    await this.page.getByPlaceholder("Enter a date").fill("2009");
    const inputFile = await this.page.locator('input[type="file"]');
    await inputFile.setInputFiles("utils/My School Transcript.pdf");
    await expect(this.page.getByText("My School Transcript.pdf")).toBeVisible();
    await this.page.getByRole("button", { name: "Next Page" }).click();
    await this.page
      .getByText("Essay")
      .waitFor({ state: "visible", timeout: 5000 })
      .catch(async () => {
        console.warn("First attempt to navigate to Click failed, retrying...");
        await this.page.getByRole("button", { name: "Next Page" }).click();
        await expect(this.page.getByTestId("page-title")).toHaveText("Essay");
      });
  }

  //Method to submit application and check the application is not editable after submission .
  async submitApplication() {
    const currentUrl = this.page.url();
    await this.page.getByRole("button", { name: "Submit" }).click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goto(currentUrl);
    await expect(
      this.page.getByRole("button", { name: "Edit" })
    ).not.toBeVisible();
  }
}
