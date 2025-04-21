describe('Search mentor scenario spec', () => {  
  const baseUrl = "/";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  //Positive Scenario
  it('Search mentor with valid data', () => {
    let mentorName = 'Batman'; //Random
    cy.searchMentor(mentorName);
    cy.get('.border-b > .line-clamp-1').should('have.text', `${mentorName}`);
  })

  //Negative Scenario
  it('Search mentor with invalid data', () => {
    let mentorName = 'Siapa saja deh'; //Random
    cy.searchMentor(mentorName);
    cy.get('.mt-2').should('contain', 'Coba cari kata kunci lain, sementara itu');
    cy.get('.mt-6').click();
  })
})