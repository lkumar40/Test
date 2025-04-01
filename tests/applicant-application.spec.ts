import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { ApplicationPage } from "../pages/ApplicationPage";
import { EssayPage } from "../pages/EssayPage";
import { ReviewPage } from "../pages/ReviewPage";
import { generateRandomEmail } from "../utils/userUtils";

test.describe("Kaleidoscope Applicant Application Process", () => {
  let email: string;
  let password: string = "Aniket@260199";

  test("Register a User and submit Scholarship Application", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    const applicationPage = new ApplicationPage(page);
    const essayPage = new EssayPage(page);
    const reviewPage = new ReviewPage(page);
    //Each time we register user, a new email gets generated
    email = generateRandomEmail();
    await registrationPage.registerUser(email, password);
    await applicationPage.beginApplication();
    await applicationPage.fillPage1();
    await applicationPage.entryValidation();
    await applicationPage.addEntries([
      { name: "Reading", years: "2", role: "Reader", description: "Books" },
      { name: "Swimming", years: "2", role: "Swimmeer", description: "Pool" },
      { name: "Technician", years: "2", role: "Database", description: "SQL" },
    ]);
    await applicationPage.fillPage3();
    await essayPage.essayPageDetails();
    await reviewPage.reviewApplication([
      "Lets get to know you!",
      "Extracurricular Activities",
      "High School Information",
      "Essay",
    ]);
    await applicationPage.submitApplication();
  });
});
