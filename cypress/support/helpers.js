export function signUpNewUser() {
  const username = Math.random().toString(36).slice(6);
  const email = Math.random().toString(36).slice(6);
  const password = Math.random().toString(36).slice(6);
  cy.visit("/signup");
  cy.get("form").find("input[name='username']").type(`User${username}`);
  cy.get("form").find("input[name='email']").type(`user${email}@gmail.com`);
  cy.get("form").find("input[name='phone']").type(`07865431257`);
  cy.get("form").find("input[name='password']").type(`pword${password}123`);
  cy.get("form").find("button[type='submit']").click();
  cy.url().should("include", "/home");
  cy.getCookie("sid").should("have.property", "httpOnly", true);
  cy.get("button[id='logout']").click();
  return { username, email, password };
}

export const recoveryTime = 1;
