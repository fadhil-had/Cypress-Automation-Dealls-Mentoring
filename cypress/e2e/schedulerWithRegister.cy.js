import CommonFunction from '../common/function';

describe('Search mentor scenario spec', () => {  
  const baseUrl = "/";

  const { faker } = require('@faker-js/faker');
  const commonFunction = new CommonFunction();

  let randomFullname = faker.person.fullName(); //Random
  let randomEmail = faker.internet.email(); // Norma13@hotmail.com
  let randomPhone = commonFunction.generateRandom62PhoneNumber();
  let randomPassword = faker.internet.password();
  

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.mentorRegister(randomFullname, randomEmail, randomPhone, randomPassword);
    cy.get('.ant-message-notice-content').should('contain', 'Complete data success! Please wait a moment');
    cy.wait(2000);
    cy.get('.ant-modal-close-x').click();
  });

  //Positive Scenario
  it('Schedule mentor with valid data', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
    
    let mentorName = 'Muse'; //Random
    let mentorNameUrl = 'muse-343'; 
    cy.searchMentor(mentorName);
    cy.wait(2000);
    cy.get('.border-b > .line-clamp-1').should('have.text', `${mentorName}`);
    cy.get(`[href="/mentoring/${mentorNameUrl}"] > .flex-1 > .border-b > .line-clamp-1`).click();
    
    cy.get('button:contains("Ajukan Jadwal")').click();
    cy.get('.col-start-1 > .relative').click();
    cy.get('#mentoring-schedule-topic-request-session-btn').click();

    cy.get('.rmdp-container > :nth-child(1) > .h-9').click();
    cy.get('[tabindex="0"] > .sd').click();
    cy.get('[aria-label="Choose Tuesday April 29 of 2025"] > .sd').click();

    cy.get('#proposedTimes_0_startTime').type('10.00');
    cy.get('#proposedTimes_0_endTime').type('12.00');
    cy.get('#notes').clear();
    cy.wait(500);
    cy.get('#notes').type("Pertanyaan simple, bumi bulat atau datar? Semoga dijawab");
    cy.get('#mentoring-schedule-pick-schedule-request-session-btn').click();

    cy.get(':nth-child(1) > .ant-checkbox-wrapper').click();
    cy.wait(2000);
    cy.get(':nth-child(2) > .ant-checkbox-wrapper').click();
    cy.wait(2000);
    cy.get('#mentoring-schedule-finish-request-session-btn').click();
    cy.wait(2000);
    cy.get('.mt-4').should('have.text', 'kamu akan segera diberi tahu setelah Mentor menyetujui/menolak permintaan kamu.');
    cy.screenshot();
  })

  //Negative Scenario
  it('Scheduler mentor with invalid data', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
    
    let mentorName = 'Muse'; //Random
    let mentorNameUrl = 'muse-343'; 
    cy.searchMentor(mentorName);
    cy.wait(2000);
    cy.get('.border-b > .line-clamp-1').should('have.text', `${mentorName}`);
    cy.get(`[href="/mentoring/${mentorNameUrl}"] > .flex-1 > .border-b > .line-clamp-1`).click();

    cy.get('.font-bold > .flex > div').should('contain','Sesi Telah Diminta');
  })
})