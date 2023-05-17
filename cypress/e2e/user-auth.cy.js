/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe("Auth auth test suite", () => {
  beforeEach(() => {
    cy.visit("https://qa-practice.netlify.app");
  });

  it("login with valid creds", () => {
    // cy.get("#forms").click();
    // cy.get('a[href="login.html"]').click();
    // cy.get("#email").type("admin@admin.com");
    // cy.get("#password").type("admin123");
    // cy.get("#submitLoginBtn").click();
    cy.login('admin@admin.com', 'admin123');
    cy.get("#message").should("be.visible");
    cy.get("#message").should(
      "contain",
      "admin@admin.com, you have successfully logged in!"
    );

    cy.contains("admin@admin.com, you have successfully logged in!").should(
      "be.visible"
    );
  });

  it("login with invalid creds", () => {
    cy.login('admin@admin.com', 'parolagresita');
    cy.get("#message").should("be.visible");
    cy.get("#message").should(
      "contain",
      "Bad credentials! Please try again! Make sure that you've registered."
    );

    cy.contains(
      "Bad credentials! Please try again! Make sure that you've registered."
    ).should("be.visible");
  });

  it("register user", () => {
    const randomLastName = faker.person.lastName();

    cy.get("#forms").click(); //cy.contains('Login').click();
    cy.get("#register").click(); // cy.contains('Register').click();
    cy.get("#firstName").clear().type(faker.person.firstName());
    // cy.pause();
    cy.get("#lastName").type(randomLastName);
    cy.get("#phone").type("0733444555");
    cy.get("select").select("Australia");
    cy.get("input[type='email']").type(randomLastName+"."+faker.internet.email());
    
    cy.get("input[name='password']").type("lalalaal1");
    cy.get("#exampleCheck1").click();
    cy.get('button').contains("Register").click();
    cy.contains("The account has been successfully created!").should(
      "be.visible"
    );
  });
});
