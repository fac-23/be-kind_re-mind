import { signUpNewUser, recoveryTime } from "../support/helpers";

beforeEach(() => {
  cy.task("resetDb");
});

it("User can mark medications as taken and have them removed from notification", () => {
  const { email, password } = signUpNewUser();

  cy.visit("/login");
  cy.get("form").find("input[name='email']").type(`user${email}@gmail.com`);
  cy.get("form").find("input[name='password']").type(`pword${password}123`);
  cy.get("form").find("button[type='submit']").click();
  cy.visit("/medication-action");
  cy.get("form").find("input[type='radio']").eq(0).click();
  cy.get("form").find("input[type='radio']").eq(4).click();
  cy.get("form").find("input[type='radio']").eq(7).click();
  cy.get("form").find("button[type='submit']").click();
  cy.visit("/medication-action");
  cy.get("form").should("not.have.text", "Aspirin");
  cy.wait(recoveryTime * 10);
  cy.task("resetDb");
});
