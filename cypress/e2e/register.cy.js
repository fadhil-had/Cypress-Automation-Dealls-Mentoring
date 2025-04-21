describe('Login sscenario spec', () => {  
  const baseUrl = "/";
  const { faker } = require('@faker-js/faker');
  

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.wait(2000);
  });

  //Positive Scenario
  it('Register with valid data', () => {
    let randomFullname = faker.person.fullName(); //Random
    let randomEmail = faker.internet.email(); // Norma13@hotmail.com
    let randomPhone = '6282212131415';
    const randomPassword = faker.internet.password();

    cy.mentorRegister(randomFullname, randomEmail, randomPhone, randomPassword);
    cy.get('.ant-message-notice-content').should('contain', 'Complete data success! Please wait a moment');
    cy.wait(2000);
    cy.get('.ant-modal-body').should('exist');
    cy.get('.text-\\[\\#FEE156\\]').should('have.text', 'for applying as mentor');
  })
})