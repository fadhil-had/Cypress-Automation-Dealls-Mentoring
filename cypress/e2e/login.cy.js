describe('Login scenario spec', () => {  
  const baseUrl = "/";
  const { faker } = require('@faker-js/faker');
  const randomPassword = faker.internet.password(); //Random
  const randomEmail = faker.internet.email(); // Norma13@hotmail.com

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  //Positive Scenario
  it('Login with valid email and password', () => {
    cy.fixture('userData').then((data) => {
      cy.userLogin(data.email, data.password);
      cy.wait(2000);
      cy.get('.ant-message-notice-content').should('contain', 'Sign in success');
      cy.get('h1').should('contain', 'Hi');
    });
  })

  //Negative Scenario
  it('Login with invalid email and password', () => {
    cy.userLogin(randomEmail, randomPassword);
    cy.get('.ant-message-notice-content').should('contain', 'Email Not found');
  })

  //Negative Scenario
  it('Login with empty email and password', () => {
    cy.userLoginEmpty();
    cy.get('#basic_email_help').should('contain', 'Missing email');
    cy.get('#basic_password_help').should('contain', 'Missing password');
  })
})