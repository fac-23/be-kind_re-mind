import { signUpNewUser } from "../support/helpers";

beforeEach(() => {
  cy.task("resetDb");
});

it("Authentication. Sign up, Log in, Log out, Cookies, Route protection", () => {
  const { email, password } = signUpNewUser();
  cy.getCookie("sid").should("not.exist");

  cy.visit("/home");
  cy.get("h1").contains("Access denied");

  cy.visit("/medication");
  cy.get("h1").contains("Access denied");

  cy.visit("/record");
  cy.get("h1").contains("Access denied");

  cy.visit("/rewards");
  cy.get("h1").contains("Access denied");

  cy.visit("/medication-action");
  cy.get("h1").contains("Access denied");

  cy.visit("/login");
  cy.get("form").find("input[name='email']").type(`user${email}@gmail.com`);
  cy.get("form").find("input[name='password']").type(`pword${password}123`);
  cy.get("form").find("button[type='submit']").click();
  cy.getCookie("sid").should("have.property", "httpOnly", true);

  cy.url().should("include", "/home");
  cy.get("h1").should("not.have.text", "Access denied");

  cy.visit("/medication");
  cy.get("h1").should("not.have.text", "Access denied");

  cy.visit("/record");
  cy.get("h1").should("not.have.text", "Access denied");

  cy.visit("/rewards");
  cy.get("h1").should("not.have.text", "Access denied");

  cy.visit("/medication-action");
  cy.get("h1").should("not.have.text", "Access denied");
});

it("Add Medication", () => {});
