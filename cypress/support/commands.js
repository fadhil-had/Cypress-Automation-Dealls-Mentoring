// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('userLogin', (email, password) => {
    cy.get('#dealls-navbar-login-btn').click();
    cy.wait(2000);
    
    cy.get('#basic_email').type(email);
    cy.get('#basic_password').type(password);
    cy.get('[type="submit"]').contains('Sign In').click();
});

Cypress.Commands.add('userLoginEmpty', () => {
  cy.get('#dealls-navbar-login-btn').click();
  cy.wait(2000);
  
  cy.get('#basic_email').clear();
  cy.get('#basic_password').clear();
  cy.get('[type="submit"]').contains('Sign In').click();
});

Cypress.Commands.add('mentorRegister', (fullname, email, phone, password) => {
  const registerStep = new RegisterStep();
  registerStep.basicData(fullname, email, phone);
  registerStep.skillData();
  registerStep.companyData();
  registerStep.institutionData();
  registerStep.aboutData();

  cy.get('.ant-checkbox-input').check();
  cy.get('.order-1 > span').click();

  cy.get('#password').type(password);
  cy.get('#confirmPassword').type(password);
  cy.get('#checkPrivacyPolicy').check();
  cy.get('#mentoring-onboarding-finish-btn').click();
});

class RegisterStep {
  basicData(fullname, email, phone){
    cy.get('#dealls-navbar-register-btn').click();
    cy.wait(2000);
    cy.get(':nth-child(2) > .mt-auto > .text-white').click();
    cy.get('#mentor-onboarding_fullName').type(fullname);
    cy.get('#mentor-onboarding_email').type(email);
    cy.get('#mentor-onboarding_whatsapp').type(phone);
    cy.get('.order-1 > span').click();
  }

  skillData(){
    cy.get(':nth-child(1) > .gap-4 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-btn > .box-border > .relative > .flex > .font-bold').click();
    cy.get('#expertise-list-form_careerPanels_0_category').click();
    cy.get('.ant-select-item-option-active').click();
    cy.get('.overflow-y-auto > :nth-child(1) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
    cy.get('.order-1 > span').click();
  }

  companyData(){
    cy.get('#companyName').type('DANA{enter}');
    cy.get('#rc_select_4').click();
    cy.wait(1000);
    cy.get('#rc_select_4').type('Fintech{enter}');
    cy.get('#roleLevel').click();
    cy.wait(1000);
    cy.get('#roleLevel').type('Associate / Officer{enter}');
    cy.get('#roleName').type('QA Software engineer{enter}');
    cy.get('#startDate').type('12/2022');
    cy.get('#endDate').type('04/2025');
    cy.get('.order-1 > span').click();
  }

  institutionData(){
    cy.get('#institution').type('Binus University{enter}');
    cy.get('.ant-select-dropdown > div > .flex').click();
    cy.get('#major').type('Teknik Informasi{enter}');
    cy.get('#startDate').type('07/2018');
    cy.get('#endDate').type('07/2022');
    cy.get('.order-1 > span').click();
  }

  aboutData(){
    cy.get('#aboutMe').type('Hi, saya adalah orang yang lagi test hehe');
    cy.get('.order-1 > span').click();
  }
}