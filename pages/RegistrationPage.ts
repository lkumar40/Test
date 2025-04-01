import { Page } from "@playwright/test";

export class RegistrationPage {
  constructor(private page: Page) {}
  //Methhod to Register New User or login if existing user
  async registerUser(email: string, password: string) {
    await this.page.goto("https://apply.mykaleidoscope.com/login");
    await this.page.getByPlaceholder("Email Address").fill(email);
    await this.page.getByLabel("Next").click();
    await this.page.waitForLoadState("networkidle");
    const currentUrl = this.page.url();
    console.log(currentUrl);
    if (currentUrl.includes("https://apply.mykaleidoscope.com/signup")) {
      await this.page.getByLabel("First Name").fill("lalit");
      await this.page.getByLabel("Last Name").fill("kumar");
      await this.page.getByPlaceholder("1 (702) 123-4567").fill("8825321778");
      await this.page.getByLabel("Create a Password").fill(password);
      await this.page
        .getByLabel("I confirm that I am at least 13 years old")
        .check();
      await this.page.getByRole("button", { name: "Submit" }).click();
    } else {
      await this.page.getByPlaceholder("Password").fill(password);
      await this.page.getByRole("button", { name: "Sign In" }).click();
    }
  }
}
