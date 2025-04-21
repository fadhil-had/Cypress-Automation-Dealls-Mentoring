describe('Search mentor scenario spec', () => {  
  const baseUrl = "/";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.fixture('userData').then((data) => {
      cy.userLogin(data.email, data.password);
      cy.wait(2000);
      cy.get('.ant-message-notice-content').should('contain', 'Sign in success');
    });
  });

  //Positive Scenario
  it('Schedule mentor with valid data', () => {
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
    cy.get(':nth-child(2) > .ant-checkbox-wrapper').click();
    cy.wait(2000);
    cy.get('#mentoring-schedule-finish-request-session-btn').click();
    cy.wait(2000);
    cy.get('.text-\[\#FEE156\]').should('contain','dikirimkan');
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