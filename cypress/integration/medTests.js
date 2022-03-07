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
  //   cy.get("form").find('input[name="tablets"]').click();
  //   cy.get("form").find('input[type="text"]').type("Simvastatin");
  //   cy.get("form").find('input[name="medDose"]').type("40");
  //   cy.get("select").select("mg");
});
