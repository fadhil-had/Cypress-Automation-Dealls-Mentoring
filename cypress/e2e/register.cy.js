import CommonFunction from '../common/function';

describe('Register scenario spec', () => {  
  const baseUrl = "/";
  const { faker } = require('@faker-js/faker');
  const commonFunction = new CommonFunction();
  
  let randomFullname = faker.person.fullName(); //Random
  let randomEmail = faker.internet.email(); // Norma13@hotmail.com
  let randomPhone = commonFunction.generateRandom62PhoneNumber();
  let randomPassword = faker.internet.password();

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.wait(2000);
  });

  //Positive Scenario
  it('Register with valid data', () => {
    cy.mentorRegister(randomFullname, randomEmail, randomPhone, randomPassword);
    cy.get('.ant-message-notice-content').should('contain', 'Complete data success! Please wait a moment');
    cy.wait(2000);
    cy.get('.ant-modal-body').should('exist');
    cy.get('.text-\\[\\#FEE156\\]').should('have.text', 'for applying as mentor');
  })

  //Negative Scenario
  it('Register with existing data', () => {
    cy.fixture('userData').then((data) => {
      cy.basicData(data.name, data.email, data.phone);
      cy.wait(2000);
      cy.get('.ant-message-notice-content').should('have.text', 'Email already registered, please login');
    });
  })
})