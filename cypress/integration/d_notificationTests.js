import { signUpNewUser } from "../support/helpers";

beforeEach(() => {
  cy.task("resetDb");
});

it("User can mark medications as taken and have them removed from notification", () => {
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
  cy.visit("/medication-action");
  cy.visit("/medication");
  cy.get("button[id='toggle']").click();
  cy.get("form").find('input[type="text"]').type("Ramipril");
  cy.get("form").find('input[type="number"]').first().type("2");
  cy.get("select").select("mg");
  cy.get("form").find('input[type="number"]').last().type("56");
  cy.get("select").select("mg");
  cy.get("form").find("input[id='medTime']").first().click();
  cy.get("form").find("textarea[id='notes']").type("for my blood pressure");
  cy.get("form").get("button[type='submit']").eq(2).click();
  cy.visit("/home");
  cy.wait(1000);
  cy.visit("/medication-action");
  cy.get("form").find("input[type='radio']").eq(0).click();
  cy.get("form").find("input[type='radio']").eq(4).click();
  cy.get("form").get("button[type='submit']").click();
  cy.visit("/medication-action");
  cy.get("form").should("not.have.text", "Ramipril");
  cy.task("resetDb");
});
