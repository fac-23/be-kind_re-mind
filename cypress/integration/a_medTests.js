import { signUpNewUser } from "../support/helpers";

beforeEach(() => {
  cy.task("resetDb");
});

it("User can add and delete medication", () => {
  const { email, password } = signUpNewUser();

  cy.visit("/login");
  cy.get("form").find("input[name='email']").type(`user${email}@gmail.com`);
  cy.get("form").find("input[name='password']").type(`pword${password}123`);
  cy.get("form").find("button[type='submit']").click();
  cy.visit("/medication");
  cy.get("button[id='toggle']").click();
  cy.get("form").find('input[type="text"]').type("Simvastatin");
  cy.get("form").find('input[type="number"]').first().type("40");
  cy.get("select").select("mg");
  cy.get("form").find('input[type="number"]').last().type("28");
  cy.get("select").select("mg");
  cy.get("form").find("input[id='medTime']").first().click();
  cy.get("form").find("textarea[id='notes']").type("for my cholesterol");
  cy.get("form").find("button[type='submit']").click();
  cy.url().should("include", "/medication");
  cy.get("li").contains("Simvastatin");
  cy.get("li").contains("40mg");
  cy.get("li").contains("08:00");
  cy.get("li").contains("for my cholesterol");
  cy.get("li").find("button").click();
  cy.get("li").should("not.exist");
});
