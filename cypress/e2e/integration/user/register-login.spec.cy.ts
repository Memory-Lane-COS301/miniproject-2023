describe('Register User and Login', () => {
  const user = {
    username: 'testUsername',
    email: 'it@email.com',
    password: 't3StP@ssword',
  };
  it(`Register user with username=${user.username}`, () => {
    cy.register(user.username, user.email, user.password);
    cy.get('ion-button[type=submit]').click();
    
    cy.url().should('eq', `${Cypress.config().baseUrl}/home/feed`);
    // cy.get('ion-title')
    // .contains('Memory Lane');
  });

  it(`Login User with email=${user.email}`, () => {
    cy.login(user.email, user.password);  
    cy.get('ion-button[type=submit]').click();
    
    // cy.url().should('eq', `${Cypress.config().baseUrl}/home/feed`);
    // cy.get('ion-title')
    // .contains('Memory Lane');
  });
});
