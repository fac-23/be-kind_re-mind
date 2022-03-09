import { signUpNewUser } from "../support/helpers";

beforeEach(() => {
  cy.task("resetDb");
});

it("User error shown if user has already signed up", () => {
  const { username, email, password } = signUpNewUser();

  cy.visit("/signup");
  cy.get("form").find("input[name='username']").type(`User${username}`);
  cy.get("form").find("input[name='email']").type(`user${email}@gmail.com`);
  cy.get("form").find("input[name='phone']").type(`07865431257`);
  cy.get("form").find("input[name='password']").type(`pword${password}123`);
  cy.get("form").find("button[type='submit']").click();
  cy.url().should("include", "/emailError");
});

it("User eror shown if uses wrong password", () => {
  const { email } = signUpNewUser();

  cy.visit("/login");
  cy.get("form").find("input[name='email']").type(`user${email}@gmail.com`);
  cy.get("form").find("input[name='password']").type(`wrongpassword`);
  cy.get("form").find("button[type='submit']").click();
  cy.url().should("include", "/loginError");
});

it("User error if uses wrong email", () => {
  const { password } = signUpNewUser();

  cy.visit("/login");
  cy.get("form").find("input[name='email']").type(`wrong@gmail.com`);
  cy.get("form").find("input[name='password']").type(`pword${password}123`);
  cy.get("form").find("button[type='submit']").click();
  cy.url().should("include", "/loginError");
});
